import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateImage(tags) {
  const prompt = `Создай красивый торт с такими элементами: ${tags.join(', ')}`;
  
  const response = await client.images.generate({
    model: 'gpt-image-1',
    prompt,
    size: '512x512'
  });

  return response.data[0].url;
}
