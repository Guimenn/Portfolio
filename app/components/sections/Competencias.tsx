"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Competencias() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const competencias = [
    {
      title: "Habilidades Técnicas",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACfUlEQVR4nO1ZPW8TQRBdR0F8lDTeiYLT8F8CCIlfAAQlIIToCFDyf2gd3F5mT7iAi5hxrkIIQ4KQKGgpnMChWa+TkxXQ3dnHrdE+acvZmXcz8+ydUSogIGBmrPb7F4HNfSDsacYvwOYI2GQ1nSPrg7AnPteG0YXZGSil2mRuajIHNQb+16MJP+vB7o2ZSMAAHwPhT3fpG03m9so+XlFRtKzqQhQtiw9N8R0gfOt8H2s2jypnwpE41rT7RGVZS/1rZFlLE26fxMHx9dI9MSknS6JhAJtn48zgp1I9A4P4waScGsnENLKsBYSJI7OlisIpRiY9oTyBZrzrPu5OcSMyh2JkG9sTQBp33Mc9KG7EOBKjWtWpLJLknCutUWGbiYYrzwBl4wpE/gBN5gUQflCLnJHVtH8ZGL8B4a+FJHL1fe88MN7ShGzvW0QiwOZr7j9atrhECF/mj2b8sZBEzvyBDUROETKi5oRQWlMIpaXmhFBaUwilpeaE/6a0gDHVhN+bIxL5+NQ15Yn4NHzQe6/XKhORsaXyBCvvzL3KRGT26t+AzlQgMp6Gb9caZJF4BvHzfEzFDXOvOnnptRmfNjTEXrIk5LUpsVTPCG6dPFkJEzu2TOOOKEit6pTGnTbjhiaz53wLkc0KRE4njZrMNWDzsalFD4hvwvVKk8bp2S8kySW7eGGzA2yGE6L1HBw5H10ZosuKIy+/5Wa/ZF75Jr9txg1HtFvYyC4+/ZLfpVy/bBa2k62QLCE9lN+hDP5KGcsmVfZ23sgv21jWK90jm1R7QdPyy7KQxYcz3SubVFlCNii/w8qZOKtn7I/jWBIP65ZfPfbRlcYu3RMBAWqu+A1w8c9KwkGYygAAAABJRU5ErkJggg==",
      content: "Minha trajetória como estudante de Desenvolvimento de Sistemas tem sido marcada por desafios e conquistas que moldaram minha visão de futuro na tecnologia. Durante esse período, participei de projetos acadêmicos e pessoais que me permitiram aplicar conceitos aprendidos em sala de aula e explorar novas soluções para problemas reais. Com uma abordagem orientada a resultados, busco não apenas entregar o esperado, mas superar expectativas ao criar soluções inovadoras. Acredito que a tecnologia tem o poder de transformar vidas, e é essa motivação que me impulsiona a continuar aprendendo e desenvolvendo minhas habilidades. Estou determinado a contribuir para projetos significativos que impactem positivamente a sociedade."
    },
    {
      title: "Soft Skills",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADUUlEQVR4nO1Zv2sUQRSexIg/EAtRbubUxMLCQhDFShAthKjY2Rl/RBIliJ1RC7HRf8Dayjp2JqYR2XtvNQbdcG/2rggpcpqIilhYiGISszJzc+cRTtmdc7MTuA+m2eG9mW9n3jcz7zHWRhtttIxdExObhMQrgmCcS3gvJC4KiVFKbVGPQTCuxuypeBtbZ8AYyxGe4YRzKU78n40TvONh4XRLJEQI1wXBL+P0NSe8kC/BbuZ5XSwteF6XGoOTf1EQvDFjL3GJ16xXwpBY4lS4waKog602oqiDEwzX5yH9U4ljoradNImMISTeqq4MvE0UMyL0r9a2UyYrsRJR1CEIAkNmkMWFUYxIxQRzBFzCJfNzx+IbEc4rIx3YjkCU/W7zc+fiG0lYUEapqlNSBMF6s7UWYtvUNJw5BpF0Xm0iDRCycJRLeCIkfuAEP7WcEz4SobePrZUVEbJwTh1gteDkhCgIPxq/3/IlOOI8kW2Tk1uFxK/mnnSXRVGn7hgZWScI75vv0/XvrhIRIfRpe4KgWT8nkEZ9DrlNROI9/dcl3mnWzwkfmFU56zQRTjDECZ7xEI819U3wWPnOFf3ja1Z+c+Tt54Q/VODbPJiEC0SqbwyY1tuqiOdtfIisiQiCXiHhc13JbP3IjIjsKHtbOMFDQbCsJTmEvlb8iSyI7Cz5B7jEGePrea7o7WnFXyZE8lQ4yAm/cAnfRejftjn8sj9HAm+7IPikthIPXxy28eEGEXMNSfQkdfRkL5kryit9MP6lOX9F4SouYiTe8qF/YvWIeC4+dTE5EZeSD3zqZY81EZW2ZI4gX8TL1kRU7tW9BB1aEKnejYZTnWSc+YT+7cY52azIskog5yTczCiJ3alJqCR29b5muyIwWC8rEAQ6bVn2u5WCpKpOZb87J6GfE06ZsRWRAQsifzKNnPCkkDgb52xIqc2qZ4BVpnFl7lcEwWZdeJE4JiRWakTTabBgxhhVSXRV4miU32S5X8KnrslvTkK/IToa20gXPt2S386GeBmIbacSA6oI6aD8VvbOjG9IZKwqqTrt6Yr8Sj2XXis/qpJay+FmKr9SFWRhqCW/qpKqipAZym/FeiWaxYw+HKuSOJ+2/PLqGKMqsBPHRBttsP+K37NWSSXfpDf7AAAAAElFTkSuQmCC",
      content: "Além das habilidades técnicas, acredito que minhas competências interpessoais são fundamentais para o sucesso em projetos e no ambiente profissional. Tenho facilidade para trabalhar em equipe, promovendo colaboração e troca de ideias para alcançar objetivos comuns. Sou comunicativo, o que me ajuda a compreender as necessidades de colegas e clientes, transformando essas demandas em soluções práticas. Outra característica marcante é minha resiliência diante de desafios: vejo cada obstáculo como uma oportunidade de aprendizado. Minha capacidade de resolver problemas de forma criativa e eficiente me torna adaptável a diferentes contextos e demandas."
    },
    {
      title: "Objetivo Profissional",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADdklEQVR4nO1ZS2sUQRCexAQfKCIStyuJiaCCKB7Ef+DB+Dp5EnxFEkVEQTE+8OIlF8GLKP6IXDcGwcds1cQgOslWbSIBD1mTeBARRSQe8nClZ3s2IcawO5vN9sJ+0Jftrer6pruquqscp4oqqigazQMD60HoIjD2KcHPIDQDQpkSjZlgDcY+vWZr2l1XPAPHcWJMJxTTRAkNX3YoxnGVShwrigSk8Cowzhml7xTT2cZh3O64bp1TKrhunV5DsXcOGN+btWeV0JXIO2FIzCpO3HQymRpntZHJ1CjGrpwd4h0t2CfC4xSQKDNA6HZ2Z/BTQT4DKe9SeJzKshOLkcnUAKNvyHQ6+cJEjIz2CccSKMHz5uP25i/ENKmFAse2BDDitZiPO5G/kOC0FippdCoUvl9vjtZ03jJhDHcsAxRq10oQgRSeVkwDSuiHEpwCwQ/A2L11tH9TxRBRjA9y1w2mARB6DYI/g9+YUg0j7kbriUDKOwiMf4DxixqiveHvW/wXm5Vgf5YM3rWeiBJ8ZJzy+j96k3jY6H5lPxHGl1q2aSixe/FcIycOVAyR5QBCD4u59kA5iWyTxP4Y4yFgepK9/GFc54SKI6IYx+ffFvQtlsTjUXVBOYk0Mp1SSTqjmB7rnGKiVndF+0jDcP9OQ2Y2lvT2VSwRDRB8ahLjNcdaIj09a7LZHMf/9xfFdF/rjgnesjyP0Gggn3L3LDkv9NyE4JN2X1GE7pnM/rZJ3ObchOvWLZj7qp/TVhPZ9bFvLTBh8NUFp4IdYOzRxhvf+KXzShTdsOrO7vv1SuiGLucoxu9K8Lc+cvoeFku6O6KqBZuiVjGAyESsfOpS4URsKj6owTetkYnosqVjCRqTdCEyEe2s9hXoKAKRbDW8q6RG5mNPyruz0KYoO6Lf3nPBdaI8RezagIR+x2hbou8IdubaCox+ULYc8VqiPozyjk4jXktMsF0xDZq1NZGOCETmK42K6QgIjS3c2lUeY8DYFqnSuLj2C76/IWi8CPWCUDokWpqB02aNuC6ih3eyMPwWVvtlemZb+I0Jthui8byFgsanXeG3doG/dOQtp7tCYdHAsvCb1rfrgoR1J1W/ra0JvxLY0hZJj+6kBgrKHX5FN2TxclF6dSdVNyHLGH7TkXdiKZ8JkmM2JE6WOvyq7Bpx7dgF+0QVVTgrir//6kqzIqV+owAAAABJRU5ErkJggg==",
      content: "Como futuro desenvolvedor full stack, meu objetivo principal é me consolidar como um profissional de destaque na área de tecnologia. Quero contribuir para a criação de projetos inovadores e impactantes que possam transformar positivamente a vida das pessoas. Sou movido pela paixão por tecnologia e pelo desejo constante de aprendizado, o que me impulsiona a estar sempre atualizado com as tendências do setor. Além disso, pretendo construir uma carreira sólida, baseada na entrega de resultados de qualidade e no fortalecimento de relações profissionais de confiança. Meu foco é crescer junto com as empresas e projetos aos quais me dedico, fazendo a diferença através do meu trabalho."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="compe" className="relative 0 py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-pulse-slow absolute top-20 left-10 h-96 w-96 rounded-full bg-[#19D1C2]/10 blur-3xl"></div>
        <div className="animate-pulse-slow absolute right-10 bottom-40 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 bg-gradient-to-r from-[#19D1C2] to-[#19d1a9] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Minhas Competências
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-[#19D1C2] to-[#19d1a9]"></div>
          <p className="mt-6 text-lg text-gray-300">
            Conheça as habilidades e objetivos que me definem como profissional
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 flex flex-wrap justify-center gap-4"
          >
            {competencias.map((competencia, index) => (
              <motion.button
                key={index}
                variants={itemVariants}
                className={`relative flex items-center gap-3 rounded-full border px-6 py-3 text-lg font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "border-[#19D1C2] bg-[#19D1C2]/20 text-white"
                    : "border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-500 hover:bg-gray-800 hover:text-gray-200"
                }`}
                onClick={() => setActiveTab(index)}
              >
                <div className="relative h-8 w-8">
                  <Image 
                    src={competencia.icon} 
                    alt={competencia.title} 
                    width={32}
                    height={32}
                    className="h-full w-full object-contain" 
                  />
                </div>
                <span>{competencia.title}</span>
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full border border-[#19D1C2] shadow-[0_0_10px_rgba(25,209,194,0.5)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#19D1C2] to-[#19d1a9] p-3 shadow-lg">
                    <Image 
                      src={competencias[activeTab].icon} 
                      alt={competencias[activeTab].title} 
                      width={32}
                      height={32}
                      className="h-8 w-8" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {competencias[activeTab].title}
                  </h3>
                </div>
                
                <div className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300">
                  <p className="leading-relaxed">{competencias[activeTab].content}</p>
                </div>
                
                {/* Indicadores de posição */}
                <div className="mt-10 flex justify-center gap-2">
                  {competencias.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`h-2 w-10 rounded-full transition-all duration-300 ${
                        activeTab === index 
                          ? "bg-gradient-to-r from-[#19D1C2] to-[#19d1a9]" 
                          : "bg-gray-700 hover:bg-gray-500"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}