import { useState } from "react";

export const useAnalyze = () => {
  const [loading, setLoading] = useState(false);

  const analyzeFile = async (file: string, fileName: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file, fileName: fileName }),
      });
      return await response.json();
    } catch (error) {
      console.error("Errore durante l'analisi del file:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, analyzeFile };
};
