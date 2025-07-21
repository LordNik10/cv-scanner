export const analyze = async (file: string, fileName: string) => {
  try {
    // call the function to analyze the file

    return { ciao: "ciao", fileName }; // Replace with actual analysis logic
  } catch (error) {
    console.error("Errore durante l'analisi del file:", error);
    throw new Error("Analisi fallita");
  }
};
