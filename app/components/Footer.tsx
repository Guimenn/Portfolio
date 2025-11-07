"use client";
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCode } from 'react-icons/fa';

export default function Footer() {
    const socialLinks = [
        { icon: <FaGithub size={20} />, href: "https://github.com/guimenn", label: "GitHub" },
        { icon: <FaLinkedin size={20} />, href: "https://linkedin.com/in/guilhermemen", label: "LinkedIn" },
        { icon: <FaEnvelope size={20} />, href: "mailto:men.guilherme5@gmail.com", label: "Email" }
    ];

    // Valores fixos para partículas - evitar problemas de hidratação
    const particles = useMemo(() => {
        return [
            { left: 22.9118, top: 79.5344, duration: 4.2, delay: 0.3 },
            { left: 40.1445, top: 84.5797, duration: 4.8, delay: 0.8 },
            { left: 22.8744, top: 13.1449, duration: 3.5, delay: 0.1 },
            { left: 69.3330, top: 52.8904, duration: 5.1, delay: 1.2 },
            { left: 78.2309, top: 73.5152, duration: 4.6, delay: 0.5 },
            { left: 33.2123, top: 45.6789, duration: 3.9, delay: 0.9 },
            { left: 54.7498, top: 34.8279, duration: 4.4, delay: 0.2 },
            { left: 32.8672, top: 25.4767, duration: 5.3, delay: 0.7 },
            { left: 88.6223, top: 1.9292, duration: 3.7, delay: 1.1 },
            { left: 19.2151, top: 39.9116, duration: 4.9, delay: 0.4 },
            { left: 95.8884, top: 58.3958, duration: 4.1, delay: 0.6 },
            { left: 68.7722, top: 3.9144, duration: 5.2, delay: 1.0 },
            { left: 69.6793, top: 97.497, duration: 3.8, delay: 0.3 },
            { left: 16.7810, top: 37.0205, duration: 4.7, delay: 0.8 },
            { left: 23.0424, top: 25.3216, duration: 4.3, delay: 0.1 },
            { left: 45.6789, top: 67.2345, duration: 5.0, delay: 1.3 },
            { left: 12.3456, top: 89.0123, duration: 3.6, delay: 0.5 },
            { left: 87.6543, top: 23.4567, duration: 4.5, delay: 0.9 },
            { left: 56.7890, top: 45.6789, duration: 5.4, delay: 0.2 },
            { left: 34.5678, top: 78.9012, duration: 4.0, delay: 0.7 },
        ];
    }, []);

    return (
        <footer className="relative bg-gradient-to-t from-gray-950 via-gray-900 to-gray-950 border-t-2 border-gray-800/50 py-12 overflow-hidden">
            {/* Partículas de fundo - valores fixos para evitar problemas de hidratação */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#19D1C2] rounded-full opacity-20"
                        style={{
                            left: `${particle.left}%`,
                            top: `${particle.top}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex justify-between items-center flex-col md:flex-row gap-8 mb-8">
                    {/* Coluna 1 - Marca */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center md:text-left"
                    >
                        <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                            <FaCode className="text-[#19D1C2] text-2xl" />
                            <h3 className="text-xl font-bold text-white">Guimen</h3>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Desenvolvedor Full Stack criando experiências web incríveis
                        </p>
                    </motion.div>

                   

                    {/* Coluna 3 - Redes Sociais */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-center md:text-right"
                    >
                        <h4 className="text-white font-semibold mb-3">Me Acompanha Aí!</h4>
                        <div className="flex gap-3 justify-center md:justify-end">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-lg bg-gray-800/50 border-2 border-gray-700/50 flex items-center justify-center text-gray-400 hover:text-[#19D1C2] hover:border-[#19D1C2]/50 hover:bg-[#19D1C2]/10 transition-all duration-300"
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Divisor */}
                <div className="border-t border-gray-800/50 pt-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400"
                    >
                        <p className="flex items-center gap-2">
                            Feito com <FaHeart className="text-red-500 animate-pulse" /> por Guilherme Men
                        </p>
                        <p>
                            &copy; {new Date().getFullYear()} Todos os direitos reservados
                        </p>
                    </motion.div>
                </div>
            </div>
        </footer>
    )
};