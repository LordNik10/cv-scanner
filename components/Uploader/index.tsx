"use client";
import { Brain, FileText, Shield, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export function Uploader() {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [inputMode, setInputMode] = useState<"text" | "upload">("text");
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  console.log(selectedFile);

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Manda i byte grezzi al backend in Base64
    const base64 = Buffer.from(uint8Array).toString("base64");

    setSelectedFile(base64);
    setSelectedFileName(file.name);
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      sessionStorage.setItem("selectedFile", JSON.stringify(selectedFile));
      sessionStorage.setItem(
        "selectedFileName",
        inputMode === "upload" ? selectedFileName : ""
      );
      sessionStorage.setItem("inputMode", inputMode);
      router.push(`/analisi`);
    } catch (error) {
      console.error("Errore durante l'analisi del file:", error);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Input Mode Switch */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-full p-1 border border-gray-200 shadow-lg">
          <div className="flex items-center">
            <button
              onClick={() => setInputMode("text")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                inputMode === "text"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <FileText className="h-4 w-4" />
              Incolla Testo
            </button>
            <button
              onClick={() => setInputMode("upload")}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all ${
                inputMode === "upload"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Upload className="h-4 w-4" />
              Carica PDF
            </button>
          </div>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto mb-12 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
        {inputMode === "upload" && (
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Carica il tuo CV in PDF
                </h3>
                <p className="text-gray-600">
                  Carica il file PDF del tuo curriculum
                </p>
              </div>

              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="cv-upload"
                />
                <label
                  htmlFor="cv-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <Upload className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-sm text-blue-600 font-medium">
                    {selectedFileName
                      ? selectedFileName
                      : "Clicca per selezionare il PDF"}
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-green-600 mb-4">
                <Shield className="h-4 w-4" />
                <span className="font-medium">
                  Nessuna registrazione • Analisi immediata
                </span>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!selectedFile || loading}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Caricamento in corso...
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 mr-3" />
                    Analizza il mio CV
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        )}

        {inputMode === "text" && (
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Incolla il testo del tuo CV
                </h3>
                <p className="text-gray-600">
                  Copia e incolla il contenuto testuale del tuo curriculum
                </p>
              </div>

              <div className="relative">
                <textarea
                  value={selectedFile}
                  onChange={(e) => setSelectedFile(e.target.value)}
                  placeholder={`Incolla qui il testo del tuo CV...
              

Esempio:
Mario Rossi
Sviluppatore Full Stack
Email: mario.rossi@email.com
Telefono: +39 123 456 7890

ESPERIENZA LAVORATIVA
Sviluppatore Senior presso TechCorp (2020-2024)
- Sviluppo applicazioni web con React e Node.js
- Gestione team di 3 sviluppatori junior
...`}
                  className="w-full h-64 p-4 border-2 border-blue-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                />
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-green-600 mb-4">
                <Shield className="h-4 w-4" />
                <span className="font-medium">
                  Nessuna registrazione • Analisi immediata
                </span>
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!selectedFile || loading}
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                    Caricamento in corso...
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 mr-3" />
                    Analizza il mio CV
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
}
