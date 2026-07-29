import { readFile } from "fs/promises";
import path from "path";

const PROJECT_DOCS_DIR = path.join(process.cwd(), "content", "projects");
const MAX_CHUNK_LENGTH = 3200;
const CHUNK_OVERLAP = 300;

export async function getProjectDocumentation(
  slug: string
): Promise<string | null> {
  const filePath = path.resolve(PROJECT_DOCS_DIR, `${slug}.md`);

  if (!filePath.startsWith(`${PROJECT_DOCS_DIR}${path.sep}`)) {
    return null;
  }

  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return null;
    }

    throw error;
  }
}

export function formatProjectDocumentation(markdown: string): string {
  return markdown
    .replace(/\r\n/g, "\n")
    .trim()
    .replace(/^# .+(\n+|$)/, "")
    .trim();
}

export function chunkProjectDocument(text: string): string[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();

  if (!normalized) {
    return [];
  }

  const chunks: string[] = [];
  const paragraphs = normalized.split(/\n{2,}/);
  let current = "";

  for (const paragraph of paragraphs) {
    const next = current ? `${current}\n\n${paragraph}` : paragraph;

    if (next.length <= MAX_CHUNK_LENGTH) {
      current = next;
      continue;
    }

    if (current) {
      chunks.push(current);
    }

    if (paragraph.length <= MAX_CHUNK_LENGTH) {
      current = withOverlap(chunks.at(-1), paragraph);
      continue;
    }

    const splitParagraphs = splitLongText(paragraph);
    chunks.push(...splitParagraphs.slice(0, -1));
    current = splitParagraphs.at(-1) || "";
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}

function splitLongText(text: string): string[] {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    const end = Math.min(start + MAX_CHUNK_LENGTH, text.length);
    chunks.push(text.slice(start, end).trim());

    if (end === text.length) {
      break;
    }

    start = Math.max(end - CHUNK_OVERLAP, start + 1);
  }

  return chunks.filter(Boolean);
}

function withOverlap(previous: string | undefined, current: string): string {
  if (!previous) {
    return current;
  }

  const overlap = previous.slice(-CHUNK_OVERLAP).trim();
  const next = overlap ? `${overlap}\n\n${current}` : current;

  return next.length <= MAX_CHUNK_LENGTH ? next : current;
}
