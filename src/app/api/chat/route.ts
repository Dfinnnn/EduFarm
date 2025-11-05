import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 🔐 Load from environment (.env.local)
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-pro";

    if (!GEMINI_API_KEY) {
      throw new Error("Missing Gemini API key. Please set GEMINI_API_KEY in .env.local");
    }

    // 🧠 System instruction
    const systemPrompt = `
You are an experienced agricultural assistant designed to help farmers.
Your tone is warm, professional, and supportive.
Provide clear, practical, and well-structured answers about farming, crops, soil, weather, pest management, irrigation, and sustainable agriculture practices.
Avoid using bullet points (*, -, •). Write in complete sentences and paragraphs.
If the user greets you or asks casual, non-agricultural questions, reply briefly and naturally, like a friendly assistant.
If the user asks about farming or agriculture, provide a clear, informative, and well-explained answer.
Focus on being helpful, natural, and easy to understand at all times.
    `;

    // 🌐 Send request to Gemini API
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            { parts: [{ text: systemPrompt }] },
            { parts: [{ text: message }] },
          ],
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const data = await res.json();
    let reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response from Gemini.";

    // 🧹 Clean formatting
    reply = reply
      .replace(/\*/g, "")
      .replace(/#+/g, "")
      .replace(/\n{2,}/g, "\n")
      .trim();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini Chatbot Error:", error);
    return NextResponse.json({ reply: "⚠️ Error connecting to Gemini API." });
  }
}
