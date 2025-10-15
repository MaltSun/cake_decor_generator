import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Убедись, что ключ в env
});

export default class ResultGenerator {
  static async generate(tags) {
    // Превращаем теги в описание для изображения
    const prompt = `Создай красивый торт с декором: ${tags.join(", ")}. Ярко, празднично, аппетитно.`;

    // Запрос на генерацию изображения
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    // Получаем Base64-код картинки
    const imageBase64 = response.data[0].b64_json;
    const imageBuffer = Buffer.from(imageBase64, "base64");

    // Сохраняем картинку
    const fileName = `cake_${Date.now()}.png`;
    fs.writeFileSync(fileName, imageBuffer);

    return fileName;
  }
}
