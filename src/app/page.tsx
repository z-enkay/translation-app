"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState("English");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    setLoading(true);
    setTranslatedText("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, sourceLang, targetLang }),
      });

      const data = await response.json();
      setTranslatedText(data.translatedText || "No translation found.");
    } catch (error) {
      setTranslatedText("Error occurred during translation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🈯 Translation App</h1>

      <textarea
        className="w-full p-2 border rounded mb-4"
        rows={4}
        placeholder="Enter text to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex gap-4 mb-4">
        <input
          className="w-full p-2 border rounded"
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          placeholder="Source language"
        />
        <input
          className="w-full p-2 border rounded"
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          placeholder="Target language"
        />
      </div>

      <button
        onClick={handleTranslate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {translatedText && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Translation:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </main>
  );
}
