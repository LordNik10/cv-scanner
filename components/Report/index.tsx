"use client";
import { useAnalyze } from "@/app/hooks/useAnalyze/useAnalyze";
import {
  ArrowLeft,
  Award,
  Brain,
  Briefcase,
  Calendar,
  Download,
  GraduationCap,
  MapPin,
  Share2,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

export function Report() {
  const { analyzeFile, loading, report, error } = useAnalyze();
  const router = useRouter();

  const [isDownloading, setIsDownloading] = useState(false);

  const getReport = async () => {
    const file = sessionStorage.getItem("selectedFile");
    const fileName = sessionStorage.getItem("selectedFileName");
    const inputMode = sessionStorage.getItem("inputMode");
    if (file) {
      await analyzeFile(file, fileName ?? "", inputMode as "text" | "upload");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    getReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShare = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast.success("Link copiato negli appunti!");
  };

  const generatePDF = async (elementToPrintId: string) => {
    setIsDownloading(true);
    const body = document.querySelector("body");
    if (body) {
      body.style.overflowY = "hidden";
    }
    const element = document.getElementById(elementToPrintId);
    if (!element) {
      setIsDownloading(false);
      if (body) {
        body.style.overflowY = "auto";
      }
      throw new Error(`Element with id ${elementToPrintId} not found`);
    }

    const canvas = await html2canvas(element, { scale: 3 }); // qualità alta
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(data);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Prima pagina
    pdf.addImage(data, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Aggiunge pagine se necessario
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(data, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }
    setIsDownloading(false);
    if (body) {
      body.style.overflowY = "auto";
    }
    pdf.save("report.pdf");
  };

  if (loading) {
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

  if (!report || error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Errore nell&apos;analisi
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
      {isDownloading && (
        <div className="absolute inset-0 h-full flex items-center justify-center bg-black/50 z-50">
          <div className="top-4 left-1/2 transform -translate-x-1/2 animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
        </div>
      )}
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
                  <p className="text-sm text-gray-600">{report.fileName}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Condividi
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => generatePDF("report")}
              >
                <Download className="h-4 w-4 mr-2" />
                Esporta PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div id="report">
          {report.owner && (
            <div className="mb-8">
              <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200">
                <CardContent className="py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl font-bold">
                        {report.owner
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">
                        {report.owner}
                      </h2>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <div className="grid lg:grid-cols-2 gap-8">
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
                      €{report.estimatedRal.average.toLocaleString()}
                    </div>
                    <div className="text-green-100 mb-4">
                      Range: €{report.estimatedRal.min.toLocaleString()} - €
                      {report.estimatedRal.max.toLocaleString()}
                    </div>
                    <div className="bg-white/20 rounded-full p-3">
                      <div className="text-sm">
                        Basato su {report.experience} anni di esperienza
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Confidence Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Affidabilità Analisi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Confidence Score
                      </span>
                      <span className="font-semibold">
                        {report.confidenceScore}%
                      </span>
                    </div>
                    <Progress value={report.confidenceScore} className="h-2" />
                    <p className="text-xs text-gray-500">
                      Basato sulla completezza e chiarezza delle informazioni
                      nel CV
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CV Score Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Brain className="h-5 w-5 text-purple-600" />
                  </div>
                  CV Score
                </CardTitle>
                <CardDescription>
                  Valutazione dettagliata del tuo curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Overall Score */}
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                      <svg
                        className="w-24 h-24 transform -rotate-90"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          className="text-gray-200"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${
                            2 *
                            Math.PI *
                            40 *
                            (1 - report.cvScore.overall / 100)
                          }`}
                          className="text-purple-600 transition-all duration-1000 ease-out"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-purple-600">
                          {report.cvScore.overall}
                        </span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      Score Complessivo
                    </div>
                    <div className="text-sm text-gray-600">
                      {report.cvScore.overall >= 80
                        ? "Eccellente"
                        : report.cvScore.overall >= 70
                        ? "Buono"
                        : report.cvScore.overall >= 60
                        ? "Discreto"
                        : "Da migliorare"}
                    </div>
                  </div>

                  <Separator />

                  {/* Section Scores */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">
                      Valutazione per Sezioni
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(report.cvScore.sections).map(
                        ([section, score]) => {
                          const sectionNames = {
                            personalInfo: "Informazioni Personali",
                            experience: "Esperienza Lavorativa",
                            skills: "Competenze Tecniche",
                            education: "Formazione",
                            certifications: "Certificazioni",
                            formatting: "Formattazione",
                          };

                          return (
                            <div key={section} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-700">
                                  {
                                    sectionNames[
                                      section as keyof typeof sectionNames
                                    ]
                                  }
                                </span>
                                <span className="text-sm font-semibold text-gray-900">
                                  {score}/10
                                </span>
                              </div>
                              <Progress value={score * 10} className="h-2" />
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                        <div className="text-sm text-gray-600">
                          Ruolo Attuale
                        </div>
                        <div className="font-semibold text-lg">
                          {report.role}
                        </div>
                        <div className="text-sm text-gray-500">
                          {report.industry}
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
                          {report.experience} anni
                        </div>
                        <Badge
                          variant={
                            report.level === "Senior"
                              ? "default"
                              : report.level === "Middle"
                              ? "secondary"
                              : "outline"
                          }
                          className="mt-1"
                        >
                          {report.level}
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
                          {report.location}
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
                          {report.education}
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
                      {report.skills.map((skill, index) => (
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
                      {report.certifications.length > 0 ? (
                        report.certifications.map((cert, index) => (
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

              {/* AI Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </div>
                    Suggerimenti AI per Migliorare
                  </CardTitle>
                  <CardDescription>
                    Consigli personalizzati basati sull&apos;analisi del tuo
                    profilo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {report.aiSuggestions.map((suggestion, index) => {
                      const priorityColors = {
                        high: "border-red-200 bg-red-50",
                        medium: "border-yellow-200 bg-yellow-50",
                        low: "border-blue-200 bg-blue-50",
                      };

                      const priorityBadgeColors = {
                        high: "bg-red-100 text-red-800",
                        medium: "bg-yellow-100 text-yellow-800",
                        low: "bg-blue-100 text-blue-800",
                      };

                      const priorityLabels = {
                        high: "Alta Priorità",
                        medium: "Media Priorità",
                        low: "Bassa Priorità",
                      };

                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border-2 ${
                            priorityColors[suggestion.priority]
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Badge
                                className={`${
                                  priorityBadgeColors[suggestion.priority]
                                } text-xs font-medium`}
                              >
                                {priorityLabels[suggestion.priority]}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {suggestion.category}
                              </Badge>
                            </div>
                          </div>

                          <h4 className="font-semibold text-gray-900 mb-2">
                            {suggestion.title}
                          </h4>
                          <p className="text-sm text-gray-700 mb-3">
                            {suggestion.description}
                          </p>

                          <div className="flex items-center gap-2 text-xs">
                            <TrendingUp className="h-3 w-3 text-green-600" />
                            <span className="text-green-700 font-medium">
                              {suggestion.impact}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Separator className="my-6" />

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Brain className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-2">
                          Prossimi Passi Consigliati
                        </h4>
                        <div className="text-sm text-purple-800 space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                            <span>
                              Inizia dai suggerimenti ad alta priorità per il
                              massimo impatto
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                            <span>
                              Implementa 2-3 miglioramenti alla volta per non
                              sovraccaricare il CV
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                            <span>
                              Rianalizza il CV dopo le modifiche per vedere i
                              progressi
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">
                Soddisfatto dell&apos;analisi?
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Condividi CV Insight AI con i tuoi colleghi e aiutali a scoprire
                il valore del loro profilo professionale
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" onClick={handleShare}>
                  <Share2 className="h-5 w-5 mr-2" />
                  Condividi l&apos;app
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={() => router.push("/")}
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
                fattori non considerati nell&apos;analisi automatica.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
