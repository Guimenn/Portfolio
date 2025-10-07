"use client";
import { useState, useEffect, useRef } from "react";
import ProjectItem from "../ProjectItem";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import styles from "../styles/Projects.module.css";

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
  }

];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(projectsData[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  useEffect(() => {
    // Simulate image loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [activeProject]);

  // Enhanced animation variants for smoother transitions
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
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

        {/* Interactive tech bubbles */}
        {activeProject.technologies.map((tech, index) => (
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
            className={`absolute ${styles.techBubble}`}
            style={{
              top: `${30 + (index * 15)}%`,
              left: `${10 + (index * 20)}%`,
              backgroundColor: `rgba(25, 209, 194, ${0.1 + (index * 0.1)})`,
              padding: `${1 + index}rem`,
              borderRadius: "50%",
              zIndex: 1
            }}
          >
            <span className="text-[#19D1C2] font-medium whitespace-nowrap">{tech}</span>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12 z-10">
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
            className="mb-8 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-start"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19D1C2] to-[#087e74]" id="top">
              MEUS
              PROJETOS
              <motion.span
                className="absolute -bottom-3 left-0 h-1.5 bg-[#19D1C2]"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ delay: 0.5, duration: 2 }}
              >
                &nbsp
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
            e tecnologias em minha jornada como desenvolvedor.
          </motion.p>

          <motion.div
            className={`${styles.projectsContainer} w-full`}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projectsData.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="project-showcase w-full md:w-1/2 sticky top-20 self-start"
        >
          <div className={`${styles.showcase} h-auto w-full overflow-hidden rounded-2xl shadow-2xl border border-gray-700/50 bg-gray-900/70 backdrop-blur-xl transition-all duration-500`}>
            <div className={`${styles.projectImage} h-64 md:h-[350px] lg:h-[400px] w-full relative overflow-hidden`}>
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-800/80">
                  <div className="w-12 h-12 border-4 border-[#19D1C2] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : activeProject?.imageUrl ? (
                <motion.div
                  className="w-full h-full relative"
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
                    className="object-cover transition-all duration-700"
                    priority
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent flex items-end"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: isHovering ? 0.9 : 0.7 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </motion.div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <p className="text-gray-400">Selecione um projeto</p>
                </div>
              )}
            </div>

            {/* Project details section - completely redesigned */}
            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h2 className="text-3xl font-bold text-white font-display">
                  {activeProject?.title}
                </h2>
                {activeProject?.year && (
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#19D1C2]/20 text-[#19D1C2]">
                    {activeProject.year}
                  </span>
                )}
              </div>

              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                {activeProject?.description}
              </p>

              {/* Features section */}
              {activeProject?.features && (
                <div className="mb-6">
                  <h3 className="text-[#19D1C2] font-medium mb-2 text-lg">Características principais:</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeProject.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg className="h-5 w-5 text-[#19D1C2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies section */}
              {activeProject?.technologies && (
                <div className="mb-8">
                  <h3 className="text-[#19D1C2] font-medium mb-2 text-lg">Tecnologias utilizadas:</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, index) => (
                      <span key={index} className={`${styles.techTag} px-4 py-2 text-sm font-medium rounded-full bg-[#19D1C2]/20 text-[#19D1C2] transition-all duration-300 hover:bg-[#19D1C2]/30`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4">
                {/* Para projetos com links (Studdy) */}
                {activeProject?.links ? (
                  <>
                    {activeProject.demoLink && (
                      <motion.a
                        href={activeProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#19D1C2] text-gray-900 font-medium transition-all hover:bg-[#19D1C2]/90 hover:shadow-lg hover:shadow-[#19D1C2]/20"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver página
                      </motion.a>
                    )}
                    {activeProject.links[1] && (
                      <motion.a
                        href={activeProject.links[1].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg border-2 border-[#19D1C2] text-[#19D1C2] font-medium transition-all hover:bg-[#19D1C2]/10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Ver back-end
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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#19D1C2] text-gray-900 font-medium transition-all hover:bg-[#19D1C2]/90 hover:shadow-lg hover:shadow-[#19D1C2]/20"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Ver código
                      </motion.a>
                    )}
                    {activeProject.demoLink && (
                      <motion.a
                        href={activeProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg border-2 border-[#19D1C2] text-[#19D1C2] font-medium transition-all hover:bg-[#19D1C2]/10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Ver demonstração
                      </motion.a>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
