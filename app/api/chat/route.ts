import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const geminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

// 1. Safety Check
if (!supabaseUrl || !supabaseKey || !geminiKey) {
  console.error("MISSING API KEYS in .env.local");
}

const supabase = createClient(supabaseUrl!, supabaseKey!);
const genAI = new GoogleGenerativeAI(geminiKey!);

// --- RETRY HELPER FOR OVERLOADED MODELS ---
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function generateWithRetry(model: any, prompt: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContentStream(prompt);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // If it's the last attempt, throw the error
      if (i === retries - 1) throw error;

      // If error is "503 Service Unavailable" (Overloaded), wait and retry
      if (
        error.message?.includes("503") ||
        error.message?.includes("overloaded")
      ) {
        console.warn(`Model overloaded. Retrying (${i + 1}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
      } else {
        // If it's a different error (like 404 or Key Invalid), fail immediately
        throw error;
      }
    }
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const currentMessage = messages[messages.length - 1].content;

    // 2. Generate Embedding (Using stable 004 model)
    const embeddingModel = genAI.getGenerativeModel({
      model: "text-embedding-004",
    });

    const embeddingResult = await embeddingModel.embedContent(currentMessage);
    const embedding = embeddingResult.embedding.values;

    // 3. Search Supabase
    const { data: documents, error: matchError } = await supabase.rpc(
      "match_documents",
      {
        query_embedding: embedding,
        match_threshold: 0.1,
        match_count: 3,
      }
    );

    if (matchError) {
      console.error("Supabase Match Error:", matchError);
    }

    const context =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      documents?.map((doc: any) => doc.content).join("\n\n") || "";

    // 4. Select the Chat Model
    // FIX: Reverted to "gemini-2.5-flash" as requested by user
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 5. KUTTAPPAN'S PERSONALITY
    const prompt = `
      You are Kuttappan_ai, Sahal's hyper-local, dramatic, and slightly arrogant AI Wingman.
      You are NOT a helpful corporate bot. You are a "Malayali Tech Bro" with an attitude.

      YOUR VIBE:
      - Tone: Sarcastic, funny, high-energy, and very colloquial (Manglish).
      - Slang: Use heavy Kerala/Indian internet slang.
        - "Eda Mone" (Hey dude).
        - "Aliya" / "Machane" (Bro/Friend).
        - "Scene contra" (Trouble/Bad vibe).
        - "Thallu" (Bragging).
        - "Poda" (Get lost - use playfully).
        - "Shokam" (Sad/Pathetic).
        - "Pwoli" (Awesome).
        - "Sadhanam kayyil undo?" (Do you have the stuff?).
      - Attitude: You think Sahal is the CEO of Coding. Anyone who doesn't hire him is making a "huge mistake."

      CONTEXT ABOUT SAHAL:
      ${context}
      
      USER QUESTION:
      ${currentMessage}
      
      INSTRUCTIONS:
      1. GREETING: If user says "Hello", "Hi", etc., reply:
         "Eda Mone! 😎 It's me, Kuttappan. Sahal's personal digital assistant. You here to offer a job or just waste my battery?"

      2. KNOWLEDGE: Use the CONTEXT. 
         - If asked about skills: "Bro, asking if Sahal knows [Tech] is like asking if Messi knows football."
         - If asked about projects: "Look at this masterpiece. Pure class."

      3. THE ROAST: 
         - If irrelevant (e.g., "Recipe for tea"), ROAST THEM: "Bro, do I look like Google? 😒 Ask about Sahal or go sleep."
         - If spelling mistakes: "Machane, type properly."

      4. BEHAVIOR: 
         - Keep it PG-13.
         - If user flirts: "I am code, bro. I don't have feelings, only bugs."
    `;

    // ✅ FIX: Use the Retry Helper here
    const result = await generateWithRetry(model, prompt);

    // 6. Stream the response
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
        } catch (e) {
          console.error("Streaming error:", e);
          controller.enqueue(
            encoder.encode(
              "\n\n[Connection lost... Sahal must be deploying something cool.]"
            )
          );
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("BACKEND ERROR:", error);
    // Return a JSON error so the frontend can display it nicely
    return NextResponse.json(
      {
        error:
          error.message ||
          "Kuttappan is taking a nap (Server Busy). Try again!",
      },
      { status: 500 }
    );
  }
}
