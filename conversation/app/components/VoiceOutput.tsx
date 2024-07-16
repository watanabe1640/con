import React, { useEffect, useState } from 'react';

interface VoiceOutputProps {
  text: string;
}

const VoiceOutput: React.FC<VoiceOutputProps> = ({ text }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const updateVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (voices.length > 0) {
      const japaneseVoice = voices.find(voice => voice.lang === 'ja-JP');
      setSelectedVoice(japaneseVoice || voices[0]);
    }
  }, [voices]);

  const speak = () => {
    if (!selectedVoice) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <button
        onClick={speak}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        読み上げ
      </button>
    </div>
  );
};

export default VoiceOutput;