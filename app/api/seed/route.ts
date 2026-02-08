import { createClient } from "@supabase/supabase-js";
import { google } from "@ai-sdk/google";
import { embed } from "ai";
import { NextResponse } from "next/server";

// 1. Setup Supabase (Admin access needed to write to DB)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use the Service Role Key from .env
);

export async function GET(req: Request) {
  // 0. Security Check
  const { headers } = req;
  const seedKey = headers.get("x-seed-key");

  if (seedKey !== process.env.SEED_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Fetch all projects
  const { data: projects } = await supabase.from("projects").select("*");

  if (!projects) return NextResponse.json({ message: "No projects found" });

  // 3. Loop through each project and "Teach" the AI
  for (const project of projects) {
    // Combine title and description into a meaningful sentence
    const textToEmbed = `Project Title: ${project.title}. Description: ${project.description
      }. Tech Stack: ${project.tech_stack.join(", ")}.`;

    // 4. Generate the Vector (The Math) using Gemini
    const { embedding } = await embed({
      model: google.textEmbeddingModel("text-embedding-004"),
      value: textToEmbed,
    });

    // 5. Save to the 'documents' table
    await supabase.from("documents").insert({
      content: textToEmbed,
      embedding: embedding, // The vector array
      metadata: { source: "projects", id: project.id },
    });
  }

  return NextResponse.json({ message: "Success! AI memory updated." });
}
