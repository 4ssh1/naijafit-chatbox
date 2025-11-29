import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const googleAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, history = [] } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const messages = history.map((msg: any) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    messages.push({
      role: "user",
      parts: [{ text: prompt }],
    });

    const resultPromise = googleAI.models.generateContentStream({
      model: "gemini-2.5-flash",
      config: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
      contents: messages,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const result = await resultPromise;
        for await (const chunk of result) {
          const text = chunk.text;
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Gemini error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate response" },
      { status: 500 }
    );
  }
}
