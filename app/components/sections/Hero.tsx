"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  const typewriterRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const typewriterElement = typewriterRef.current;
    if (!typewriterElement) return;

    const phrases = ["Guilherme Vidichosqui Men"];
    let currentPhraseIndex = 0;
    let charIndex = 0;
    let timeoutId: NodeJS.Timeout | undefined;

    function typeWriterEffect() {
      const currentPhrase = phrases[currentPhraseIndex];
      if (charIndex < currentPhrase.length) {
        if (typewriterElement) {
          typewriterElement.textContent += currentPhrase.charAt(charIndex);
        }
        charIndex++;
        timeoutId = setTimeout(typeWriterEffect, 100);
      } else {
        timeoutId = setTimeout(() => eraseEffect(), 2000);
      }
    }

    function eraseEffect() {
      const currentPhrase = phrases[currentPhraseIndex];
      if (charIndex > 0) {
        if (typewriterElement) {
          typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        }
        charIndex--;
        timeoutId = setTimeout(eraseEffect, 50);
      } else {
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        timeoutId = setTimeout(typeWriterEffect, 500);
      }
    }

    typeWriterEffect();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-6 py-16">
      {/* Elementos de fundo decorativos aprimorados */}
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="animate-pulse-slow absolute top-20 left-10 h-72 w-72 rounded-full bg-[#19D1C2]/15 blur-3xl filter"></div>
        <div className="animate-pulse-slow absolute right-10 bottom-20 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl filter"></div>
        <div className="animate-pulse-slow absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl filter"></div>
      </div>

      <div className="z-10 container mx-auto">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5">
          {/* Coluna principal - 3/5 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-10 lg:col-span-3"
          >
            {/* Card com foto e nome - redesenhado */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-2xl border border-gray-700/50 bg-gray-900/70 p-8 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex flex-col items-center gap-8 sm:flex-row">
                <div className="relative h-32 w-32 transform overflow-hidden rounded-full border-4 border-[#19D1C2] shadow-lg shadow-[#19D1C2]/30 transition-all duration-500 hover:rotate-6">
                  <Image
                    src="/img/euu.png"
                    alt="Foto de perfil"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-[#19D1C2]"></span>
                    <span className="text-sm font-medium tracking-wider text-gray-300 uppercase">
                      Desenvolvedor Full Stack
                    </span>
                  </div>
                  <h1
                    ref={typewriterRef}
                    className="min-h-[48px] font-mono text-3xl font-bold text-[#19D1C2] md:text-4xl"
                  ></h1>
                </div>
              </div>
            </motion.div>

            {/* Título principal - redesenhado */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="rounded-2xl border border-gray-700/50 bg-gray-900/70 p-10 shadow-2xl backdrop-blur-xl"
            >
              <h1 className="mb-8 text-4xl leading-tight font-extrabold text-white md:text-6xl">
              TRANSFORME{" "}
                <span className="group relative inline-block text-[#19D1C2]">
                SONHOS
                  <span className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-[#19D1C2]/70 transition-all duration-700 group-hover:w-full"></span>
                </span>{" "}
                EM{" "}
                <span className="group relative inline-block text-[#19D1C2]">
                REALIDADE
                  <span className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-[#19D1C2]/70 transition-all duration-700 group-hover:w-full"></span>
                </span>
              </h1>
              <p className="mb-10 text-xl leading-relaxed font-medium text-gray-300 md:text-2xl">
              UNINDO TECNOLOGIA E CRIATIVIDADE PARA CRIAR SOLUÇÕES EXTRAORDINÁRIAS
              </p>

              <div className="mt-12 flex flex-wrap gap-6">
                <motion.a
                  href="#projeto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 rounded-xl bg-[#19D1C2] px-8 py-4 font-bold text-gray-900 shadow-xl shadow-[#19D1C2]/20 transition-all duration-300 hover:bg-[#19D1C2]/90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Explorar Projetos
                </motion.a>
                <motion.a
                  href="#contato"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 rounded-xl border-2 border-[#19D1C2] bg-transparent px-8 py-4 font-bold text-[#19D1C2] transition-all duration-300 hover:bg-[#19D1C2]/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Vamos Conversar
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Coluna secundária - 2/5 - redesenhada */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="hidden items-center justify-center lg:col-span-2 lg:flex"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-900/70 shadow-2xl backdrop-blur-xl">
              {/* Gradiente decorativo aprimorado */}
              <div className="absolute inset-0 z-10 bg-gradient-to-tr from-gray-900/90 via-gray-900/70 to-transparent"></div>

              {/* Elemento central animado - redesenhado */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative"
                >
                  <div className="absolute inset-0 h-40 w-40 animate-ping rounded-full bg-[#19D1C2]/20 opacity-30"></div>
                  <div className="absolute inset-0 h-40 w-40 animate-pulse rounded-full bg-[#19D1C2]/40"></div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-[#19D1C2] to-[#19D1C2]/80 shadow-lg shadow-[#19D1C2]/30"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-20 w-20 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>

              {/* Linhas de código decorativas - redesenhadas */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute right-8 bottom-8 left-8 overflow-hidden rounded-xl border border-gray-700/50 bg-gray-900/90 p-6 font-mono text-sm text-[#19D1C2] shadow-xl backdrop-blur-md"
              >
                <div className="space-y-2">
                  <p>
                    const{" "}
                    <span className="font-semibold text-purple-400">
                      developer
                    </span>{" "}
                    = {`{`}
                  </p>
                  <p className="pl-5">
                    name:{" "}
                    <span className="text-green-400">
                      &quot;Guilherme Vidichosqui Men&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-5">
                    skills: [
                    <span className="text-yellow-400">&quot;Frontend&quot;</span>,{" "}
                    <span className="text-yellow-400">&quot;Backend&quot;</span>,{" "}
                    <span className="text-yellow-400">&quot;UI/UX&quot;</span>,{" "}
                    <span className="text-yellow-400">&quot;Web Performance&quot;</span>],
                  </p>
                  <p className="pl-5">
                    specialization:{" "}
                    <span className="text-green-400">
                      &quot;Arquitetura de soluções web escaláveis&quot;
                    </span>
                    ,
                  </p>
                  <p className="pl-5">
                    objective:{" "}
                    <span className="text-blue-400">
                      &quot;Desenvolver sistemas de alto desempenho&quot;
                    </span>
                  </p>
                  <p>{`}`};</p>
                </div>
              </motion.div>

              {/* Elementos decorativos flutuantes - redesenhados */}
              <motion.div
                animate={{ rotate: [12, -12, 12], y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-10 right-10 flex h-20 w-20 items-center justify-center rounded-lg border border-purple-500/40 bg-purple-600/30 shadow-lg backdrop-blur-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </motion.div>
              <motion.div
                animate={{ rotate: [-12, 12, -12], y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute top-32 left-10 flex h-16 w-16 items-center justify-center rounded-lg border border-blue-500/40 bg-blue-600/30 shadow-lg backdrop-blur-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </motion.div>
              <motion.div
                animate={{ rotate: [5, -5, 5], x: [0, 10, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-20 left-1/2 flex h-14 w-14 items-center justify-center rounded-lg border border-pink-500/40 bg-pink-600/30 shadow-lg backdrop-blur-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-pink-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

