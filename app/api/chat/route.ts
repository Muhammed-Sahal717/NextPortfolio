import { GoogleGenerativeAI } from "@google/generative-ai";
import { embed } from "ai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { generateSystemPrompt } from "@/lib/ai-prompt";
import { geminiEmbeddingModel } from "@/lib/gemini";

export const runtime = "edge";
const MATCH_THRESHOLD = 0.5;
const MATCH_COUNT = 8;

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

// Ensure the API key is available
const apiKey =
  process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
  process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey || "");

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

    // 1. Generate an embedding for the user's question
    console.log("[Chat API] Embedding user query for RAG...");
    const { embedding } = await embed({
      model: geminiEmbeddingModel,
      value: lastMessageContent.trim(),
    });

    // 2. Search Supabase for the most relevant documents
    console.log("[Chat API] Searching vector database...");
    let matchedDocs: MatchedDocument[] | null = null;

    try {
      const { data, error } = await supabase.rpc("match_documents", {
        query_embedding: embedding,
        match_threshold: MATCH_THRESHOLD,
        match_count: MATCH_COUNT,
      }).abortSignal(AbortSignal.timeout(3000));

      if (error) {
        console.error("[Chat API] RPC Error:", error);
      } else {
        matchedDocs = data;
      }
    } catch (dbError) {
      console.error("[Chat API] Supabase connection failed:", dbError);
    }

    console.log(`[Chat API] Found ${matchedDocs?.length || 0} relevant documents`);

    // 3. Build context only from the mathematically relevant documents
    const projectContext = matchedDocs && matchedDocs.length > 0
      ? matchedDocs.map(formatMatchedDocument).join("\n\n")
      : "No relevant RAG context was retrieved for this question. Say that you do not have enough indexed information to answer confidently, then suggest asking about Sahal's projects, skills, or experience.";

    console.log("[Chat API] Initializing Gemini model...");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: {
        role: "system",
        parts: [
          {
            text: generateSystemPrompt(projectContext),
          },
        ],
      },
    });

    // Build chat history
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const chat = model.startChat({ history });

    console.log("[Chat API] Sending message...");

    const result = await chat.sendMessageStream(lastMessageContent.trim());

    // Stream response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Chat API Error:", error);

    // Clean professional fallback
    if (
      error?.message?.includes("429") ||
      error?.message?.includes("quota") ||
      error?.message?.includes("API key expired") ||
      error?.message?.includes("API_KEY_INVALID") ||
      error?.status === 429 ||
      error?.status === 400
    ) {
      const mockMessage = `The AI service is temporarily unavailable due to API key or usage limit issues. Please check your API configuration or try again later.

---SUGGESTIONS---
- What is Sahal's tech stack?
- Show projects
- What technologies does Sahal use?`;

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
