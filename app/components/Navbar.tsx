'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaHome, FaUser, FaProjectDiagram, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Mostrar navbar quando scrollar para cima (scrollup)
          if (currentScrollY < lastScrollY.current) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false);
          }

          // Sempre mostrar navbar no topo da página
          if (currentScrollY <= 10) {
            setIsVisible(true);
          }

          // Atualizar estado de scroll para efeitos visuais
          setScrolled(currentScrollY > 50);
          
          // Atualizar última posição do scroll
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  const navItems = [
    { href: '#', label: 'Home', icon: <FaHome />, ariaCurrent: 'page' as const },
    { href: '#tech', label: 'Tecnologias', icon: <FaCode /> },
    { href: '#compe', label: 'Competências', icon: <FaUser /> },
    { href: '#projeto', label: 'Projetos', icon: <FaProjectDiagram /> },
    { href: '#about-section', label: 'Sobre', icon: <FaUser /> },
    { href: '#contato', label: 'Contato', icon: <FaEnvelope /> },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ 
        y: mounted ? (isVisible ? 0 : -100) : 0,
        opacity: mounted ? (isVisible ? 1 : 0) : 1
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled ? 'bg-gray-900/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-2"
          >
            <FaCode className="text-3xl text-[#19D1C2] animate-pulse" />
            <span className="text-xl font-bold text-[#19D1C2] animate-pulse">Guimen</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href={item.href}
                  className={`relative group flex items-center space-x-2 text-lg font-medium transition-colors duration-300 ${
                    activeLink === item.href ? 'text-[#19D1C2]' : 'text-gray-300 hover:text-[#19D1C2]'
                  }`}
                  onClick={() => setActiveLink(item.href)}
                  aria-current={item.ariaCurrent}
                >
                  <span className="text-[#19D1C2] group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-[#19D1C2]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeLink === item.href ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-[#19D1C2] focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <motion.div
                    key={item.href}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                        activeLink === item.href
                          ? 'bg-[#19D1C2]/10 text-[#19D1C2]'
                          : 'text-gray-300 hover:bg-[#19D1C2]/10 hover:text-[#19D1C2]'
                      }`}
                      onClick={() => {
                        setActiveLink(item.href);
                        setIsOpen(false);
                      }}
                      aria-current={item.ariaCurrent}
                    >
                      <span className="text-[#19D1C2]">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glowing background effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#19D1C2]/5 to-transparent opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#19D1C2]/10 via-transparent to-transparent" />
      </div>
    </motion.nav>
  );
} 