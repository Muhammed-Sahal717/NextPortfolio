import { embed, streamText, type ModelMessage } from "ai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { SYSTEM_PROMPT } from "@/lib/ai-prompt";
import { geminiEmbeddingModel, geminiModel } from "@/lib/gemini";

export const runtime = "edge";
const MATCH_THRESHOLD = 0.5;
const MATCH_COUNT = 4;

type MatchedDocument = {
  content: string;
  metadata?: {
    source?: string;
    project_id?: string | number;
    slug?: string;
    chunk_index?: number;
    id?: string | number;
  } | null;
  similarity?: number;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

// Ensure the API key is available
const apiKey =
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
  process.env.GEMINI_API_KEY;

// Basic in-memory rate limiting (per edge node isolate)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 15; // Max 15 requests per minute

  let record = rateLimitMap.get(ip);
  if (!record || now - record.lastReset > windowMs) {
    record = { count: 1, lastReset: now };
    rateLimitMap.set(ip, record);
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable" },
      { status: 500 }
    );
  }

  // Rate Limiting Check
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const lastMessageContent = messages[messages.length - 1]?.content;

    if (typeof lastMessageContent !== "string" || !lastMessageContent.trim()) {
      return NextResponse.json(
        { error: "Last message must contain text" },
        { status: 400 }
      );
    }

    const trimmedMessage = lastMessageContent.trim();
    const isCasualGreeting =
      /^(hi|hello|hey|greetings|howdy|what's up|how are you|good morning|good evening|good afternoon)(\s+.*)?$/i.test(
        trimmedMessage
      ) && trimmedMessage.length < 35;

    let projectContext = "User greeted casually. Respond warmly and welcome them as Sahal's AI assistant.";

    // 1. Only query RAG vector embeddings if NOT a simple casual greeting
    if (!isCasualGreeting) {
      console.log("[Chat API] Embedding user query for RAG...");
      let embedding: number[] | null = null;

      try {
        const embedResult = await embed({
          model: geminiEmbeddingModel,
          value: trimmedMessage,
        });
        embedding = embedResult.embedding;
      } catch (embedErr) {
        console.warn("[Chat API] Vector embedding network issue, proceeding without RAG context:", embedErr);
      }

      // 2. Search Supabase for the most relevant documents if embedding succeeded
      if (embedding) {
        console.log("[Chat API] Searching vector database...");
        let matchedDocs: MatchedDocument[] | null = null;

        try {
          const { data, error } = await supabase
            .rpc("match_documents", {
              query_embedding: embedding,
              match_threshold: MATCH_THRESHOLD,
              match_count: MATCH_COUNT,
            })
            .abortSignal(AbortSignal.timeout(3000));

          if (error) {
            console.error("[Chat API] RPC Error:", error);
          } else {
            matchedDocs = data;
          }
        } catch (dbError) {
          console.error("[Chat API] Supabase connection failed:", dbError);
        }

        console.log(`[Chat API] Found ${matchedDocs?.length || 0} relevant documents`);

        if (matchedDocs && matchedDocs.length > 0) {
          projectContext = matchedDocs.map(formatMatchedDocument).join("\n\n");
        } else {
          projectContext =
            "No relevant RAG context was retrieved for this question. Say that you do not have enough indexed information to answer confidently, then suggest asking about Sahal's projects, skills, or experience.";
        }
      }
    } else {
      console.log("[Chat API] Casual greeting detected; skipping RAG embedding lookup.");
    }

    const userPromptWithContext = `[RETRIEVED KNOWLEDGE BASE REFERENCE]
${projectContext}

[USER QUESTION]
${trimmedMessage}`;

    const modelMessages: ModelMessage[] = [
      ...messages.slice(0, -1).map((m: ChatMessage) => ({
        role: m.role,
        content: m.content,
      })),
      {
        role: "user",
        content: userPromptWithContext,
      },
    ];

    console.log("[Chat API] Sending message...");

    const result = streamText({
      model: geminiModel,
      system: SYSTEM_PROMPT,
      messages: modelMessages,
    });

    return result.toTextStreamResponse({
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Chat API Error:", error);

    const errorMessage = error?.message || "";
    const isNetworkOrQuotaError =
      errorMessage.includes("429") ||
      errorMessage.includes("quota") ||
      errorMessage.includes("API key expired") ||
      errorMessage.includes("API_KEY_INVALID") ||
      errorMessage.includes("EAI_AGAIN") ||
      errorMessage.includes("getaddrinfo") ||
      errorMessage.includes("ENOTFOUND") ||
      errorMessage.includes("ECONNRESET") ||
      errorMessage.includes("fetch failed") ||
      errorMessage.includes("Cannot connect to API") ||
      error?.status === 429 ||
      error?.status === 400 ||
      error?.reason === "maxRetriesExceeded";

    if (isNetworkOrQuotaError) {
      const mockMessage = `I'm experiencing a brief connection issue with the AI network right now. Please check your connection or try asking your question again in a moment!

In the meantime, feel free to explore Sahal's featured projects, technical experience, and skills directly on the portfolio.`;

      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(mockMessage));
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

function formatMatchedDocument(doc: MatchedDocument, idx: number): string {
  const metadata = doc.metadata || {};
  const source = metadata.source || "unknown";
  const slug = metadata.slug ? `, slug: ${metadata.slug}` : "";
  const chunkIndex =
    typeof metadata.chunk_index === "number"
      ? `, chunk: ${metadata.chunk_index}`
      : "";
  const similarity =
    typeof doc.similarity === "number"
      ? `, similarity: ${doc.similarity.toFixed(3)}`
      : "";

  return `[RAG Result ${idx + 1} | source: ${source}${slug}${chunkIndex}${similarity}]\n${doc.content}`;
}
