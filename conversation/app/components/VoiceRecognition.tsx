import React, { useState, useEffect } from 'react';

interface VoiceRecognitionProps {
  onTranscript: (transcript: string) => void;
}

const VoiceRecognition: React.FC<VoiceRecognitionProps> = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'ja-JP';

        recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
          onTranscript(transcript);
        };

        setRecognition(recognitionInstance);
      }
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div>
      <button
        onClick={toggleListening}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isListening ? '停止' : '音声認識開始'}
      </button>
    </div>
  );
};

export default VoiceRecognition;