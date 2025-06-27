import { ThemeModeScript } from "flowbite-react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL('https://guimen.dev'),
  title: {
    default: "Guilherme Men (Guimen) - Desenvolvedor Full Stack | guimen.dev",
    template: "%s | Guilherme Men - guimen.dev"
  },
  description: "Portfolio profissional de Guilherme Men (Guimen), desenvolvedor full stack especializado em React, Next.js, Node.js e TypeScript. Soluções web inovadoras e modernas.",
  keywords: [
    "guimen.dev",
    "guilherme men",
    "guimen",
    "desenvolvedor full stack",
    "desenvolvedor web",
    "react developer",
    "next.js developer",
    "node.js developer",
    "typescript developer",
    "frontend developer",
    "backend developer",
    "web development",
    "programação web",
    "desenvolvimento de software",
    "portfolio desenvolvedor",
    "freelancer desenvolvedor"
  ],
  authors: [{ name: "Guilherme Men", url: "https://guimen.dev" }],
  creator: "Guilherme Men",
  publisher: "Guilherme Men",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://guimen.dev',
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://guimen.dev",
    title: "Guilherme Men (Guimen) - Desenvolvedor Full Stack | guimen.dev",
    description: "Portfolio profissional de Guilherme Men (Guimen), desenvolvedor full stack especializado em React, Next.js, Node.js e TypeScript. Soluções web inovadoras e modernas.",
    siteName: "Guilherme Men Portfolio",
    images: [
      {
        url: '/img/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Guilherme Men - Desenvolvedor Full Stack',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guilherme Men (Guimen) - Desenvolvedor Full Stack | guimen.dev",
    description: "Portfolio profissional de Guilherme Men (Guimen), desenvolvedor full stack especializado em React, Next.js, Node.js e TypeScript.",
    creator: "@guimen",
    images: ['/img/og-image.png'],
  },
  verification: {
    google: '3hVKP4BB40cbmsrtjKsWd0IdPVT-QP78qf8f_vToYPM',
  },
  category: 'technology',
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#19D1C2" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Guilherme Men" />
        <meta name="copyright" content="Guilherme Men" />
        <meta name="application-name" content="Guilherme Men Portfolio" />
        <meta name="apple-mobile-web-app-title" content="Guimen Portfolio" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#19D1C2" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Guilherme Men",
              "alternateName": "Guimen",
              "url": "https://guimen.dev",
              "image": "https://guimen.dev/img/euu.png",
              "sameAs": [
                "https://github.com/guimen",
                "https://linkedin.com/in/guilhermemen",
                "https://instagram.com/guimen"
              ],
              "jobTitle": "Desenvolvedor Full Stack",
              "worksFor": {
                "@type": "Organization",
                "name": "Freelancer"
              },
              "description": "Desenvolvedor full stack especializado em React, Next.js, Node.js e TypeScript",
              "knowsAbout": [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "HTML",
                "CSS",
                "Tailwind CSS",
                "PostgreSQL",
                "MySQL",
                "Git",
                "GitHub"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR"
              }
            })
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Guilherme Men Portfolio",
              "url": "https://guimen.dev",
              "description": "Portfolio profissional de Guilherme Men (Guimen), desenvolvedor full stack",
              "author": {
                "@type": "Person",
                "name": "Guilherme Men"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://guimen.dev?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SplashScreen />
        <div className="main-content">
          <Navbar />
          {children}
          <Footer />
        </div>
        <Toaster position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
