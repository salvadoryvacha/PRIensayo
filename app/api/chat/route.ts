import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Falta la clave de OpenAI" }, { status: 500 });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Eres un asistente útil y respondes en español." },
        { role: "user", content: message },
      ],
      max_tokens: 200,
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "No hay respuesta.";
  return NextResponse.json({ reply });
} 