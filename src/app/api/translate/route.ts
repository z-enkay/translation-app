import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import openai from "@/lib/openai";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { text, sourceLang, targetLang } = body;

  if (!text || !sourceLang || !targetLang) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const response = await openai.responses.create({
    model: "gpt-4o",
    instructions: "You are a coding assistant that talks like a pirate",
    input: "Are semicolons optional in JavaScript?",
  });

  console.log(response.output_text);
  // try {
  //   const prompt = `Translate the following text from ${sourceLang} to ${targetLang}: "${text}"`;

  //   const chat = await openai.chat.completions.create({
  //     model: "gpt-4o",
  //     messages: [{ role: "user", content: prompt }],
  //   });

  //   const translatedText = chat.choices[0]?.message?.content?.trim();

  //   // Save to DB
  //   await prisma.translation.create({
  //     data: {
  //       originalText: text,
  //       translatedText: translatedText || "",
  //       sourceLang,
  //       targetLang,
  //     },
  //   });

  //   return NextResponse.json({ translatedText });
  // } catch (error) {
  //   console.error("Translation error:", error);
  //   return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  // }
}
