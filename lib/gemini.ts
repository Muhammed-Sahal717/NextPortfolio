import { google } from "@ai-sdk/google";

// Central Gemini model configuration for API routes.
export const geminiModel = google("gemini-3.6-flash");
export const geminiEmbeddingModel =
  google.textEmbeddingModel("gemini-embedding-2");
