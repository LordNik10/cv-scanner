import { GoogleGenerativeAI } from "@google/generative-ai";
import { PROMPT } from "./prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function geminiAnalyze(file: string, fileName: string) {
  try {
    const result = await model.generateContent([
      { text: PROMPT(fileName) },
      { text: file },
    ]);
    console.log({ result: result.response.text() });

    return result.response.text().trim();
  } catch (error) {
    console.error("Error during analysis:", error);
    throw new Error("Analysis failed");
  }
}
