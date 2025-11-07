"use client";
import { useState, useEffect, useRef } from "react";
import ProjectItem from "../ProjectItem";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaFilter, FaSearch } from "react-icons/fa";
import styles from "../styles/Projects.module.css";

// Projetos existentes + um novo exemplo para demo
const projectsData = [
  {
    id: 1,
    title: "Zelos",
    description: "Sistema de gerenciamento de Ordens de Serviço desenvolvido para o SENAI, focado em otimizar o fluxo de trabalho de manutenção e atendimento técnico. A plataforma oferece controle completo do ciclo de vida das OS, com interface intuitiva, acompanhamento em tempo real e sistema robusto de gestão. Projeto composto por front-end e back-end dedicados.",
    imageUrl: "/img/senai.png",
    links: [
      { label: "Repositório Principal", url: "https://github.com/Guimenn/Zelos-Senai" },
      { label: "Front-end", url: "https://github.com/Guimenn/Zelos-Senai/tree/main/sistema-senai" },
      { label: "Back-end (API)", url: "https://github.com/Guimenn/Zelos-Senai/tree/main/backend" }
    ],
    demoLink: "https://zelos-senai.vercel.app",
    technologies: [
      "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Prisma ORM", "Supabase", "Vercel"
    ],
    features: [
      "Gerenciamento completo de Ordens de Serviço (OS)",
      "Abertura, edição e acompanhamento de OS em tempo real",
      "Interface moderna e responsiva",
      "Sistema de status e priorização",
      "Histórico e rastreamento de operações",
      "Geração de relatórios e dashboards",
      "Back-end dedicado (API RESTful)",
      "Gerenciamento de técnicos, clientes e equipamentos",
      "Integração com banco de dados PostgreSQL",
      "Autenticação e segurança"
    ],
    year: 2025
  },
  {
    id: 2,
    title: "Studdy",
    description: "Plataforma educacional de simulados online, desenvolvida para auxiliar estudantes na preparação para exames e avaliações. Possui interface intuitiva, simulados, feedback imediato, sistema de pontuação e resultados. Projeto composto por front-end e back-end dedicados.",
    imageUrl: "/img/studdy.png",
    links: [
      { label: "Front-end", url: "https://github.com/Guimenn/Studdy" },
      { label: "Back-end (API)", url: "https://github.com/Guimenn/api-studdy" }
    ],
    demoLink: "https://studdy-three.vercel.app",
    technologies: [
      "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Prisma ORM", "PostgreSQL", "Vercel"
    ],
    features: [
      "Realização de simulados online",
      "Interface amigável e responsiva",
      "Navegação intuitiva entre questões",
      "Feedback imediato sobre o desempenho",
      "Sistema de pontuação e resultados",
      "Back-end dedicado (API RESTful)",
      "Gerenciamento de usuários e resultados",
      "Integração com banco de dados PostgreSQL",
      "Autenticação e segurança"
    ],
    year: 2025
  },
  {
    id: 3,
    title: "Thornfield",
    description: "Site elegante para uma marca premium de whisky, apresentando uma experiência imersiva com design sofisticado. Desenvolvido com foco na história da destilaria, processo de fabricação e catálogo de produtos, oferecendo uma jornada visual que reflete a tradição e qualidade da marca.",
    imageUrl: "/img/Thornfield.png",
    link: "https://github.com/Guimenn/Thornfield-a",
    demoLink: "https://thornfield-a.vercel.app",
    technologies: ["Next.js", "Tailwind CSS", "Flowbite React", "TypeScript", "Firebase", "NodeJS"],
    features: ["Arquitetura escalável", "Componentes pré-configurados", "Tipagem estática com TypeScript", "Sistema de design com Tailwind CSS"],
    year: 2025
  },
  {
    id: 4,
    title: "Nova Plataforma E-commerce",
    description: "Plataforma de e-commerce completa com carrinho persistente, pagamentos Stripe e dashboard administrativo. Foco em UX mobile-first e performance otimizada.",
    imageUrl: "/img/ecommerce-demo.png",
    links: [
      { label: "Repositório", url: "https://github.com/guimenn/ecommerce" },
      { label: "Demo", url: "https://ecommerce-guimen.vercel.app" }
    ],
    demoLink: "https://ecommerce-guimen.vercel.app",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "Tailwind", "Vercel"],
    features: [
      "Carrinho persistente com localStorage",
      "Pagamentos seguros via Stripe",
      "Dashboard administrativo completo",
      "Otimização para mobile-first",
      "SEO avançado com Next.js",
      "Integração com PostgreSQL"
    ],
    year: 2025,
    category: "ecommerce"
  }
];

// Tecnologias únicas para filtros
const allTechnologies = [...new Set(projectsData.flatMap(p => p.technologies))];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(projectsData[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedTech, setSelectedTech] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [activeProject]);

  // Filtro por tecnologia
  useEffect(() => {
    if (selectedTech === "all") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => 
        project.technologies.includes(selectedTech)
      ));
    }
  }, [selectedTech]);

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const titleVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <section
      id="projeto"
      ref={sectionRef}
      className="relative py-24 px-4 md:px-8 lg:px-16 bg-gray-950 min-h-screen flex items-center overflow-hidden"
    >
      {/* Enhanced dynamic background elements */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="animate-pulse-slow absolute top-20 left-10 h-80 w-80 rounded-full bg-[#19D1C2]/15 blur-3xl filter"></div>
        <div className="animate-pulse-slow absolute right-10 bottom-20 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl filter"></div>
        <div className="animate-pulse-slow absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl filter"></div>

        {/* Interactive tech bubbles - agora com filtros */}
        {allTechnologies.slice(0, 5).map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isInView ? 0.7 : 0,
              scale: isInView ? 1 : 0,
              x: Math.sin(Date.now() / (1000 + index * 500)) * 10,
              y: Math.cos(Date.now() / (1000 + index * 500)) * 10
            }}
            transition={{
              duration: 3,
              delay: 0.5 * index,
              repeat: Infinity,
              repeatType: "mirror"
            }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            className={`absolute ${styles.techBubble} cursor-pointer`}
            style={{
              top: `${30 + (index * 15)}%`,
              left: `${10 + (index * 20)}%`,
              backgroundColor: `rgba(25, 209, 194, ${0.1 + (index * 0.1)})`,
              padding: `${1 + index}rem`,
              borderRadius: "50%",
              zIndex: 1
            }}
            onClick={() => selectedTech !== tech && setSelectedTech(tech)}
          >
            <span className="text-[#19D1C2] font-medium whitespace-nowrap hover:text-white transition-colors">{tech}</span>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col"
        >
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-8 text-3xl font-bold text-white md:text-5xl lg:text-6xl text-start"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19D1C2] to-[#087e74]" id="top">
              MEUS
              <br />
              PROJETOS
              <motion.span
                className="absolute -bottom-3 left-0 h-1.5 bg-[#19D1C2]"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ delay: 0.5, duration: 2 }}
              >
                &nbsp;
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 text-gray-300 text-lg leading-relaxed max-w-2xl"
          >
            Explore meus projetos destacados, cada um representando diferentes habilidades
            e tecnologias em minha jornada como desenvolvedor. Filtre por tecnologia para ver o que mais se adequa ao seu projeto.
          </motion.p>

          {/* Filtros por tecnologia - novo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="relative mb-4">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#19D1C2] h-5 w-5" />
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:border-[#19D1C2] focus:ring-2 focus:ring-[#19D1C2]/20 focus:outline-none transition-all duration-300"
              >
                <option value="all">Todas as Tecnologias</option>
                {allTechnologies.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>
            <p className="text-sm text-gray-400">
              {filteredProjects.length} projeto{filteredProjects.length !== 1 ? 's' : ''} encontrado{filteredProjects.length !== 1 ? 's' : ''}
            </p>
          </motion.div>

          <motion.div
            className={`${styles.projectsContainer} w-full`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {filteredProjects.map((project, index) => (
              <motion.div 
                key={project.id} 
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="mb-4"
              >
                <motion.div
                  initial={false}
                  whileHover={{ rotateY: 180 }}
                  transition={{ 
                    rotateY: { type: "spring", stiffness: 400, damping: 20 },
                    duration: 0.6
                  }}
                  className="relative perspective-1000"
                >
                  <ProjectItem
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    year={project.year}
                    isActive={activeProject?.id === project.id}
                    onClick={() => {
                      setIsLoading(true);
                      setActiveProject(project);
                    }}
                    // Flip card effect
                    className="flip-card-inner"
                  />
                  {/* Back side do card com mais detalhes */}
                  <motion.div 
                    className="flip-card-back absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between opacity-0 invisible"
                    initial={{ rotateY: 180 }}
                    animate={activeProject?.id === project.id ? { rotateY: 0, opacity: 1, visibility: "visible" } : { rotateY: 180, opacity: 0, visibility: "hidden" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, i) => (
                          <motion.span
                            key={i}
                            className="px-3 py-1 bg-[#19D1C2]/20 text-[#19D1C2] text-sm rounded-full"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        {project.features?.slice(0, 3).map((feature, i) => (
                          <motion.li 
                            key={i} 
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <div className="w-2 h-2 bg-[#19D1C2] rounded-full animate-pulse"></div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {project.demoLink && (
                        <motion.a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 text-center px-4 py-2 bg-[#19D1C2] text-gray-900 rounded-lg font-medium"
                        >
                          Ver Demo
                        </motion.a>
                      )}
                      {project.links?.[0] && (
                        <motion.a
                          href={project.links[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          className="flex-1 text-center px-4 py-2 border-2 border-[#19D1C2] text-[#19D1C2] rounded-lg font-medium hover:bg-[#19D1C2]/10"
                        >
                          Código
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Estatísticas rápidas */}
          {isInView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-4 mt-8 p-4 bg-gray-900/50 rounded-xl"
            >
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-[#19D1C2]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                >
                  {projectsData.length}+
                </motion.div>
                <p className="text-gray-400 text-sm">Projetos Completos</p>
              </div>
              <div className="text-center">
                <motion.div 
                  className="text-2xl font-bold text-[#19D1C2]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.1, type: "spring" }}
                >
                  {allTechnologies.length}+
                </motion.div>
                <p className="text-gray-400 text-sm">Tecnologias</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Showcase principal - aprimorado com zoom e pan */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="project-showcase w-full md:w-1/2 sticky top-20 self-start"
        >
          <div className={`${styles.showcase} h-auto w-full overflow-hidden rounded-2xl shadow-2xl border border-gray-700/50 bg-gray-900/70 backdrop-blur-xl transition-all duration-500 relative group`}>
            {/* Overlay interativo */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent flex items-end p-6 z-10 pointer-events-none"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: isHovering ? 0.9 : 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-right w-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-[#19D1C2] font-medium">Clique para expandir</p>
                <div className="flex justify-end gap-2 mt-2">
                  {activeProject?.technologies.slice(0, 3).map((tech, i) => (
                    <motion.span
                      key={i}
                      className="px-2 py-1 bg-[#19D1C2]/20 text-[#19D1C2] text-xs rounded"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <div className={`${styles.projectImage} h-64 md:h-[350px] lg:h-[400px] w-full relative overflow-hidden group-hover:scale-105 transition-transform duration-700`}>
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-800/80 relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 border-4 border-[#19D1C2] border-t-transparent rounded-full"
                  />
                  <p className="ml-4 text-gray-400">Carregando showcase...</p>
                </div>
              ) : activeProject?.imageUrl ? (
                <motion.div
                  className="w-full h-full relative cursor-pointer"
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={activeProject.imageUrl}
                    alt={activeProject.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-all duration-700 brightness-110"
                    priority
                  />
                  
                  {/* Efeito de vidro no canto */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full"></div>
                  
                  {/* Ícone de play animado */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-16 h-16 bg-[#19D1C2]/90 rounded-full flex items-center justify-center shadow-2xl shadow-[#19D1C2]/30">
                      <svg className="w-6 h-6 ml-1 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 relative">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-gray-400 text-lg"
                  >
                    Selecione um projeto
                  </motion.div>
                </div>
              )}
            </div>

            {/* Detalhes do projeto - agora com timeline animada */}
            <motion.div 
              className="p-8 relative z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h2 className="text-3xl font-bold text-white font-display">
                  {activeProject?.title}
                </h2>
                {activeProject?.year && (
                  <motion.span 
                    className="px-3 py-1 text-sm font-medium rounded-full bg-[#19D1C2]/20 text-[#19D1C2] animate-pulse"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: "spring" }}
                  >
                    {activeProject.year}
                  </motion.span>
                )}
              </div>

              <motion.p 
                className="text-gray-300 mb-6 text-lg leading-relaxed"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {activeProject?.description}
              </motion.p>

              {/* Timeline de features */}
              {activeProject?.features && (
                <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                  <h3 className="text-[#19D1C2] font-medium mb-4 text-lg flex items-center gap-2">
                    <FaSearch className="h-5 w-5" />
                    Características principais:
                  </h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#19D1C2] to-[#087e74] rounded-full"></div>
                    <ul className="space-y-3 relative">
                      {activeProject.features.map((feature, index) => (
                        <motion.li 
                          key={index}
                          className="flex items-start gap-4 pl-8 relative"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                        >
                          <div className="absolute left-0 w-3 h-3 bg-[#19D1C2] rounded-full mt-2 animate-ping"></div>
                          <div className="flex-1">
                            <span className="text-white font-medium">{feature}</span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Tecnologias com skill bars */}
              {activeProject?.technologies && (
                <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                  <h3 className="text-[#19D1C2] font-medium mb-4 text-lg">Tecnologias utilizadas:</h3>
                  <div className="space-y-3">
                    {activeProject.technologies.map((tech, index) => (
                      <motion.div 
                        key={index}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.1 + index * 0.1, duration: 0.8 }}
                        className={`${styles.techTag} relative overflow-hidden`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-white font-medium">{tech}</span>
                          <span className="text-[#19D1C2] text-sm">90%</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                          <motion.div 
                            className="bg-gradient-to-r from-[#19D1C2] to-[#087e74] h-2 rounded-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 0.9 }}
                            transition={{ delay: 1.2 + index * 0.1, duration: 1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Botões de ação aprimorados */}
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                {activeProject?.links ? (
                  <>
                    {activeProject.demoLink && (
                      <motion.a
                        href={activeProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2, boxShadow: "0 10px 25px rgba(25, 209, 194, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex-1 min-w-[120px] items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#19D1C2] to-[#087e74] text-gray-900 font-bold shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver Demo
                        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      </motion.a>
                    )}
                    {activeProject.links[0] && (
                      <motion.a
                        href={activeProject.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex-1 min-w-[120px] items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-[#19D1C2] text-[#19D1C2] font-bold transition-all duration-300 hover:bg-[#19D1C2]/10 hover:shadow-lg hover:shadow-[#19D1C2]/20"
                      >
                        <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Ver Código
                      </motion.a>
                    )}
                  </>
                ) : (
                  <>
                    {activeProject.link && (
                      <motion.a
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex-1 min-w-[120px] items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#19D1C2] to-[#087e74] text-gray-900 font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#19D1C2]/40"
                      >
                        <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Ver Código
                      </motion.a>
                    )}
                    {activeProject.demoLink && (
                      <motion.a
                        href={activeProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex-1 min-w-[120px] items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-[#19D1C2] text-[#19D1C2] font-bold transition-all duration-300 hover:bg-[#19D1C2]/10 hover:shadow-lg hover:shadow-[#19D1C2]/20"
                      >
                        <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver Demo
                      </motion.a>
                    )}
                  </>
                )}
              </motion.div>

              {/* Quick stats */}
              <motion.div 
                className="flex justify-between items-center mt-6 pt-4 border-t border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <span className="text-gray-400 text-sm">Atualizado em {activeProject?.year}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-[#19D1C2] text-sm hover:text-white transition-colors flex items-center gap-1"
                  onClick={() => setActiveProject(filteredProjects[(filteredProjects.indexOf(activeProject || projectsData[0]) + 1) % filteredProjects.length])}
                >
                  Próximo Projeto
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
