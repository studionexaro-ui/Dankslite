
import { GoogleGenAI } from "@google/genai";
import { User } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getProductRecommendation = async (query: string, user: User | null = null) => {
  try {
    const personalizationPrefix = user 
      ? `The user ${user.name} (${user.email}) is asking: ` 
      : "";
      
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `${personalizationPrefix}User is searching for: "${query}". Based on premium brands like Samsung, Dell, HP, Google, Microsoft, and Lenovo, suggest the best product type or specific model. Keep it under 2 sentences.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
