import { CVAnalysis } from "@/components/Report";
import { useState } from "react";

export const useGetReport = (id: string) => {
  const [report, setReport] = useState<CVAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const getReport = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/get-report/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error("Errore durante l'analisi del file:", error);
    } finally {
      setLoading(false);
    }
  };

  return { report, loading, getReport };
};
