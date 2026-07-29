import { createClient } from "@supabase/supabase-js";
import { embed } from "ai";
import { NextResponse } from "next/server";
import { geminiEmbeddingModel } from "@/lib/gemini";
import {
  chunkProjectDocument,
  formatProjectDocumentation,
  getProjectDocumentation,
} from "@/lib/project-docs";

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
  const { error: deleteError } = await supabase
    .from("documents")
    .delete()
    .neq("id", 0);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  // 2. Fetch projects and experience
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id, title, slug, description, tech_stack");
  const { data: experiences, error: experiencesError } = await supabase
    .from("experience")
    .select("*");

  if (projectsError) {
    return NextResponse.json({ error: projectsError.message }, { status: 500 });
  }

  if (experiencesError) {
    return NextResponse.json(
      { error: experiencesError.message },
      { status: 500 }
    );
  }

  let projectChunkCount = 0;
  let experienceCount = 0;

  // 3. Process Projects
  if (projects) {
    for (const project of projects) {
      const techStack = Array.isArray(project.tech_stack)
        ? project.tech_stack.join(", ")
        : project.tech_stack;
      const rawDocumentation = await getProjectDocumentation(project.slug);
      const documentation = rawDocumentation
        ? formatProjectDocumentation(rawDocumentation)
        : null;

      const projectChunks: string[] = [];

      // Dedicated project overview chunk (ideal for broad queries)
      const overviewChunk = `[Project: ${project.title}]\nSummary: ${project.description}\nTech Stack: ${techStack}`;
      projectChunks.push(overviewChunk);

      // Section-aware documentation chunks prefixed with lightweight project context tag
      if (documentation) {
        const rawDocChunks = chunkProjectDocument(documentation);
        for (const docChunk of rawDocChunks) {
          projectChunks.push(`[Project: ${project.title}]\n${docChunk}`);
        }
      }

      for (const [chunkIndex, chunk] of projectChunks.entries()) {
        const { embedding } = await embed({
          model: geminiEmbeddingModel,
          value: chunk,
        });

        const { error: insertError } = await supabase.from("documents").insert({
          content: chunk,
          embedding: embedding,
          metadata: {
            source: "project",
            project_id: project.id,
            slug: project.slug,
            chunk_index: chunkIndex,
          },
        });

        if (insertError) {
          return NextResponse.json(
            { error: insertError.message },
            { status: 500 }
          );
        }

        projectChunkCount += 1;
      }
    }
  }

  // 4. Process Experience
  if (experiences) {
    for (const exp of experiences) {
      const skills = Array.isArray(exp.skills) ? exp.skills.join(", ") : exp.skills;
      const textToEmbed = `Experience Role: ${exp.role} at ${exp.company}. Duration: ${exp.start_date} to ${exp.end_date || 'Present'}. Description: ${exp.description}. Skills used: ${skills}.`;

      const { embedding } = await embed({
        model: geminiEmbeddingModel,
        value: textToEmbed,
      });

      const { error: insertError } = await supabase.from("documents").insert({
        content: textToEmbed,
        embedding: embedding,
        metadata: { source: "experience", id: exp.id },
      });

      if (insertError) {
        return NextResponse.json(
          { error: insertError.message },
          { status: 500 }
        );
      }

      experienceCount += 1;
    }
  }

  return NextResponse.json({
    message: "Success! AI memory updated with Projects and Experience.",
    project_chunks: projectChunkCount,
    experience_documents: experienceCount,
  });
}
