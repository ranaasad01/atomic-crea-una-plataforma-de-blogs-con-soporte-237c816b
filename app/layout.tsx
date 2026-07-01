import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AtomicLangToggle from "@/components/AtomicLangToggle"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BlogMD — Escribe con claridad",
    template: "%s | BlogMD",
  },
  description:
    "Plataforma editorial moderna con soporte completo para Markdown. Escribe, publica y comparte tus ideas con el mundo.",
  keywords: ["blog", "markdown", "escritura", "publicación", "artículos"],
  authors: [{ name: "BlogMD" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "BlogMD",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#f5f5f0] text-[#1a1a2e] transition-colors duration-300`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
            <AtomicLangToggle />
    </body>
    </html>
  );
}