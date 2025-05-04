import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';
import SplashScreen from './components/SplashScreen';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Guilherme Men - Desenvolvedor Full Stack",
  description: "Portfolio pessoal de Guilherme Men, desenvolvedor full stack apaixonado por criar soluções inovadoras.",
  keywords: ["desenvolvedor", "full stack", "react", "next.js", "node.js", "typescript"],
  authors: [{ name: "Guilherme Men" }],
  creator: "Guilherme Men",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://guilhermemen.dev",
    title: "Guilherme Men - Desenvolvedor Full Stack",
    description: "Portfolio pessoal de Guilherme Men, desenvolvedor full stack apaixonado por criar soluções inovadoras.",
    siteName: "Guilherme Men Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guilherme Men - Desenvolvedor Full Stack",
    description: "Portfolio pessoal de Guilherme Men, desenvolvedor full stack apaixonado por criar soluções inovadoras.",
    creator: "@guimen",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#19D1C2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
          <SplashScreen />
          <div className="main-content">
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster position="top-right" />
      </body>
    </html>
  );
}
