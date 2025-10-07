"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Competencias() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const competencias = [
    {
      title: "Habilidades Técnicas",
      subtitle: "Expertise em Desenvolvimento",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      content: "Minha trajetória como estudante de Desenvolvimento de Sistemas tem sido marcada por desafios e conquistas que moldaram minha visão de futuro na tecnologia. Durante esse período, participei de projetos acadêmicos e pessoais que me permitiram aplicar conceitos aprendidos em sala de aula e explorar novas soluções para problemas reais.",
      highlights: [
        "Desenvolvimento Full Stack (Front-end e Back-end)",
        "Arquitetura de software escalável e modular",
        "Banco de dados relacionais e não-relacionais",
        "APIs RESTful e integração de sistemas",
        "Versionamento com Git e metodologias ágeis",
        "Otimização de performance e boas práticas"
      ],
      color: "from-[#19D1C2] to-[#087e74]"
    },
    {
      title: "Soft Skills",
      subtitle: "Competências Interpessoais",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      content: "Além das habilidades técnicas, acredito que minhas competências interpessoais são fundamentais para o sucesso em projetos e no ambiente profissional. Tenho facilidade para trabalhar em equipe, promovendo colaboração e troca de ideias para alcançar objetivos comuns.",
      highlights: [
        "Trabalho em equipe e colaboração efetiva",
        "Comunicação clara e assertiva",
        "Resolução criativa de problemas",
        "Adaptabilidade e flexibilidade",
        "Resiliência diante de desafios",
        "Proatividade e iniciativa"
      ],
      color: "from-[#19D1C2] to-[#087e74]"
    },
    {
      title: "Objetivo Profissional",
      subtitle: "Visão de Futuro",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      content: "Como futuro desenvolvedor full stack, meu objetivo principal é me consolidar como um profissional de destaque na área de tecnologia. Quero contribuir para a criação de projetos inovadores e impactantes que possam transformar positivamente a vida das pessoas.",
      highlights: [
        "Consolidação como desenvolvedor Full Stack",
        "Contribuir em projetos inovadores",
        "Aprendizado contínuo e atualização constante",
        "Construir carreira sólida e de impacto",
        "Desenvolver soluções que transformem vidas",
        "Crescer junto com empresas e projetos"
      ],
      color: "from-[#19D1C2] to-[#087e74]"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: { duration: 0.4 }
    }
  };

  const highlightVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="compe" className="relative bg-gray-950 py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-pulse-slow absolute top-20 left-10 h-96 w-96 rounded-full bg-[#19D1C2]/10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute right-10 bottom-40 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-600/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#19D1C2]/30 bg-[#19D1C2]/10 px-4 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#19D1C2] opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#19D1C2]"></span>
            </span>
            <span className="text-sm font-medium text-[#19D1C2]">SOBRE MIM</span>
          </motion.div>

          <h2 className="mb-4 bg-gradient-to-r from-[#19D1C2] via-white to-[#19D1C2] bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
            Minhas Competências
          </h2>
          <div className="mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-[#19D1C2] to-transparent"></div>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            Conheça as habilidades e objetivos que me definem como profissional
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3 mx-auto max-w-7xl"
        >
          {competencias.map((competencia, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              onClick={() => setActiveTab(index)}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ${activeTab === index
                ? "border-[#19D1C2] bg-gradient-to-br from-gray-800/90 to-gray-900/90 shadow-2xl shadow-[#19D1C2]/20"
                : "border-gray-700/50 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800/70"
                }`}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${competencia.color} opacity-0 transition-opacity duration-500 ${activeTab === index ? "opacity-10" : "group-hover:opacity-5"
                }`}></div>

              <div className="relative p-8">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`mb-6 inline-flex rounded-xl bg-gradient-to-br from-[#19D1C2] to-[#087e74] p-4 shadow-lg ${activeTab === index ? "shadow-[#19D1C2]/50" : ""
                    }`}
                >
                  <div className="text-white">
                    {competencia.icon}
                  </div>
                </motion.div>

                {/* Title */}
                <h3 className="mb-2 text-2xl font-bold text-white">
                  {competencia.title}
                </h3>
                <p className="mb-6 text-sm text-gray-400">
                  {competencia.subtitle}
                </p>

                {/* Indicator */}
                <div className="flex items-center gap-2 text-sm">
                  <span className={`font-medium transition-colors ${activeTab === index ? "text-[#19D1C2]" : "text-gray-500 group-hover:text-gray-400"
                    }`}>
                    {activeTab === index ? "Visualizando" : "Clique para ver mais"}
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform ${activeTab === index ? "rotate-90 text-[#19D1C2]" : "text-gray-500 group-hover:translate-x-1"
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Active indicator bar */}
              {activeTab === index && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${competencia.color}`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed content section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 mx-auto max-w-5xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-8 md:p-12"
              >
                {/* Header */}
                <div className="mb-8 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${competencias[activeTab].color} p-4 shadow-lg`}>
                      <div className="text-white">
                        {competencias[activeTab].icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-1">
                        {competencias[activeTab].title}
                      </h3>
                      <p className="text-gray-400">
                        {competencias[activeTab].subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {competencias[activeTab].content}
                </p>

                {/* Highlights */}
                <div>
                  <h4 className={`mb-6 flex items-center gap-2 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r ${competencias[activeTab].color}`}>
                    <svg className="h-6 w-6 text-[#19D1C2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Principais Destaques
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {competencias[activeTab].highlights.map((highlight, i) => (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={highlightVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-start gap-3 group"
                      >
                        <div className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${competencias[activeTab].color} shadow-lg`}>
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}