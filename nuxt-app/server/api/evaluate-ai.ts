import { defineEventHandler, readBody } from 'h3';
import { callGeminiApi } from '../utils/geminiApi'; // Importar la función
import { generateTaskAIEvaluationPrompt } from '../utils/aiPrompts'; // Importar la función de generación de prompt

export default defineEventHandler(async (event) => {
  const { task, workstream } = await readBody(event);

  if (!task || !workstream) {
    throw createError({
      statusCode: 400,
      message: 'Se requiere una tarea y un workstream para analizar.'
    });
  }

  console.log('Tarea recibida para evaluación AI:', task);
  console.log('Workstream recibido para evaluación AI:', workstream);

  const prompt = generateTaskAIEvaluationPrompt(
    task.title,
    task.description,
    workstream.title,
    workstream.description,
  );

  try {
    const aiOutput = await callGeminiApi(prompt);
    console.log('Resultado evaluación AI:', aiOutput)
    return { success: true, evaluationResult: aiOutput };
  } catch (error: any) {
    console.error('Error al llamar a la API de Gemini:', error);
    throw createError({
      statusCode: error.statusCode || 500, // Mantener el statusCode si viene del error interno
      message: error.message || 'Error al procesar la evaluación de AI.'
    });
  }
});