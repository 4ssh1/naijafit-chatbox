import { GoogleGenAI } from "@google/genai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables");
}

export const googleAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
