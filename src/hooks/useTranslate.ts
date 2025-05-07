import { useEffect, useState } from "react";

interface Props {
  text: string;
  selectedLanguage: string;
  sourceLang: string;
  targetLang: string;
}

const useTranslate = ({
  text,
  selectedLanguage,
  sourceLang,
  targetLang,
}: Props) => {
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const handleTranslate = async (text: string) => {
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
        console.error("Error during translation:", error);
        setTranslatedText("Error occurred during translation.");
      }
    };

    if (text.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(text);
      }, 500); // Adjust the delay as needed

      return () => clearTimeout(timeoutId);
    }
  }, [text, selectedLanguage]);

  return translatedText;
};

export default useTranslate;
