import pdf from "pdf-parse";

export async function extractTextFromPdfString(pdfString: string) {
  try {
    // Converte da stringa binaria a Buffer
    const buffer = Buffer.from(pdfString, "base64");
    console.log("Buffer size:", buffer);

    // Estrae testo
    const data = await pdf(buffer);
    console.log("PDF text:", data.text);

    return data.text;
  } catch (err) {
    console.error("Errore durante la lettura del PDF:", err);
    return null;
  }
}
