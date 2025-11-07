import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Hero from './components/sections/Hero';
import Technologies from './components/sections/Technologies';
import Competencias from './components/sections/Competencias';
import ClientWrapper from './components/ClientWrapper';
import Footer from './components/Footer';

// Lazy load componentes pesados
const Projects = dynamic(() => import('./components/sections/Projects'), {
  loading: () => <div className="min-h-screen" />,
});
const About = dynamic(() => import('./components/sections/About'), {
  loading: () => <div className="min-h-screen" />,
});
const Contact = dynamic(() => import('./components/sections/Contact'), {
  loading: () => <div className="min-h-screen" />,
});
const CTA = dynamic(() => import('./components/sections/CTA'), {
  loading: () => <div className="min-h-screen" />,
});
// CursorComponent já é um client component, não precisa de ssr: false
const CursorComponent = dynamic(() => import('./components/Cursor'));

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
    <ClientWrapper>
      <main className="flex flex-col min-h-screen">
        <CursorComponent />
        <Hero />
        <Technologies />
        <Competencias />
        <Projects />
        <About />
        <CTA />
        <Contact />
      </main>
      <Footer />  
    </ClientWrapper>
  );
}
