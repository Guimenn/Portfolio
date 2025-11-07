"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaDatabase, FaPhp, FaGitAlt, FaDocker } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiPostgresql, SiMysql, SiJavascript } from "react-icons/si";

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
    icon: <FaReact size={32} />,
    proficiency: 95,
    description: "Biblioteca JavaScript para construção de interfaces de usuário interativas e componentes reutilizáveis",
    category: "frameworks",
    color: "#61DAFB"
  },
  {
    nome: "Next.js",
    icon: <SiNextdotjs size={32} />,
    proficiency: 92,
    description: "Framework React para aplicações web com SSR, SSG e API routes integradas",
    category: "frameworks",
    color: "#000000"
  },
  {
    nome: "TypeScript",
    icon: <SiTypescript size={32} />,
    proficiency: 90,
    description: "Superset do JavaScript com tipagem estática para desenvolvimento mais robusto",
    category: "tools",
    color: "#3178C6"
  },
  {
    nome: "Tailwind CSS",
    icon: <SiTailwindcss size={32} />,
    proficiency: 88,
    description: "Framework CSS utility-first para desenvolvimento rápido de interfaces modernas",
    category: "frontend",
    color: "#06B6D4"
  },
  {
    nome: "Node.js",
    icon: <FaNodeJs size={32} />,
    proficiency: 85,
    description: "Runtime JavaScript para desenvolvimento de aplicações server-side escaláveis",
    category: "backend",
    color: "#339933"
  },
  {
    nome: "PostgreSQL",
    icon: <SiPostgresql size={32} />,
    proficiency: 87,
    description: "Banco de dados relacional open-source com suporte a JSON e extensões avançadas",
    category: "database",
    color: "#4169E1"
  },
  {
    nome: "Prisma",
    icon: <FaDatabase size={32} className="text-blue-500" />,
    proficiency: 82,
    description: "ORM moderna para Node.js e TypeScript com type-safety e migrações automáticas",
    category: "backend",
    color: "#3987D8"
  },
  {
    nome: "JavaScript",
    icon: <SiJavascript size={32} />,
    proficiency: 95,
    description: "Linguagem de programação essencial para desenvolvimento web frontend e backend",
    category: "frontend",
    color: "#F7DF1E"
  },
  {
    nome: "HTML5",
    icon: <FaHtml5 size={32} />,
    proficiency: 98,
    description: "Linguagem de marcação padrão para estruturação de conteúdo web semântico",
    category: "frontend",
    color: "#E34F26"
  },
  {
    nome: "CSS3",
    icon: <FaCss3Alt size={32} />,
    proficiency: 92,
    description: "Linguagem de estilo para design visual e layout responsivo de interfaces web",
    category: "frontend",
    color: "#1572B6"
  },
  {
    nome: "Git",
    icon: <FaGitAlt size={32} />,
    proficiency: 90,
    description: "Sistema de controle de versão distribuído para colaboração em desenvolvimento",
    category: "tools",
    color: "#F05032"
  },
  {
    nome: "Docker",
    icon: <FaDocker size={32} />,
    proficiency: 78,
    description: "Plataforma para containerização e deployment de aplicações em ambientes isolados",
    category: "tools",
    color: "#2496ED"
  },
  {
    nome: "PHP",
    icon: <FaPhp size={32} />,
    proficiency: 75,
    description: "Linguagem de script server-side para desenvolvimento web dinâmico",
    category: "backend",
    color: "#777BB4"
  },
  {
    nome: "MySQL",
    icon: <SiMysql size={32} />,
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

  // Animações para skill bars
  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (custom: number) => ({
      width: `${custom}%`,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
        delay: custom * 0.05
      }
    })
  };

  // Animações para cards circulares
  const circleVariants = {
    hidden: { rotate: -180, scale: 0 },
    visible: (i: number) => ({
      rotate: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  // Animações stagger para grid
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const gridItemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20
      }
    }
  };

  return (
    <section
      id="tech"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4 py-16 sm:px-6 lg:px-8"
      ref={ref}
    >
      {/* Background elements aprimorados */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 h-72 w-72 rounded-full bg-[#19D1C2]/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 h-64 w-64 rounded-full bg-purple-600/5 blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 h-48 w-48 rounded-full bg-blue-600/5 blur-3xl animate-bounce"></div>
        
        {/* Conexões entre tecnologias */}
        <div className="absolute inset-0 opacity-20">
          {mainTechnologies.map((tech, i) => (
            mainTechnologies.map((otherTech, j) => {
              if (i < j) {
                return (
                  <motion.div
                    key={`${i}-${j}`}
                    className="absolute w-1 bg-gradient-to-b from-[#19D1C2]/30 to-transparent"
                    style={{
                      left: `${50 + Math.cos((i / mainTechnologies.length) * Math.PI * 2) * 200}px`,
                      top: `${50 + Math.sin((i / mainTechnologies.length) * Math.PI * 2) * 200}px`,
                      transform: `rotate(${((i - j) / mainTechnologies.length) * 360}deg) translateX(150px)`
                    }}
                    initial={{ scaleY: 0 }}
                    animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                  />
                );
              }
              return null;
            })
          ))}
        </div>
      </div>

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

        {/* Galeria Circular - Tecnologias Principais */}
        <motion.div
          className="mb-20 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative flex justify-center items-center">
            {/* Círculo central */}
            <motion.div
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-[#19D1C2] to-[#087e74] flex items-center justify-center shadow-2xl shadow-[#19D1C2]/30"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4, type: "spring" }}
            >
              <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
              <div className="text-white font-bold text-lg relative z-10">FULL STACK</div>
            </motion.div>

            {/* Tecnologias orbitando */}
            <div className="absolute inset-0 flex items-center justify-center">
              {mainTechnologies.map((tech, index) => (
                <motion.div
                  key={tech.nome}
                  className="absolute flex flex-col items-center"
                  style={{
                    transform: `rotate(${index * 60}deg) translateY(-150px) rotate(${-index * 60}deg)`
                  }}
                  custom={index}
                  variants={circleVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {/* Card da tecnologia */}
                  <motion.div
                    className="relative w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-lg hover:shadow-[#19D1C2]/30 transition-all duration-300 cursor-pointer group"
                    whileHover={{ 
                      scale: 1.2, 
                      y: -10,
                      rotateY: 180,
                      boxShadow: `0 15px 35px rgba(25, 209, 194, 0.4)`
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onHoverStart={() => setHoveredTech(tech)}
                    onHoverEnd={() => setHoveredTech(null)}
                  >
                    <div className={`w-8 h-8 ${tech.color === "#000000" ? "bg-white" : ""}`}>
                      {tech.icon}
                    </div>
                    
                    {/* Skill bar circular */}
                    <motion.svg
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 36 36"
                      initial={false}
                    >
                      <path
                        className="text-gray-700 stroke-current"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <motion.path
                        className="text-[#19D1C2] stroke-current"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ strokeDasharray: "100 100" }}
                        animate={{ 
                          strokeDasharray: `${tech.proficiency} ${100 - tech.proficiency}` 
                        }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </motion.svg>

                    {/* Número da proficiência */}
                    <motion.span
                      className="absolute text-xs font-bold text-white -bottom-6 bg-gray-900/90 px-2 py-1 rounded-md whitespace-nowrap"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {tech.proficiency}%
                    </motion.span>
                  </motion.div>

                  {/* Nome da tecnologia */}
                  <motion.span
                    className="text-white text-xs font-medium mt-2 px-2 py-1 bg-gray-900/80 rounded-md backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {tech.nome}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tooltip para tecnologia hover */}
          {hoveredTech && (
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-sm"
              variants={tooltipVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-gray-900/95 border border-[#19D1C2]/30 backdrop-blur-xl rounded-2xl p-6 shadow-2xl shadow-[#19D1C2]/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    {hoveredTech.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{hoveredTech.nome}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-700/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#19D1C2] to-[#087e74] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${hoveredTech.proficiency}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      <span className="text-[#19D1C2] font-medium">{hoveredTech.proficiency}%</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{hoveredTech.description}</p>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700/50">
                  <span className="text-xs text-gray-400 capitalize">{hoveredTech.category}</span>
                  <div className="flex gap-2">
                    <motion.button className="text-xs px-3 py-1 bg-[#19D1C2]/20 text-[#19D1C2] rounded-lg hover:bg-[#19D1C2]/30 transition-colors">
                      Projetos
                    </motion.button>
                    <motion.button className="text-xs px-3 py-1 border border-[#19D1C2]/30 text-[#19D1C2] rounded-lg hover:bg-[#19D1C2]/10 transition-colors">
                      Docs
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Grid de Todas as Tecnologias */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
        >
          {Object.entries(techByCategory).map(([category, techs]) => (
            <motion.div
              key={category}
              className="space-y-6"
              variants={gridItemVariants}
              custom={Object.keys(techByCategory).indexOf(category)}
            >
              {/* Header da categoria */}
              <motion.h3
                className="text-[#19D1C2] font-semibold text-center uppercase tracking-wide text-sm bg-gradient-to-r from-[#19D1C2]/20 to-transparent px-4 py-2 rounded-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.h3>

              {/* Cards das tecnologias */}
              <div className="space-y-4">
                {techs.slice(0, 3).map((tech, index) => (
                  <motion.div
                    key={tech.nome}
                    className="group relative"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, y: 20, rotateX: -10 },
                      visible: (i: number) => ({
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        transition: {
                          delay: i * 0.1,
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1]
                        }
                      })
                    }}
                    custom={index}
                    whileHover={{
                      y: -8,
                      rotateX: 5,
                      rotateY: 5,
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(25, 209, 194, 0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gray-900/70 border border-gray-700/50 backdrop-blur-xl p-6 h-32 flex flex-col justify-between hover:border-[#19D1C2]/40 transition-all duration-500">
                      {/* Icone com hover 3D */}
                      <motion.div
                        className="relative mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-white/10 to-transparent border border-white/20"
                        whileHover={{ rotateY: 180, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[tech.color]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        {tech.icon}
                      </motion.div>

                      {/* Nome e proficiência */}
                      <div className="text-center space-y-2">
                        <h4 className="font-semibold text-white text-sm">{tech.nome}</h4>
                        <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-[#19D1C2] to-[#087e74] rounded-full shadow-inner"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${tech.proficiency}%` }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                          />
                        </div>
                        <motion.span
                          className="text-[#19D1C2] text-xs font-medium"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          viewport={{ once: true }}
                        >
                          {tech.proficiency}%
                        </motion.span>
                      </div>

                      {/* Tooltip detalhado */}
                      <motion.div
                        className="absolute inset-0 bg-gray-900/95 backdrop-blur-xl rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 max-w-xs mx-auto"
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        whileHover={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <p className="text-gray-300 text-xs leading-relaxed mb-3">{tech.description}</p>
                        <div className="flex justify-center gap-2">
                          <span className="px-2 py-1 bg-[#19D1C2]/20 text-[#19D1C2] text-xs rounded-full capitalize">
                            {tech.category}
                          </span>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="mt-20 grid md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { value: "50+", label: "Projetos Completos", icon: <FaCode size={24} className="mx-auto mb-2 text-[#19D1C2]" /> },
            { value: "5+", label: "Anos de Experiência", icon: <FaCalendar size={24} className="mx-auto mb-2 text-[#19D1C2]" /> },
            { value: "15+", label: "Tecnologias Principais", icon: <FaReact size={24} className="mx-auto mb-2 text-[#19D1C2]" /> },
            { value: "100%", label: "Compromisso com Qualidade", icon: <FaDatabase size={24} className="mx-auto mb-2 text-[#19D1C2]" /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="group p-6 rounded-xl bg-gray-900/70 border border-gray-700/50 backdrop-blur-xl hover:border-[#19D1C2]/30 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + index * 0.1 }}
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#19D1C2] to-[#087e74] text-gray-900 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#19D1C2]/40 transition-all duration-300"
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
