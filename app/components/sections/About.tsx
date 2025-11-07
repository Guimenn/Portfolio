"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { FaCode, FaLightbulb, FaRocket } from "react-icons/fa";
import "../styles/about.css";
// Define types locally since @/types/about can't be found
type SocialLink = {
  link: string;
  name: string;
  icon: string;
  class: string;
  ariaLabel: string;
};

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};
// Constants moved outside component to prevent recreation on each render
const SOCIAL_LINKS: SocialLink[] = [
  {
    link: "https://www.linkedin.com/in/guimenn/",
    name: "Linkedin",
    icon: "/img/icons8-linkedin.svg",
    class: "linkedin",
    ariaLabel: "Visite meu perfil no LinkedIn"
  },
  {
    link: "https://github.com/guimenn",
    name: "Github",
    icon: "/img/icons8-github.gif",
    class: "git",
    ariaLabel: "Visite meu perfil no GitHub"
  },
  {
    link: "https://www.instagram.com/guimen/",
    name: "Instagram",
    icon: "/img/icons8-instagram.svg",
    class: "insta",
    ariaLabel: "Visite meu perfil no Instagram"
  },
  {
    link: "https://api.whatsapp.com/send?phone=5511933705007&text=Olá%20vim%20pelo%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20seus%20serviços!",
    name: "Whatsapp",
    icon: "/img/icons8-whatsapp.svg",
    class: "whats",
    ariaLabel: "Entre em contato via WhatsApp"
  }
];

const FEATURES: Feature[] = [
  {
    icon: <FaCode className="h-8 w-8 text-[#19D1C2]" aria-hidden="true" />,
    title: "Desenvolvimento Full Stack",
    description: "Criando soluções completas e escaláveis para web e mobile"
  },
  {
    icon: <FaLightbulb className="h-8 w-8 text-[#19D1C2]" aria-hidden="true" />,
    title: "Inovação Contínua",
    description: "Sempre buscando novas tecnologias e metodologias"
  },
  {
    icon: <FaRocket className="h-8 w-8 text-[#19D1C2]" aria-hidden="true" />,
    title: "Performance & Qualidade",
    description: "Foco em entregar produtos de alta performance e qualidade"
  }
];

export default function About() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('about-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about-section"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="about-title"
    >

      <div className="z-10 container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* Profile Section */}
          <Card className="bg-gray-900/70 backdrop-blur-xl border-gray-700/50">
            <div className="flex flex-col items-center text-center">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-[#19D1C2] shadow-lg shadow-[#19D1C2]/30"
              >
                <Image
                  src="/img/euu.png"
                  alt="Foto de perfil de Guilherme Vidichosqui Men"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>

              <h2 className="mb-2 text-2xl font-bold text-white">
                Guilherme Vidichosqui Men
              </h2>
              <p className="mb-4 text-lg text-[#19D1C2]">@Guimen</p>

              <div className="flex flex-wrap gap-1 justify-center" role="list" aria-label="Redes sociais">
                {SOCIAL_LINKS.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative flex h-18 w-18 items-center justify-center rounded-full p-2 transition-colors duration-300 ${item.class}`}
                    aria-label={item.ariaLabel}
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                      loading="lazy"
                      unoptimized={item.icon.includes('.gif')}
                    />
                    {/* Tooltip */}
                    <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 z-20 flex flex-col items-center">
                      {/* Seta */}
                      <span className="block h-2 w-2 -mt-3 rotate-45 bg-gray-900"></span>
                      {item.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </Card>

          {/* Content Section */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h1 id="about-title" className="text-4xl font-bold text-white mb-4">
                Olá! 👋
              </h1>
              <h2 className="text-3xl font-bold text-white mb-6">
                Me chamo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19D1C2] to-[#19D1C2]/70 animated-gradient-text">Guilherme!</span>
              </h2>
            </motion.div>

            <div className="space-y-6">
              <motion.p
                className="text-lg text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Sou um <span className="text-[#19D1C2] font-medium">desenvolvedor full stack apaixonado</span>,
                transformando ideias em realidade através do código. Cada linha que escrevo é uma oportunidade de criar algo extraordinário.
              </motion.p>

              <motion.p
                className="text-lg text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Minha jornada na tecnologia é uma constante busca por inovação e excelência.
                <span className="text-[#19D1C2] font-medium"> Acredito que o código é uma forma de arte</span>,
                onde cada projeto é uma nova história para contar.
              </motion.p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Habilidades e características">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-[#19D1C2]/30 transition-colors duration-300"
                  role="listitem"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-lg text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              Estou sempre aberto a novos desafios e oportunidades de colaboração.
              <span className="text-[#19D1C2] font-medium"> Vamos criar algo incrível juntos?</span>
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

