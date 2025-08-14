import pdf from "pdf-parse";

export async function extractTextFromPdfString(pdfString: string) {
  try {
    const buffer = Buffer.from(pdfString, "base64");

    const data = await pdf(buffer);

    return data.text;
  } catch (err) {
    console.error("Errore durante la lettura del PDF:", err);
    return null;
  }
}
