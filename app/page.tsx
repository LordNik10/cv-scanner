import { Card, CardContent } from "@/components/ui/card";
import { Uploader } from "@/components/Uploader";
import { Brain, Shield, TrendingUp, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CV Scanner
              </h1>
              <p className="text-sm text-gray-600">
                Analisi intelligente del tuo curriculum
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Scopri il{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  valore
                </span>{" "}
                del tuo CV
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Carica il tuo curriculum in PDF e ottieni un&apos;analisi
                dettagliata con stima della retribuzione basata su AI e dati di
                mercato aggiornati.
              </p>
            </div>

            {/* No Registration Badge */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Nessuna registrazione richiesta
              </div>
              <div className="text-gray-400">•</div>
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                100% Gratuito
              </div>
            </div>

            {/* Upload Section */}
            <Uploader />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Cosa ottieni con l&apos;analisi
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                La nostra AI analizza il tuo CV e ti fornisce insights preziosi
                per la tua carriera
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Stima RAL
                </h4>
                <p className="text-gray-600">
                  Calcolo preciso della retribuzione annua lorda basato su
                  ruolo, esperienza e mercato
                </p>
              </Card>

              <Card className="text-center p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Analisi Competenze
                </h4>
                <p className="text-gray-600">
                  Identificazione automatica di skills, certificazioni e punti
                  di forza del profilo
                </p>
              </Card>

              <Card className="text-center p-6 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Accesso Immediato
                </h4>
                <p className="text-gray-600">
                  Niente email, password o registrazioni. Carica il CV e ottieni
                  subito i risultati
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* No Registration Section */}
        <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-semibold mb-6">
                <Shield className="h-5 w-5" />
                Zero Registrazioni, Massima Semplicità
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Perché complicarsi la vita?
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A differenza di altre piattaforme che richiedono account, email
                e dati personali, con CV Scanner basta un click per ottenere la
                tua analisi professionale.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Altre Piattaforme */}
              <Card className="p-6 bg-red-50 border-red-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-600 text-2xl">✗</span>
                  </div>
                  <h4 className="text-lg font-semibold text-red-900 mb-4">
                    Altre Piattaforme
                  </h4>
                  <div className="space-y-2 text-sm text-red-700">
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      <span>Registrazione obbligatoria</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      <span>Verifica email richiesta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      <span>Dati personali memorizzati</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-red-500">•</span>
                      <span>Limiti per utenti gratuiti</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* CV Scanner */}
              <Card className="p-6 bg-green-50 border-green-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-2xl">✓</span>
                  </div>
                  <h4 className="text-lg font-semibold text-green-900 mb-4">
                    CV Scanner
                  </h4>
                  <div className="space-y-2 text-sm text-green-700">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">•</span>
                      <span>Accesso immediato</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">•</span>
                      <span>Nessun dato richiesto</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">•</span>
                      <span>Privacy totale garantita</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">•</span>
                      <span>Completamente gratuito</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-gray-700 font-medium">
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  3 secondi per caricare, 30 secondi per analizzare
                </span>
                <br />
                <span className="text-gray-600">
                  Nessuna barriera tra te e i tuoi risultati
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-blue-100">CV Analizzati</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-blue-100">Precisione Stime</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">&lt; 30s</div>
                <div className="text-blue-100">Tempo di Analisi</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">CV Scanner</span>
            </div>
            <p className="text-gray-400 mb-8">
              Powered by advanced AI algorithms and real-time market data
            </p>

            {/* Disclaimer */}
            <Card className="bg-yellow-900/20 border-yellow-700/30 max-w-4xl mx-auto">
              <CardContent className="py-4">
                <p className="text-sm text-yellow-200">
                  <strong>Disclaimer:</strong> Le stime sono indicative e basate
                  su algoritmi di machine learning. Non costituiscono una
                  consulenza professionale e possono variare in base a numerosi
                  fattori non considerati nell&apos;analisi automatica.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </footer>
    </div>
  );
}
