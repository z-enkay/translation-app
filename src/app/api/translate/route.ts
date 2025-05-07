import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import ai from "@/lib/ai";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { text, sourceLang, targetLang } = body;

  try {
    const prompt = `You will be provided with a sentence. This sentence: 
              ${text}. Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into ${targetLang}
              Do not return anything other than the translated sentence.`;

    const chat = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    const translatedText = chat.text;

    // Save to DB
    await prisma.translation.create({
      data: {
        originalText: text,
        translatedText: translatedText || "",
        sourceLang,
        targetLang,
      },
    });

    return NextResponse.json({ translatedText });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
