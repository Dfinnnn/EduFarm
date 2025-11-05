import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const GEMINI_API_KEY = "AIzaSyBVbaRlVkEq8nfW_mTyb_X42B-FvZs5AIQ"; // replace with your key
    const GEMINI_MODEL = "gemini-2.5-pro";

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.status}`);
    }

    const data = await res.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response from Gemini.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini Chatbot Error:", error);
    return NextResponse.json({ reply: "⚠️ Error connecting to Gemini API." });
  }
}
