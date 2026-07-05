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

  if (!process.env.SEED_SECRET_KEY || seedKey !== process.env.SEED_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 1. Wipe old embeddings to prevent duplicates
  await supabase.from("documents").delete().neq("id", 0);

  // 2. Fetch projects and experience
  const { data: projects } = await supabase.from("projects").select("*");
  const { data: experiences } = await supabase.from("experience").select("*");

  // 3. Process Projects
  if (projects) {
    for (const project of projects) {
      const techStack = Array.isArray(project.tech_stack) ? project.tech_stack.join(", ") : project.tech_stack;
      const textToEmbed = `Project Title: ${project.title}. Description: ${project.description}. Tech Stack: ${techStack}.`;

      const { embedding } = await embed({
        model: google.textEmbeddingModel("text-embedding-004"),
        value: textToEmbed,
      });

      await supabase.from("documents").insert({
        content: textToEmbed,
        embedding: embedding,
        metadata: { source: "projects", id: project.id },
      });
    }
  }

  // 4. Process Experience
  if (experiences) {
    for (const exp of experiences) {
      const skills = Array.isArray(exp.skills) ? exp.skills.join(", ") : exp.skills;
      const textToEmbed = `Experience Role: ${exp.role} at ${exp.company}. Duration: ${exp.start_date} to ${exp.end_date || 'Present'}. Description: ${exp.description}. Skills used: ${skills}.`;

      const { embedding } = await embed({
        model: google.textEmbeddingModel("text-embedding-004"),
        value: textToEmbed,
      });

      await supabase.from("documents").insert({
        content: textToEmbed,
        embedding: embedding,
        metadata: { source: "experience", id: exp.id },
      });
    }
  }

  return NextResponse.json({ message: "Success! AI memory updated with Projects and Experience." });
}
