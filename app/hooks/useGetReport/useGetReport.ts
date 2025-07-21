import { useState } from "react";

export const useGetReport = (id: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [report, setReport] = useState<any>("");
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
