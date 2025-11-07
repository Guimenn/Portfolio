"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown, FaRocket, FaLightbulb, FaClock, FaDollarSign } from 'react-icons/fa';

const faqs = [
  {
    question: "Quanto tempo leva pra fazer um projeto?",
    answer: "Depende muito do tamanho do bagulho! Um site simples sai em 1-2 semanas. Agora, se for uma aplicação mais complexa, pode levar de 1 a 3 meses. Mas relaxa, a gente sempre alinha tudo no início pra você saber o que esperar! ⏰",
    icon: <FaClock className="text-[#19D1C2]" />
  },
  {
    question: "Qual o investimento necessário?",
    answer: "Olha, cada projeto é único, então o valor varia bastante. Posso fazer desde landing pages mais em conta até aplicações completas. O melhor é a gente bater um papo sobre o que você precisa e eu monto um orçamento personalizado pra você! 💰",
    icon: <FaDollarSign className="text-[#19D1C2]" />
  },
  {
    question: "Você dá suporte depois que entrega?",
    answer: "Claro! Não vou te deixar na mão não. Todo projeto vem com um período de garantia pra ajustes e correções. E se você precisar de manutenção contínua ou novas features depois, a gente pode fazer um plano de suporte tranquilo! 🛠️",
    icon: <FaRocket className="text-[#19D1C2]" />
  },
  {
    question: "Trabalha com quais tecnologias?",
    answer: "Manjo bem de React, Next.js, Node.js, TypeScript, e um monte de coisa moderna! Uso as melhores ferramentas do mercado pra garantir que seu projeto seja rápido, seguro e fácil de dar manutenção. Se tiver alguma tech específica que você quer usar, me fala que a gente conversa! 🚀",
    icon: <FaLightbulb className="text-[#19D1C2]" />
  },
  {
    question: "Posso acompanhar o desenvolvimento?",
    answer: "Com certeza! Eu faço questão de manter você no loop. Você vai ter acesso ao progresso do projeto, vamos ter reuniões regulares, e pode dar feedback a qualquer momento. Afinal, o projeto é SEU e tem que ficar do jeito que você quer! 👨‍💻",
    icon: <FaRocket className="text-[#19D1C2]" />
  },
  {
    question: "E se eu não souber explicar o que quero?",
    answer: "Fica sussa! Muita gente não sabe bem o que quer no início, e tá tudo bem. A gente marca uma call, você me conta suas ideias e necessidades, e eu vou te ajudar a transformar isso num projeto concreto. Às vezes até dou sugestões que você nem tinha pensado! 💡",
    icon: <FaLightbulb className="text-[#19D1C2]" />
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-950 px-6 py-16">
     

      {/* Background elements */}
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="animate-pulse-slow absolute top-20 right-10 h-72 w-72 rounded-full bg-[#19D1C2]/15 blur-3xl filter"></div>
        <div className="animate-pulse-slow absolute bottom-20 left-10 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl filter"></div>
      </div>

      <div className="z-10 container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-bold text-white md:text-5xl mb-4">
            Dúvidas? <span className="text-[#19D1C2]">Tamo Aqui!</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            As perguntas mais comuns que eu recebo. Se a sua não tá aqui, só mandar mensagem! 😊
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full text-left rounded-2xl border-2 border-gray-700/50 bg-gray-900/80 p-6 shadow-lg backdrop-blur-xl hover:border-[#19D1C2]/50 transition-all duration-300"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#19D1C2]/10 border border-[#19D1C2]/30 flex items-center justify-center">
                      {faq.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#19D1C2] transition-colors">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <FaChevronDown className="w-5 h-5 text-[#19D1C2]" />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 pt-4 border-t border-gray-700/50 text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-300 mb-6">
            Ainda tem dúvidas? Bora conversar! 🚀
          </p>
          <motion.a
            href="#contato"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#19D1C2] to-[#15b3a6] text-gray-900 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-[#19D1C2]/40 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Entrar em Contato</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

