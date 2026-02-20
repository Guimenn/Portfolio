"use client";
import { useState, useRef, useMemo } from "react";
import ProjectItem from "../ProjectItem";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { FaFilter, FaCode } from "react-icons/fa";

const projectsData = [
    {
        id: 1,
        title: "Zelos",
        description: "Sistema de gerenciamento de Ordens de Serviço desenvolvido para o SENAI, focado em otimizar o fluxo de trabalho de manutenção e atendimento técnico.",
        imageUrl: "/img/senai.png",
        links: [
            { label: "Repositório Principal", url: "https://github.com/Guimenn/Zelos-Senai" },
            { label: "Front-end", url: "https://github.com/Guimenn/Zelos-Senai/tree/main/sistema-senai" },
            { label: "Back-end (API)", url: "https://github.com/Guimenn/Zelos-Senai/tree/main/backend" }
        ],
        demoLink: "https://zelos-senai.vercel.app",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Prisma ORM", "Supabase", "Vercel"],
        features: [
            "Gerenciamento completo de Ordens de Serviço",
            "Interface moderna e responsiva",
            "Sistema de status e priorização",
            "Back-end dedicado (API RESTful)",
            "Integração com PostgreSQL"
        ],
        year: 2025
    },
    {
        id: 4,
        title: "Automação WhatsApp - Captação de Leads",
        description: "Sistema automatizado de atendimento via WhatsApp para captação e qualificação de leads com envio automático de links de pagamento.",
        imageUrl: "/img/automacao-n8n-atendimento.png",
        technologies: ["n8n", "WhatsApp API", "PostgreSQL", "Webhooks", "API REST", "Mercado Pago API"],
        features: [
            "Recebimento automático de mensagens",
            "Captação e qualificação de leads",
            "Envio automático de links de pagamento",
            "Integração com gateway de pagamento",
            "Notificações em tempo real"
        ],
        year: 2026
    },
    {
        id: 2,
        title: "Studdy",
        description: "Plataforma educacional de simulados online para preparação de exames com feedback imediato.",
        imageUrl: "/img/studdy.png",
        links: [
            { label: "Front-end", url: "https://github.com/Guimenn/Studdy" },
            { label: "Back-end (API)", url: "https://github.com/Guimenn/api-studdy" }
        ],
        demoLink: "https://studdy-three.vercel.app",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Express", "Prisma ORM", "PostgreSQL"],
        features: [
            "Realização de simulados online",
            "Interface amigável e responsiva",
            "Feedback imediato",
            "Sistema de pontuação",
            "Back-end dedicado (API RESTful)"
        ],
        year: 2025
    },
    {
        id: 3,
        title: "Thornfield",
        description: "Site elegante para marca premium de whisky com design sofisticado e experiência imersiva.",
        imageUrl: "/img/Thornfield.png",
        link: "https://github.com/Guimenn/Thornfield-a",
        demoLink: "https://thornfield-a.vercel.app",
        technologies: ["Next.js", "Tailwind CSS", "Flowbite React", "TypeScript", "Firebase"],
        features: ["Arquitetura escalável", "Componentes pré-configurados", "Tipagem estática", "Sistema de design moderno"],
        year: 2025
    }
];

const allTechnologies = [...new Set(projectsData.flatMap(p => p.technologies))];

export default function Projects() {
    const [activeProject, setActiveProject] = useState(projectsData[0]);
    const [selectedTech, setSelectedTech] = useState("all");
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const filteredProjects = useMemo(() => {
        if (selectedTech === "all") return projectsData;
        return projectsData.filter(project => project.technologies.includes(selectedTech));
    }, [selectedTech]);

    return (
        <section
            id="projeto"
            ref={sectionRef}
            className="relative py-24 px-4 md:px-8 lg:px-16 bg-gray-950 min-h-screen flex items-center overflow-hidden"
        >
            {/* Background simplificado */}
            <div className="absolute top-0 left-0 h-full w-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 h-80 w-80 rounded-full bg-[#19D1C2]/10 blur-3xl"></div>
                <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl"></div>
            </div>

            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12 z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="w-full md:w-1/2 flex flex-col"
                >
                    <h1 className="mb-8 text-3xl font-bold text-white md:text-5xl lg:text-6xl text-start">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19D1C2] to-[#087e74]">
                            MEUS<br />PROJETOS
                        </span>
                    </h1>

                    <p className="mb-10 text-gray-300 text-lg leading-relaxed max-w-2xl">
                        Explore meus projetos destacados, cada um representando diferentes habilidades e tecnologias.
                    </p>

                    {/* Filtro */}
                    <div className="mb-8">
                        <div className="relative mb-4">
                            <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#19D1C2] h-5 w-5" />
                            <select
                                value={selectedTech}
                                onChange={(e) => setSelectedTech(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:border-[#19D1C2] focus:outline-none transition-all"
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
                    </div>

                    {/* Lista de projetos */}
                    <div className="w-full space-y-3">
                        {filteredProjects.map((project) => (
                            <ProjectItem
                                key={project.id}
                                title={project.title}
                                description={project.description}
                                technologies={project.technologies}
                                year={project.year}
                                isActive={activeProject?.id === project.id}
                                onClick={() => setActiveProject(project)}
                            />
                        ))}
                    </div>

                    {/* Estatísticas */}
                    <div className="grid grid-cols-2 gap-4 mt-8 p-4 bg-gray-900/50 rounded-xl">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#19D1C2]">{projectsData.length}+</div>
                            <p className="text-gray-400 text-sm">Projetos Completos</p>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-[#19D1C2]">{allTechnologies.length}+</div>
                            <p className="text-gray-400 text-sm">Tecnologias</p>
                        </div>
                    </div>
                </motion.div>

                {/* Showcase do projeto */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="w-full md:w-1/2 sticky top-20 self-start"
                >
                    <div className="h-auto w-full overflow-hidden rounded-2xl shadow-2xl border-2 border-gray-700/50 bg-gray-900/80 backdrop-blur-xl transition-all duration-300 hover:border-[#19D1C2]/50">
                        {/* Imagem */}
                        <div className="h-64 md:h-[350px] lg:h-[400px] w-full relative overflow-hidden">
                            {activeProject?.imageUrl && (
                                <Image
                                    src={activeProject.imageUrl}
                                    alt={activeProject.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                    priority
                                />
                            )}
                        </div>

                        {/* Detalhes */}
                        <div className="p-8">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <h2 className="text-3xl font-bold text-white">{activeProject?.title}</h2>
                                {activeProject?.year && (
                                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#19D1C2]/20 text-[#19D1C2]">
                                        {activeProject.year}
                                    </span>
                                )}
                            </div>

                            <p className="text-gray-300 mb-8 text-lg leading-relaxed">{activeProject?.description}</p>

                            {/* Features e Tecnologias */}
                            <div className="grid md:grid-cols-2 gap-8 mb-10">
                                {activeProject?.features && (
                                    <div>
                                        <h3 className="text-[#19D1C2] font-semibold mb-4 text-base">Características</h3>
                                        <ul className="space-y-3">
                                            {activeProject.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                                                    <div className="w-1.5 h-1.5 bg-[#19D1C2] rounded-full mt-1.5 flex-shrink-0"></div>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {activeProject?.technologies && (
                                    <div>
                                        <h3 className="text-[#19D1C2] font-semibold mb-4 text-base flex items-center gap-2">
                                            <FaCode className="h-4 w-4" />
                                            Tecnologias
                                        </h3>
                                        <ul className="space-y-3">
                                            {activeProject.technologies.map((tech, index) => (
                                                <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                                                    <div className="w-1.5 h-1.5 bg-[#19D1C2] rounded-full mt-1.5 flex-shrink-0"></div>
                                                    <span>{tech}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Botões */}
                            <div className="flex flex-wrap gap-4">
                                {activeProject?.demoLink && (
                                    <a
                                        href={activeProject.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex justify-center min-w-[120px] items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#19D1C2] to-[#087e74] text-gray-900 font-bold shadow-xl transition-all hover:scale-105"
                                    >
                                        Ver Demo
                                    </a>
                                )}
                                {(activeProject?.links?.[0] || activeProject?.link) && (
                                    <a
                                        href={activeProject.links?.[0]?.url || activeProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex justify-center min-w-[120px] items-center gap-2 px-5 py-3 rounded-xl border-2 border-[#19D1C2] text-[#19D1C2] font-bold transition-all hover:bg-[#19D1C2]/10"
                                    >
                                        Ver Código
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
