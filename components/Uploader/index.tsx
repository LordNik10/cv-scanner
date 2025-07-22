"use client";
import { Brain, FileText, Shield, Upload } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAnalyze } from "@/app/hooks/useAnalyze/useAnalyze";

export function Uploader() {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const router = useRouter();
  const { analyzeFile, loading } = useAnalyze();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFileName(file.name);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result;
      if (typeof text === "string") {
        setSelectedFile(text);
      }
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    try {
      const response = await analyzeFile(selectedFile, selectedFileName);
      console.log("Report ID:", response);

      if (!response || !response.reportId) {
        return;
      }

      router.push(`/analisi/${response.reportId}`);
    } catch (error) {
      console.error("Errore durante l'analisi del file:", error);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mb-12 shadow-xl border-0 bg-white/70 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Carica il tuo CV
            </h3>
            <p className="text-gray-600">Supportiamo file PDF fino a 10MB</p>
          </div>

          <div className="relative">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="cv-upload"
            />
            <label
              htmlFor="cv-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <FileText className="h-8 w-8 text-blue-500 mb-2" />
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
    </Card>
  );
}
