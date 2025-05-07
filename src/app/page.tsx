"use client";

import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import useTranslate from "@/hooks/useTranslate";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Spanish");

  const translatedText = useTranslate({
    text,
    sourceLang,
    targetLang,
    selectedLanguage: targetLang,
  });

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <div className="flex flex-col items-center justify-center">
        <Image src={"/logo.png"} width="100" height="100" alt="logo" />
        <h1 className="text-2xl font-bold mb-4">Translation App</h1>
      </div>

      <div className="flex justify-center items-center pt-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-4xl">
          <div className="p-6 border-r border-gray-200">
            <div className="mb-2">
              <select
                className="w-full text-sm font-semibold text-gray-700 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setSourceLang(e.target.value)}
                defaultValue={sourceLang}
              >
                <option>English</option>
                <option>Vietnamese</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="p-3 flex flex-col border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
              <textarea
                className="w-full h-28 pb-2 text-gray-800 text-base resize-none focus:outline-none"
                placeholder="Enter text to translate..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <SpeechRecognitionComponent setSourceText={setText} />
            </div>
          </div>

          <div className="p-6">
            <div className="mb-2">
              <select
                className="w-full text-sm font-semibold text-gray-700 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setTargetLang(e.target.value)}
                defaultValue={targetLang}
              >
                <option>Spanish</option>
                <option>Vietnamese</option>
                <option>English</option>
                <option>French</option>
                <option>Germany</option>
              </select>
            </div>
            <div className="w-full h-[168px] p-3 mt-2 border rounded-lg text-gray-800 text-base bg-gray-50">
              {translatedText}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
