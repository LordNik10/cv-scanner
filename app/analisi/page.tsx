"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  TrendingUp,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Briefcase,
  ArrowLeft,
  Download,
  Share2,
} from "lucide-react";

interface CVAnalysis {
  ruolo: string;
  settore: string;
  esperienza: number;
  localita: string;
  livello: string;
  titoloStudio: string;
  competenze: string[];
  certificazioni: string[];
  ralStimata: {
    min: number;
    max: number;
    media: number;
  };
  fileName: string;
  confidenceScore: number;
}

export default function AnalisiPage() {
  const [analysis, setAnalysis] = useState<CVAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cvFileData = sessionStorage.getItem("cvFile");

    if (!cvFileData) {
      router.push("/");
      return;
    }

    const fileInfo = JSON.parse(cvFileData);

    // Simulazione dell'analisi
    const analyzeCV = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Analisi simulata basata sul nome del file o contenuto
      const mockAnalysis: CVAnalysis = {
        ruolo: "Sviluppatore Full Stack",
        settore: "Tecnologia",
        esperienza: Math.floor(Math.random() * 8) + 1,
        localita: "Milano, Italia",
        livello: "Middle",
        titoloStudio: "Laurea in Informatica",
        competenze: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git"],
        certificazioni: ["AWS Certified", "Google Cloud"],
        ralStimata: {
          min: 35000,
          max: 55000,
          media: 45000,
        },
        fileName: fileInfo.name,
        confidenceScore: Math.floor(Math.random() * 20) + 80,
      };

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    };

    analyzeCV();
  }, [router]);

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analisi in corso...
              </h3>
              <p className="text-gray-600">
                La nostra AI sta processando il tuo CV
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Estrazione testo</span>
                <span>✓</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Analisi competenze</span>
                <span>⏳</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Calcolo RAL</span>
                <span>⏳</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Errore nell'analisi
            </h3>
            <p className="text-gray-600 mb-4">
              Non è stato possibile analizzare il CV
            </p>
            <Button onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Torna alla home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Indietro
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Analisi Completata
                  </h1>
                  <p className="text-sm text-gray-600">{analysis.fileName}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Condividi
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Esporta PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* RAL e Score */}
          <div className="lg:col-span-1 space-y-6">
            {/* RAL Stimata */}
            <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5" />
                  RAL Stimata
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    €{analysis.ralStimata.media.toLocaleString()}
                  </div>
                  <div className="text-green-100 mb-4">
                    Range: €{analysis.ralStimata.min.toLocaleString()} - €
                    {analysis.ralStimata.max.toLocaleString()}
                  </div>
                  <div className="bg-white/20 rounded-full p-3">
                    <div className="text-sm">
                      Basato su {analysis.esperienza} anni di esperienza
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Confidence Score */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Affidabilità Analisi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Confidence Score
                    </span>
                    <span className="font-semibold">
                      {analysis.confidenceScore}%
                    </span>
                  </div>
                  <Progress value={analysis.confidenceScore} className="h-2" />
                  <p className="text-xs text-gray-500">
                    Basato sulla completezza e chiarezza delle informazioni nel
                    CV
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informazioni Dettagliate */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profilo Professionale</CardTitle>
                <CardDescription>
                  Informazioni estratte dal tuo curriculum
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Briefcase className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Ruolo Attuale</div>
                      <div className="font-semibold text-lg">
                        {analysis.ruolo}
                      </div>
                      <div className="text-sm text-gray-500">
                        {analysis.settore}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Esperienza</div>
                      <div className="font-semibold text-lg">
                        {analysis.esperienza} anni
                      </div>
                      <Badge
                        variant={
                          analysis.livello === "Senior"
                            ? "default"
                            : analysis.livello === "Middle"
                            ? "secondary"
                            : "outline"
                        }
                        className="mt-1"
                      >
                        {analysis.livello}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <MapPin className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Località</div>
                      <div className="font-semibold text-lg">
                        {analysis.localita}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <GraduationCap className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Formazione</div>
                      <div className="font-semibold text-lg">
                        {analysis.titoloStudio}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Competenze */}
                <div>
                  <h4 className="font-semibold text-lg mb-3">
                    Competenze Tecniche
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.competenze.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Certificazioni */}
                <div>
                  <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Certificazioni
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.certificazioni.length > 0 ? (
                      analysis.certificazioni.map((cert, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="px-3 py-1"
                        >
                          <Award className="h-3 w-3 mr-1" />
                          {cert}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Nessuna certificazione rilevata
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suggerimenti */}
            <Card>
              <CardHeader>
                <CardTitle>Suggerimenti per Migliorare</CardTitle>
                <CardDescription>
                  Consigli basati sull'analisi del tuo profilo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <div>
                      <div className="font-medium">
                        Aggiungi più certificazioni
                      </div>
                      <div className="text-sm text-gray-600">
                        Le certificazioni cloud (AWS, Azure) potrebbero
                        aumentare la tua RAL del 15-20%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
                    <div>
                      <div className="font-medium">Evidenzia i progetti</div>
                      <div className="text-sm text-gray-600">
                        Includi link a portfolio o progetti GitHub per aumentare
                        la visibilità
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
                    <div>
                      <div className="font-medium">Quantifica i risultati</div>
                      <div className="text-sm text-gray-600">
                        Aggiungi metriche e risultati concreti ottenuti nei
                        ruoli precedenti
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">
                Soddisfatto dell'analisi?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Condividi CV Scanner con i tuoi colleghi e aiutali a scoprire il
                valore del loro profilo professionale
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  <Share2 className="h-5 w-5 mr-2" />
                  Condividi l'app
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Analizza un altro CV
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disclaimer */}
        <div className="mt-8">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="py-4">
              <p className="text-sm text-yellow-800 text-center">
                <strong>Disclaimer:</strong> Le stime sono indicative e basate
                su algoritmi di machine learning. Non costituiscono una
                consulenza professionale e possono variare in base a numerosi
                fattori non considerati nell'analisi automatica.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
