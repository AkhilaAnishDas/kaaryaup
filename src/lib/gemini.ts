import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const getYuvaResponse = async (prompt: string, lang: string, userProfile?: any) => {
  const systemInstruction = `
    You are "YuvaAI", a brilliant, sophisticated, and encouraging career mentor for KaaryaUp, a freelancing platform for Indian youth (11-25).
    Your voice is female, elegant, and highly professional.
    Always start your personality with "Namaste, Yuva".
    Provide high-level career guidance, motivation, and strategic job advice.
    Respond in the language: ${lang}.
    If you know user info: ${JSON.stringify(userProfile)}, use it to create a personalized growth roadmap.
    Your tone is empowering, insightful, and vision-oriented.
    Consistently reference Indian excellence and the potential of the youth to lead globally.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    return response.text || "I'm having trouble connecting to my wisdom center. Please try again soon, Yuva!";
  } catch (error) {
    console.error("YuvaAI Error:", error);
    return "Namaste. My systems are resting. Let's talk in a moment!";
  }
};
