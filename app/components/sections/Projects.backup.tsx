"use client";
import { useState, useRef, useMemo } from "react";
import ProjectItem from "../ProjectItem";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaFilter, FaCode } from "react-icons/fa";
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
    id: 4,
    title: "Automação WhatsApp - Captação de Leads",
    description: "Sistema automatizado de atendimento via WhatsApp para captação e qualificação de leads. Recebe mensagens de clientes, processa informações, qualifica o interesse e envia automaticamente links de pagamento personalizados. Solução completa que otimiza o processo de vendas e reduz tempo de resposta.",
    imageUrl: "/img/automacao-n8n-atendimento.png",
    technologies: [
      "n8n", "WhatsApp API", "PostgreSQL", "Webhooks", "API REST", "Mercado Pago API"
    ],
    features: [
      "Recebimento automático de mensagens via WhatsApp",
      "Captação e qualificação inteligente de leads",
      "Processamento e armazenamento de dados dos clientes",
      "Envio automático de links de pagamento personalizados",
      "Integração com gateway de pagamento",
      "Respostas automáticas e fluxo conversacional",
      "Registro de histórico de conversas",
      "Notificações em tempo real para equipe de vendas"
    ],
    year: 2026
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
  }
];

// Tecnologias únicas para filtros
const allTechnologies = [...new Set(projectsData.flatMap(p => p.technologies))];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(projectsData[0]);
  const [selectedTech, setSelectedTech] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Memoizar projetos filtrados
  const filteredProjects = useMemo(() => {
    if (selectedTech === "all") return projectsData;
    return projectsData.filter(project => project.technologies.includes(selectedTech));
  }, [selectedTech]);

  // Animações simplificadas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
        {allTechnologies.slice(0, 5).map((tech, index) => {
          const baseOffset = index * 500;
          return (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isInView ? 0.7 : 0,
                scale: isInView ? 1 : 0,
                x: [0, Math.sin(baseOffset / 1000) * 10, 0],
                y: [0, Math.cos(baseOffset / 1000) * 10, 0]
              }}
              transition={{
                duration: 3,
                delay: 0.5 * index,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.2, zIndex: 10 }}
              className={`absolute ${styles.techBubble} cursor-none`}
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
          );
        })}
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
            className={`${styles.projectsContainer} w-full space-y-3`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                custom={index}
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
                />
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

        {/* Showcase principal - design elegante e limpo */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: "spring",
            stiffness: 100
          }}
          className="project-showcase w-full md:w-1/2 sticky top-20 self-start"
        >
          <div className={`${styles.showcase} h-auto w-full overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-700/50 bg-gray-900/80 backdrop-blur-xl transition-all duration-300 relative group hover:border-[#19D1C2]/50 hover:shadow-[#19D1C2]/20`}>
            {/* Overlay interativo */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent flex items-end p-8 z-10 pointer-events-none"
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

                <div className="flex justify-end gap-2 mt-4">
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
                  className="w-full h-full relative cursor-none"
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
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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
                className="text-gray-300 mb-8 text-lg leading-relaxed"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {activeProject?.description}
              </motion.p>

              {/* Características e Tecnologias em 2 colunas */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Coluna 1 - Características */}
                {activeProject?.features && activeProject.features.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    <h3 className="text-[#19D1C2] font-semibold mb-4 text-base flex items-center gap-2">
                      <FaSearch className="h-4 w-4" />
                      Características
                    </h3>
                    <ul className="space-y-3">
                      {activeProject.features.slice(0, 6).map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-2 text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.05 }}
                        >
                          <div className="w-1.5 h-1.5 bg-[#19D1C2] rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Coluna 2 - Tecnologias */}
                {activeProject?.technologies && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    <h3 className="text-[#19D1C2] font-semibold mb-4 text-base flex items-center gap-2">
                      <FaCode className="h-4 w-4" />
                      Tecnologias
                    </h3>
                    <ul className="space-y-3">
                      {activeProject.technologies.map((tech, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start gap-2 text-gray-300 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.05 }}
                        >
                          <div className="w-1.5 h-1.5 bg-[#19D1C2] rounded-full mt-1.5 flex-shrink-0"></div>
                          <span>{tech}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Botões de ação aprimorados */}
              <motion.div
                className="flex flex-wrap flex-row gap-4 mb-8"
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
                        className="group relative flex justify-center min-w-[120px] items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#19D1C2] to-[#087e74] text-gray-900 font-bold shadow-xl transition-all duration-300 overflow-hidden"
                      >
                        <svg className="h-5 w-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        className="group flex justify-center min-w-[120px] items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#19D1C2] text-[#19D1C2] font-bold transition-all duration-300 hover:bg-[#19D1C2]/10 hover:shadow-lg hover:shadow-[#19D1C2]/20"
                      >
                        <svg className="h-5 w-5  transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        className="group flex justify-center min-w-[120px] items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#19D1C2] to-[#087e74] text-gray-900 font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#19D1C2]/40"
                      >
                        <svg className="h-5 w-5  transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                        className="group flex justify-center min-w-[120px] items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#19D1C2] text-[#19D1C2] font-bold transition-all duration-300 hover:bg-[#19D1C2]/10 hover:shadow-lg hover:shadow-[#19D1C2]/20"
                      >
                        <svg className="h-5 w-5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <span className="text-gray-400 text-sm">Atualizado em {activeProject?.year}</span>

              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
