'use client';

import React, { useState } from 'react';
import VoiceRecognition from './components/VoiceRecognition';
import VoiceOutput from './components/VoiceOutput';
import { getChatGPTResponse } from './utils/chatgpt';

export default function Home() {
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const handleTranscript = async (newTranscript: string) => {
    setTranscript(newTranscript);
    const chatGPTResponse = await getChatGPTResponse(newTranscript);
    setResponse(chatGPTResponse);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">音声対話システム</h1>
      <div className="w-full max-w-2xl">
        <VoiceRecognition onTranscript={handleTranscript} />
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">認識されたテキスト:</h2>
          <p className="bg-gray-100 p-4 rounded">{transcript}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">ChatGPTの応答:</h2>
          <p className="bg-gray-100 p-4 rounded">{response}</p>
        </div>
        <div className="mt-4">
          <VoiceOutput text={response} />
        </div>
      </div>
    </main>
  );
}