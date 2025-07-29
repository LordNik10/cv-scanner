import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CvScanner",
  description:
    "Carica il tuo curriculum in PDF e ottieni un'analisi dettagliata con stima della retribuzione basata su AI e dati di mercato aggiornati.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6TTHYM0424"
        ></Script>
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6TTHYM0424');
          `,
          }}
        />

        <Script
          id="iubenda-cs"
          dangerouslySetInnerHTML={{
            __html: `var _iub = _iub || [];
_iub.csConfiguration = {"siteId":4181211,"cookiePolicyId":67759919,"lang":"it","storage":{"useSiteId":true}};`,
          }}
        />

        <Script src="https://cs.iubenda.com/autoblocking/4181211.js" />
        <Script src="//cdn.iubenda.com/cs/iubenda_cs.js" async />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
