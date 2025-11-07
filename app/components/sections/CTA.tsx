"use client";
import { motion } from "framer-motion";
import { FaRocket, FaCode, FaHandshake } from "react-icons/fa";

export default function CTA() {
  const benefits = [
    {
      icon: <FaRocket className="h-8 w-8" />,
      title: "Desenvolvimento Rápido",
      description: "Entrego seu projeto no prazo, sem enrolação"
    },
    {
      icon: <FaCode className="h-8 w-8" />,
      title: "Código Limpo",
      description: "Código organizado e fácil de manter"
    },
    {
      icon: <FaHandshake className="h-8 w-8" />,
      title: "Suporte Contínuo",
      description: "Não te deixo na mão depois que entrego"
    }
  ];

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gray-950 px-6 py-20">
      
      <div className="z-10 container mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Lado esquerdo - Texto principal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Pronto para{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#19D1C2] to-[#087e74]">
                  Transformar
                </span>{" "}
                sua Ideia?
              </motion.h2>
              <motion.p
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Não importa se é um site, app, sistema ou algo completamente novo. 
                Se você tem uma ideia, eu tenho o código!
              </motion.p>
              <motion.p
                className="text-lg text-gray-400 mt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                Vamos juntos criar algo incrível que vai impressionar seus clientes e 
                fazer seu negócio decolar. Sem burocracia, sem enrolação - só resultado!
              </motion.p>
            </div>

            {/* Benefícios */}
            <div className="grid gap-4 mt-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-700/30 hover:border-[#19D1C2]/40 transition-all duration-300"
                >
                  <div className="flex-shrink-0 p-3 rounded-lg bg-[#19D1C2]/10 text-[#19D1C2]">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Lado direito - CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-gray-700/50 bg-gray-900/70 p-8 shadow-2xl backdrop-blur-xl overflow-hidden">
              {/* Gradiente animado */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#19D1C2]/10 via-transparent to-purple-600/10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10 space-y-6">
                <div className="text-center">
                  <motion.h3
                    className="text-3xl font-bold text-white mb-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    Vamos Começar?
                  </motion.h3>
                  <p className="text-gray-300">
                    Preencha o formulário abaixo ou me chama direto no email. 
                    Vou responder rapidinho! ⚡
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.a
                    href="#contato"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="block w-full text-center px-6 py-4 bg-gradient-to-r from-[#19D1C2] to-[#087e74] text-gray-900 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#19D1C2]/40 transition-all duration-300"
                  >
                    Falar Comigo Agora
                  </motion.a>
                  <motion.a
                    href="#projeto"
                    whileHover={{ scale: 1.02 }}
                    className="block w-full text-center px-6 py-4 border-2 border-[#19D1C2] text-[#19D1C2] font-bold rounded-xl hover:bg-[#19D1C2]/10 transition-all duration-300"
                  >
                    Ver Meus Projetos
                  </motion.a>
                </div>

                <div className="pt-6 border-t border-gray-700/50">
                  <p className="text-center text-sm text-gray-400">
                    💡 <span className="text-[#19D1C2]">Dica:</span> Quanto mais detalhes você me passar, 
                    melhor eu consigo te ajudar!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

