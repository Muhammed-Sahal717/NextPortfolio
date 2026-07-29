import { readFile } from "fs/promises";
import path from "path";

const PROJECT_DOCS_DIR = path.join(process.cwd(), "content", "projects");
const MAX_CHUNK_LENGTH = 1600;
const CHUNK_OVERLAP = 200;

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

export interface NavSection {
  id: string;
  label: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export function extractNavSections(markdown: string): NavSection[] {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  const headingRegex = /^##\s+(.+)$/gm;
  const matches = Array.from(normalized.matchAll(headingRegex));

  if (matches.length === 0) {
    return [{ id: "overview", label: "Overview" }];
  }

  return matches.map((match) => {
    const label = match[1].trim();
    const id = slugify(label);
    return { id, label };
  });
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

  // Split content into blocks based on double newlines
  const blocks = normalized.split(/\n{2,}/);
  const chunks: string[] = [];
  let current = "";

  for (const block of blocks) {
    const isHeading = /^#{1,4}\s+/.test(block.trim());

    // If starting a new section heading and current chunk is substantial (> 400 chars), push current chunk
    if (isHeading && current.length >= 400) {
      chunks.push(current.trim());
      current = "";
    }

    const next = current ? `${current}\n\n${block}` : block;

    if (next.length <= MAX_CHUNK_LENGTH) {
      current = next;
      continue;
    }

    if (current) {
      chunks.push(current.trim());
    }

    if (block.length <= MAX_CHUNK_LENGTH) {
      current = withOverlap(chunks.at(-1), block);
      continue;
    }

    const splitBlocks = splitLongText(block);
    chunks.push(...splitBlocks.slice(0, -1));
    current = splitBlocks.at(-1) || "";
  }

  if (current.trim()) {
    chunks.push(current.trim());
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
