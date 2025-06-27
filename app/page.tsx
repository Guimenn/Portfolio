import { Metadata } from 'next';
import Hero from './components/sections/Hero';
import Technologies from './components/sections/Technologies';
import Competencias from './components/sections/Competencias';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

export const metadata: Metadata = {
  title: "Guilherme Men (Guimen) - Desenvolvedor Full Stack | guimen.dev",
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
  openGraph: {
    title: "Guilherme Men (Guimen) - Desenvolvedor Full Stack | guimen.dev",
    description: "Portfolio profissional de Guilherme Men (Guimen), desenvolvedor full stack especializado em React, Next.js, Node.js e TypeScript. Soluções web inovadoras e modernas.",
    url: "https://guimen.dev",
    siteName: "Guilherme Men Portfolio",
    images: [
      {
        url: '/img/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Guilherme Men - Desenvolvedor Full Stack',
      }
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guilherme Men (Guimen) - Desenvolvedor Full Stack | guimen.dev",
    description: "Portfolio profissional de Guilherme Men (Guimen), desenvolvedor full stack especializado em React, Next.js, Node.js e TypeScript.",
    images: ['/img/og-image.png'],
  },
  alternates: {
    canonical: 'https://guimen.dev',
  },
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <Technologies />
      <Competencias />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
