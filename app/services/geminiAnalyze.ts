import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPT } from "./prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function geminiAnalyze(file: string, fileName: string) {
  try {
    const result = await model.generateContent([
      { text: PROMPT(fileName) },
      { text: file },
    ]);

    return result.response.text().trim();
  } catch (error) {
    console.error("Error during analysis:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
}
