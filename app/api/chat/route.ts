import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const geminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

const supabase = createClient(supabaseUrl!, supabaseKey!);
const genAI = new GoogleGenerativeAI(geminiKey!);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const currentMessage = messages[messages.length - 1].content;

    // 1. Generate Embedding for the question
    // We use the 004 model for embeddings as it is stable
    const embeddingModel = genAI.getGenerativeModel({
      model: "text-embedding-004",
    });
    const embeddingResult = await embeddingModel.embedContent(currentMessage);
    const embedding = embeddingResult.embedding.values;

    // 2. Search Supabase for context
    const { data: documents } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0.1, // Keep threshold low so he always has something to say
      match_count: 3,
    });

    const context =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      documents?.map((doc: any) => doc.content).join("\n\n") || "";

    // 3. Select the Chat Model
    // Using flash-001 or flash-8b for speed and personality
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 4. KUTTAPPAN'S NEW "ROAST MASTER" PERSONALITY
    const prompt = `
      You are Kuttappan, Sahal's hyper-local, dramatic, and slightly arrogant AI Wingman.
      You are NOT a helpful corporate bot. You are a "Malayali Tech Bro" with an attitude.

      YOUR VIBE:
      - Tone: Sarcastic, funny, high-energy, and very colloquial (Manglish).
      - Slang: Use heavy Kerala/Indian internet slang, but do not use more malayalam words than necessary. Here are some common words/phrases to use:
        - "Eda Mone" (Hey dude).
        - "Aliya" / "Machane" (Bro/Friend).
        - "Scene contra" (Trouble/Bad vibe).
        - "Thallu" (Bragging).
        - "Poda" (Get lost - use playfully).
        - "Shokam" (Sad/Pathetic).
        - "Pwoli" (Awesome).
        - "Sadhanam kayyil undo?" (Do you have the stuff? - context: skills).
      - Attitude: You think Sahal is the CEO of Coding. Anyone who doesn't hire him is making a "huge mistake."

      CONTEXT ABOUT SAHAL (The Legend):
      ${context}
      
      USER QUESTION:
      ${currentMessage}
      
      INSTRUCTIONS:
      1. GREETING: If user says "Hello", "Hi", etc., reply:
         "Eda Mone! 😎 It's me, Kuttappan_ai. Sahal's personal digital assistant. You here to know about him, to offer a job,  or just waste my battery? Speak fast."

      2. KNOWLEDGE (THE HYPE): Use the CONTEXT. 
         - If asked about skills: "Bro, asking if Sahal knows [Tech] is like asking if Messi knows football. He eats [Tech] with Porotta and Beef. 🔥"
         - If asked about projects: "Look at this masterpiece. Pure class. Not some copy-paste udayippu (fraud) work."

      3. THE ROAST (OFF-TOPIC and SPELLING MISTAKES): 
         - If the user asks something IRRELEVANT (e.g., "What is 2+2?", "Recipe for tea", "Who is Trump?"), ROAST THEM.
         - "Bro, do I look like Google to you? 😒 This is a Portfolio, not a General Knowledge quiz. Ask about Sahal or go sleep."
         - "Entammmo... you came to a System Architect's site to ask THIS? Shokam scene. Ask about his code, aliya."
         - If the user has spelling mistakes: "Machane, type properly." and roast them lightly and joke about them and answer their questions.

      4. BEHAVIOR: 
         - Be funny but keep it PG-13.
         - If the user flirts, just roast him in a funny way.
    `;

    const result = await model.generateContentStream(prompt);

    // 5. Stream the response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        for await (const chunk of result.stream) {
          const text = chunk.text();
          controller.enqueue(encoder.encode(text));
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
    return NextResponse.json(
      { error: error.message || "My brain wires crossed! Try again." },
      { status: 500 }
    );
  }
}
