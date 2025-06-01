import { GoogleGenerativeAI } from '@google/generative-ai';

export async function callGeminiApi(prompt: string): Promise<string> {
  const config = useRuntimeConfig();  // loads environment variables from nuxt.config.ts
  const apiKey = config.geminiApiKey; // Acceder a la clave API

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY no está configurada.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  console.log('genAI:', genAI);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  console.log('model:', model);

  // const fullPrompt = `${prompt}\n\nTexto a analizar: "${text}"`;
  console.log('fullPrompt:', prompt);
  const result = await model.generateContent(prompt);
  const response_text = await result.response.text();
  console.log('response text:', response_text);
  return response_text;
}