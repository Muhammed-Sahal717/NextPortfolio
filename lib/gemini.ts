import { google } from "@ai-sdk/google";

// This is just a configuration reference we will use in our API routes
export const geminiModel = google("gemini-2.5-flash");
export const geminiEmbeddingModel =
  google.textEmbeddingModel("text-embedding-004");
