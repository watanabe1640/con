import axios from 'axios';

export async function getChatGPTResponse(message: string): Promise<string> {
  try {
    const response = await axios.post('/api/chat', { message });
    return response.data.response;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    return 'エラーが発生しました。もう一度お試しください。';
  }
}