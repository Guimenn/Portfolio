"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Tecnologias() {
  // Array de tecnologias com suas informações
  const tecnologias = [
    { nome: "HTML", imagem: "/img/html.png" },
    { nome: "CSS", imagem: "/img/css-3.png" },
    { nome: "Bootstrap", imagem: "/img/bootstrap.png" },
    { nome: "Tailwind CSS", imagem: "/img/icons8-tailwind-css.svg" },
    { nome: "NextJS", imagem: "/img/icons8-nextjs.svg" },
    { nome: "ReactJS", imagem: "/img/icons8-react.svg" },
    { nome: "NodeJS", imagem: "/img/icons8-node.png" },
    { nome: "JavaScript", imagem: "/img/js.png" },
    { nome: "PostgreSQL", imagem: "/img/icons8-postgreesql.png" },
    { nome: "MySQL", imagem: "/img/mysql.png" },
    { nome: "PHP", imagem: "/img/icons8-php.svg" },
    { nome: "Git", imagem: "/img/icons8-git.svg" },

  ];

  // Efeito de animação para os cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <>
      <section
        id="tech"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-4 py-12 sm:px-6 sm:py-16"
      >
        {/* Elementos de fundo decorativos semelhantes à Hero section */}
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="animate-pulse-slow absolute top-20 right-10 h-72 w-72 rounded-full bg-[#19D1C2]/15 blur-3xl filter"></div>
          <div className="animate-pulse-slow absolute bottom-20 left-10 h-64 w-64 rounded-full bg-purple-600/10 blur-3xl filter"></div>
        </div>

        <div className="z-10 container mx-auto">
          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8">
            <h1 className="mb-6 sm:mb-8 bg-gradient-to-r from-[#19D1C2] to-[#087e74] bg-clip-text text-3xl font-extra-bold text-transparent sm:text-4xl md:text-5xl text-center px-4">
              TECNOLOGIAS COM AS QUAIS TRABALHO
            </h1>

            <div
              className="w-full rounded-2xl border border-gray-700/50 bg-gray-900/70 p-4 sm:p-6 md:p-8 shadow-2xl backdrop-blur-xl"
              id="tecnologias-container"
            >
              <div className="grid grid-cols-2 gap-4 sm:gap-4 md:gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {tecnologias.map((tech, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={cardVariants}
                    className="flex transform flex-col items-center justify-center gap-3 sm:gap-3 rounded-xl border border-gray-800 bg-gray-900/80 p-4 sm:p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#19D1C2]/50 hover:shadow-lg hover:shadow-[#19D1C2]/20 min-h-[100px] sm:min-h-[120px]"
                  >
                    <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center">
                      <Image
                        src={tech.imagem}
                        alt={tech.nome}
                        width={56}
                        height={56}
                        className="h-full w-full object-contain transition-all duration-300 hover:scale-110"
                      />
                    </div>
                    <p className="text-sm sm:text-sm font-medium text-gray-200 text-center leading-tight">
                      {tech.nome}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
