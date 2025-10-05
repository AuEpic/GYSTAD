

import { GoogleGenAI, Type } from "@google/genai";
import type { AIAnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function analyzeContent(contentSummary: string, userPrompt: string): Promise<AIAnalysisResult> {
  // FIX: Per coding guidelines, API_KEY is assumed to be present. The check is removed.
  // The SDK will throw an error if the key is missing or invalid, which will be caught below.
  try {
    const systemInstruction = `You are an expert file organization assistant. Your goal is to analyze content summaries and suggest organizational improvements.
Respond ONLY with a valid JSON object based on the schema. Do not include any other text or markdown formatting.`;

    const contents = `Analyze the following item and provide organizational suggestions.
Item content summary: "${contentSummary}"
User's request: "${userPrompt}"`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: {
              type: Type.STRING,
              description: "A single, concise category for the item (e.g., 'Development', 'Design Asset', 'Archived Project')."
            },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of 3-5 relevant keywords or tags."
            },
            summary: {
              type: Type.STRING,
              description: "A brief, one-sentence summary of the item's purpose and content."
            },
            suggested_action: {
              type: Type.STRING,
              description: "A concrete, actionable suggestion (e.g., 'Move to /Projects/Archive', 'Associate with Project Phoenix', 'Review for deletion')."
            }
          },
          required: ["category", "tags", "summary", "suggested_action"]
        },
      },
    });

    const jsonText = response.text.trim();
    const result: AIAnalysisResult = JSON.parse(jsonText);
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please check the console for more details.");
  }
}
