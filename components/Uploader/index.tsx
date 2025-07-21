"use client";
import { Brain, FileText, Shield, Upload } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Uploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      alert("Per favore seleziona un file PDF valido");
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    // Simulazione upload e processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Salva il file nel sessionStorage per la pagina di analisi
    const reader = new FileReader();
    reader.onload = () => {
      sessionStorage.setItem(
        "cvFile",
        JSON.stringify({
          name: selectedFile.name,
          content: reader.result,
          uploadTime: new Date().toISOString(),
        })
      );
      router.push("/analisi");
    };
    reader.readAsText(selectedFile);
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
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              id="cv-upload"
            />
            <label
              htmlFor="cv-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <FileText className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm text-blue-600 font-medium">
                {selectedFile
                  ? selectedFile.name
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
            disabled={!selectedFile || isUploading}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg"
          >
            {isUploading ? (
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
