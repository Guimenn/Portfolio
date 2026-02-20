"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaDatabase, FaPhp, FaGitAlt, FaDocker, FaCode, FaCalendar } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiPostgresql, SiJavascript, SiPrisma } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { GrMysql } from "react-icons/gr";
import { SiN8n } from "@icons-pack/react-simple-icons";

interface Technology {
  nome: string;
  imagem?: string;
  icon: React.ReactNode;
  proficiency: number; // 0-100
  description: string;
  category: "frontend" | "backend" | "database" | "tools" | "frameworks";
  color: string;
}

const tecnologias: Technology[] = [
  {
    nome: "React",
    icon: <FaReact size={48} className="text-[#19D1C2]" />,
    proficiency: 95,
    description: "Biblioteca JavaScript para construção de interfaces de usuário interativas e componentes reutilizáveis",
    category: "frameworks",
    color: "#19D1C2"
  },

  {
    nome: "Next.js",
    icon: <SiNextdotjs size={48} className="text-[#19D1C2]" />,
    proficiency: 92,
    description: "Framework React para aplicações web com SSR, SSG e API routes integradas",
    category: "frameworks",
    color: "#19D1C2"
  },
  {
    nome: "TypeScript",
    icon: <SiTypescript size={48} className="text-[#19D1C2]" />,
    proficiency: 90,
    description: "Superset do JavaScript com tipagem estática para desenvolvimento mais robusto",
    category: "tools",
    color: "#19D1C2"
  },
  {
    nome: "Tailwind CSS",
    icon: <SiTailwindcss size={48} className="text-[#19D1C2]" />,
    proficiency: 88,
    description: "Framework CSS utility-first para desenvolvimento rápido de interfaces modernas",
    category: "frontend",
    color: "#19D1C2"
  },
  {
    nome: "Node.js",
    icon: <FaNodeJs size={48} className="text-[#19D1C2]" />,
    proficiency: 85,
    description: "Runtime JavaScript para desenvolvimento de aplicações server-side escaláveis",
    category: "backend",
    color: "#19D1C2"
  },
  {
    nome: "PostgreSQL",
    icon: <SiPostgresql size={48} className="text-[#19D1C2]" />,
    proficiency: 87,
    description: "Banco de dados relacional open-source com suporte a JSON e extensões avançadas",
    category: "database",
    color: "#19D1C2"
  },
  {
    nome: "Prisma ORM",
    icon: <SiPrisma size={48} className="text-[#19D1C2]" />,
    proficiency: 82,
    description: "ORM moderna para Node.js e TypeScript com type-safety e migrações automáticas",
    category: "backend",
    color: "#19D1C2"
  },
  {
    nome: "JavaScript",
    icon: <SiJavascript size={48} className="text-[#19D1C2]" />,
    proficiency: 95,
    description: "Linguagem de programação essencial para desenvolvimento web frontend e backend",
    category: "frontend",
    color: "#19D1C2"
  },
  {
    nome: "HTML5",
    icon: <FaHtml5 size={48} className="text-[#19D1C2]" />,
    proficiency: 98,
    description: "Linguagem de marcação padrão para estruturação de conteúdo web semântico",
    category: "frontend",
    color: "#19D1C2"
  },
  {
    nome: "CSS3",
    icon: <FaCss3Alt size={48} className="text-[#19D1C2]" />,
    proficiency: 92,
    description: "Linguagem de estilo para design visual e layout responsivo de interfaces web",
    category: "frontend",
    color: "#19D1C2"
  },
  {
    nome: "React Native",
    icon: <TbBrandReactNative size={48} className="text-[#19D1C2]" />,
    proficiency: 60,
    description: "Biblioteca JavaScript para construção de interfaces de usuário interativas e componentes reutilizáveis",
    category: "frameworks",
    color: "#19D1C2"
  },
  {
    nome: "Git",
    icon: <FaGitAlt size={48} className="text-[#19D1C2]" />,
    proficiency: 90,
    description: "Sistema de controle de versão distribuído para colaboração em desenvolvimento",
    category: "tools",
    color: "#19D1C2"
  },
  {
    nome: "n8n",
    icon: <SiN8n size={48} className="text-[#19D1C2]" />,
    proficiency: 90,
    description: "Plataforma de automação de workflows com interface visual para integração de serviços",
    category: "tools",
    color: "#19D1C2"
  },
  {
    nome: "Docker",
    icon: <FaDocker size={48} className="text-[#19D1C2]" />,
    proficiency: 78,
    description: "Plataforma para containerização e deployment de aplicações em ambientes isolados",
    category: "tools",
    color: "#2496ED"
  },
  {
    nome: "PHP",
    icon: <FaPhp size={48} className="text-[#19D1C2]" />,
    proficiency: 75,
    description: "Linguagem de script server-side para desenvolvimento web dinâmico",
    category: "backend",
    color: "#777BB4"
  },
  {
    nome: "MySQL",
    icon: <GrMysql size={48} className="text-[#19D1C2]" />,
    proficiency: 85,
    description: "Sistema de gerenciamento de banco de dados relacional open-source",
    category: "database",
    color: "#4479A1"
  }
];

// Agrupar por categoria
const techByCategory = {
  frontend: tecnologias.filter(t => t.category === "frontend"),
  backend: tecnologias.filter(t => t.category === "backend"),
  database: tecnologias.filter(t => t.category === "database"),
  frameworks: tecnologias.filter(t => t.category === "frameworks"),
  tools: tecnologias.filter(t => t.category === "tools")
};

// Layout circular para tecnologias principais
const mainTechnologies = [
  tecnologias[0], // React
  tecnologias[1], // Next.js
  tecnologias[5], // Node.js
  tecnologias[2], // TypeScript
  tecnologias[3], // Tailwind
  tecnologias[6]  // PostgreSQL
];

export default function Technologies() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredTech, setHoveredTech] = useState<Technology | null>(null);

  return (
    <section
      id="tech"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4 py-16 sm:px-6 lg:px-8"
      ref={ref}
    >

      <div className="z-10 container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#19D1C2] via-white to-[#19D1C2] bg-clip-text text-transparent">
            TECNOLOGIAS
            <motion.span
              className="block text-sm font-normal text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              com as quais trabalho diariamente
            </motion.span>
          </h1>
          <motion.p
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Utilizo uma stack moderna e robusta para criar soluções web escaláveis,
            focando em performance, acessibilidade e experiência do usuário excepcional.
          </motion.p>
        </motion.div>

        {/* Tecnologias Principais - Grid Limpo */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19D1C2] to-white">
              Tecnologias Principais
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {mainTechnologies.map((tech) => (
              <div
                key={tech.nome}
                className="group relative"
                onMouseEnter={() => setHoveredTech(tech)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                <div className="relative bg-gray-900/70 border border-gray-700/50 rounded-xl p-6 flex flex-col items-center gap-3 hover:border-[#19D1C2]/40 transition-all duration-200 cursor-pointer backdrop-blur-sm">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className={`w-18 h-18 flex items-center justify-center ${tech.color === "#000000" ? "bg-white rounded" : ""}`}>
                      {tech.icon}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white text-center">{tech.nome}</h3>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Grid de Todas as Tecnologias por Categoria */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-12"
        >
          {Object.entries(techByCategory).map(([category, techs], categoryIndex) => (
            <div key={category} className="space-y-6">
              {/* Header da categoria */}
              <motion.h3
                className="text-xl font-bold text-white flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.5 + categoryIndex * 0.1 }}
              >
                <span className="w-1 h-8 bg-gradient-to-b from-[#19D1C2] to-[#087e74] rounded-full"></span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19D1C2] to-white capitalize">
                  {category === "frameworks" ? "Frameworks & Bibliotecas" : category === "tools" ? "Ferramentas" : category === "frontend" ? "Frontend" : category === "backend" ? "Backend" : "Banco de Dados"}
                </span>
              </motion.h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {techs.map((tech) => (
                  <div
                    key={tech.nome}
                    className="group relative"
                    onMouseEnter={() => setHoveredTech(tech)}
                    onMouseLeave={() => setHoveredTech(null)}
                  >
                    <div className="bg-gray-900/70 border border-gray-700/50 rounded-lg p-4 hover:border-[#19D1C2]/40 transition-all duration-200 cursor-pointer backdrop-blur-sm h-full flex flex-col items-center gap-3">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <div className={`${tech.color === "#000000" ? "bg-[#19D1C2]/10 rounded p-1" : ""}`}>
                          {tech.icon}
                        </div>
                      </div>
                      <h4 className="font-semibold text-white text-sm text-center">{tech.nome}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tooltip simplificado */}
        {hoveredTech && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-sm pointer-events-none">
            <div className="bg-gray-900/95 border border-[#19D1C2]/30 backdrop-blur-xl rounded-xl p-5 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{hoveredTech.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">{hoveredTech.nome}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">{hoveredTech.description}</p>
                  <span className="text-xs capitalize px-2 py-1 bg-[#19D1C2]/20 text-[#19D1C2] rounded">
                    {hoveredTech.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <motion.div
          className="mt-20 grid md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { value: "50+", label: "Projetos Completos", icon: <FaCode size={24} className="mx-auto mb-2 text-[#19D1C2]" /> },
            { value: "2+", label: "Anos de Experiência", icon: <FaCalendar size={24} className="mx-auto mb-2 text-[#19D1C2]" /> },
            { value: "15+", label: "Tecnologias Principais", icon: <FaReact size={24} className="mx-auto mb-2 text-[#19D1C2]" /> },
            { value: "100%", label: "Compromisso com Qualidade", icon: <FaDatabase size={24} className="mx-auto mb-2 text-[#19D1C2]" /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group p-6 rounded-xl bg-gray-900/70 border border-gray-700/50 backdrop-blur-xl hover:border-[#19D1C2]/30 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                delay: 1.1 + index * 0.1
              }}
            >
              <div className="mb-3 opacity-80 group-hover:opacity-100 transition-opacity">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">Precisa de uma solução específica?</h3>
          <motion.p
            className="text-gray-300 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Estou sempre aprendendo novas tecnologias e melhorando minhas habilidades.
            Se você tem um projeto em mente, vamos conversar sobre como posso ajudá-lo.
          </motion.p>
          <motion.a
            href="#contato"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#19D1C2] to-[#087e74] text-white font-bold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#19D1C2]/40 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Vamos Trabalhar Juntos
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
