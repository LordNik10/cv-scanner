import { geminiAnalyze } from "./geminiAnalyze";

export const analyze = async (file: string, fileName: string) => {
  try {
    // call the function to analyze the file
    const result = await geminiAnalyze(file, fileName);
    return { result };
  } catch (error) {
    console.error("Errore durante l'analisi del file:", error);
    throw new Error("Analisi fallita");
  }
};
