import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { message } = await req.json();
  const API_KEY = process.env.OPENAI_API_KEY;
  const API_URL = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );

    return NextResponse.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    return NextResponse.json({ error: 'エラーが発生しました。もう一度お試しください。' }, { status: 500 });
  }
}