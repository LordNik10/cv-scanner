import { AnalyzedFile } from "@/app/types";
import { useState } from "react";
import { toast } from "sonner";

export const useAnalyze = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AnalyzedFile | null>(null);
  const [error, setError] = useState<boolean>(false);

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
      if (response.status === 429) {
        throw new Error("Quota exceeded. Please try again later.");
      }

      if (!response.ok) {
        throw new Error("File analysis failed");
      }

      const data = await response.json();

      setReport(data);
    } catch (error) {
      console.error("Errore durante l'analisi del file1:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Errore sconosciuto durante l'analisi del file"
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { loading, analyzeFile, report, error };
};
