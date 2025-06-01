import { defineEventHandler, readBody } from 'h3';
import { callGeminiApi } from '../utils/geminiApi'; // Importar la función
import { generateTaskAIEvaluationPrompt } from '../utils/aiPrompts'; // Importar la función de generación de prompt

export default defineEventHandler(async (event) => {
  const { task } = await readBody(event);

  if (!task) {
    throw createError({
      statusCode: 400,
      message: 'Se requiere una tarea para analizar.'
    });
  }

  const prompt = generateTaskAIEvaluationPrompt(
    task.name,
    task.content,
    task.parentContent || '',
    task.parentName || '',
    task.planName || '',
    task.planContent || ''
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