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
    default: "BlogMD — Write with clarity",
    template: "%s | BlogMD",
  },
  description:
    "Modern editorial platform with full Markdown support. Write, publish and share your ideas with the world.",
  keywords: ["blog", "markdown", "writing", "publishing", "articles"],
  authors: [{ name: "BlogMD" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BlogMD",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#0d0d1a] text-[#e2e8f0] transition-colors duration-300`}
      >
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
            <AtomicLangToggle />
    </body>
    </html>
  );
}
