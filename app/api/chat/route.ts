/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { generateSystemPrompt } from "@/lib/ai-prompt";

export const runtime = "edge";

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

    // Fetch projects from Supabase (with timeout)
    console.log("[Chat API] Fetching projects from Supabase...");
    let projects: any[] | null = null;

    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .abortSignal(AbortSignal.timeout(3000));

      if (error) {
        console.error("[Chat API] Error fetching projects:", error);
      } else {
        projects = data;
      }
    } catch (dbError) {
      console.error("[Chat API] Supabase connection failed:", dbError);
      // Continue with limited context
    }

    console.log(
      `[Chat API] Fetched ${projects?.length || 0} projects`
    );

    // Build context
    const projectContext = projects
      ? projects
        .map(
          (p) => `
ID: ${p.id}
Title: ${p.title}
Description: ${p.description}
Tech Stack: ${Array.isArray(p.tech_stack)
              ? p.tech_stack.join(", ")
              : p.tech_stack
            }
Category: ${p.category}
Timeline: ${p.timeline}
Live Demo: ${p.demo_url || "N/A"}
Source Code: ${p.github_url || "N/A"}
User Notes: ${p.content
              ? p.content.substring(0, 500) + "..."
              : "N/A"
            }
`
        )
        .join("\n---\n")
      : "No project data available. Provide general answers about Sahal's skills.";

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
    const history = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const lastMessageContent =
      messages[messages.length - 1].content;

    const chat = model.startChat({ history });

    console.log("[Chat API] Sending message...");

    const result = await chat.sendMessageStream(lastMessageContent);

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