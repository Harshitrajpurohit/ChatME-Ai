
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.SECRET_API_KEY });

export default async function gemeniApi(data) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: data,
  });
  return await response.text;
}
