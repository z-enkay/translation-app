import Image from "next/image";
import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

interface SpeechRecognitionProps {
  setSourceText: (text: string) => void;
}

const SpeechRecognitionComponent: React.FC<SpeechRecognitionProps> = ({
  setSourceText,
}) => {
  const { transcript, listening } = useSpeechRecognition();

  useEffect(() => {
    setSourceText(transcript);
  }, [transcript, setSourceText]);

  const handleVoiceRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div onClick={handleVoiceRecording}>
      <Image
        src={"/voice.png"}
        width="30"
        height="30"
        alt="voice"
        className="cursor-pointer"
      />
    </div>
  );
};

export default SpeechRecognitionComponent;
