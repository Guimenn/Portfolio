'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaCode, FaHome, FaUser, FaProjectDiagram, FaEnvelope, FaBars, FaTimes, FaChevronDown, FaSparkles } from 'react-icons/fa';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  ariaCurrent?: 'page' | undefined;
  subItems?: string[];
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const [isVisible, setIsVisible] = useState(true);
  const [showSubmenu, setShowSubmenu] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  
  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: navRef,
    offset: ["start start", "end start"]
  });

  const navBackground = useTransform(
    scrollYProgress,
    [0, 0.1, 0.3, 1],
    ['rgba(3, 7, 18, 0.1)', 'rgba(3, 7, 18, 0.3)', 'rgba(3, 7, 18, 0.8)', 'rgba(3, 7, 18, 0.95)']
  );

  const navBlur = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    ['blur(0px)', 'blur(10px)', 'blur(20px)']
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Hide/show navbar logic
          if (currentScrollY < lastScrollY.current) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setIsVisible(false);
          }

          if (currentScrollY <= 10) {
            setIsVisible(true);
          }

          setScrolled(currentScrollY > 50);
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Detect active section
  useEffect(() => {
    const sections = ['home', 'tech', 'compe', 'projeto', 'about-section', 'contato'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') || '';
            const sectionKey = sections.find(s => id.includes(s));
            if (sectionKey) {
              setActiveLink(sectionKey);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -20% 0px' }
    );

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navItems: NavItem[] = [
    { 
      href: '#home', 
      label: 'Home', 
      icon: <FaHome />, 
      ariaCurrent: 'page' as const,
      subItems: []
    },
    { 
      href: '#tech', 
      label: 'Tecnologias', 
      icon: <FaCode />,
      subItems: ['React', 'Next.js', 'Node.js']
    },
    { 
      href: '#compe', 
      label: 'Competências', 
      icon: <FaUser />,
      subItems: ['Full Stack', 'UI/UX', 'Performance']
    },
    { 
      href: '#projeto', 
      label: 'Projetos', 
      icon: <FaProjectDiagram />,
      subItems: ['Web Apps', 'APIs', 'Design']
    },
    { 
      href: '#about-section', 
      label: 'Sobre', 
      icon: <FaUser />,
      subItems: []
    },
    { 
      href: '#contato', 
      label: 'Contato', 
      icon: <FaEnvelope />,
      subItems: []
    },
  ];

  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: -20, 
      opacity: 0,
      scale: 0.9,
      rotateX: -90
    },
    visible: (i: number) => ({
      y: 0, 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.05
      }
    })
  };

  const mobileItemVariants = {
    hidden: { 
      x: 50, 
      opacity: 0,
      rotateY: 90
    },
    visible: {
      x: 0, 
      opacity: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const submenuVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: -10,
      rotateX: -90
    },
    visible: {
      opacity: 1, 
      scale: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: -10,
      rotateX: -90,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ 
        y: mounted ? (isVisible ? 0 : -100) : 0,
        opacity: mounted ? (isVisible ? 1 : 0) : 1
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
      className="fixed top-0 left-0 w-full z-50"
      style={{ 
        backgroundColor: scrolled ? navBackground : 'transparent',
        backdropFilter: scrolled ? navBlur : 'blur(0px)'
      }}
    >
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#19D1C2] rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">
          {/* Logo - Enhanced */}
          <motion.div
            whileHover={{ 
              scale: 1.1, 
              rotate: 5,
              transition: { type: "spring", stiffness: 300 }
            }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center space-x-3 group relative z-10"
          >
            {/* Logo background glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#19D1C2]/20 to-[#087e74]/20 blur-xl -z-10"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {/* Main logo */}
            <div className="relative">
              <FaCode 
                className="text-3xl text-[#19D1C2] group-hover:text-white/90 transition-all duration-300 drop-shadow-lg" 
              />
              {/* Orbit animation */}
              <motion.div
                className="absolute -inset-2 rounded-full border border-[#19D1C2]/30"
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "linear",
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
            </div>
            
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-[#19D1C2] to-white bg-clip-text text-transparent group-hover:scale-110 transition-all duration-300"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Guimen
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-1 relative"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                className="relative group"
                custom={index}
                variants={itemVariants}
              >
                {/* Main nav item */}
                <Link
                  href={item.href}
                  className={`
                    relative flex items-center space-x-2 px-4 py-3 rounded-xl text-base font-medium transition-all duration-500 ease-out
                    ${activeLink === item.href.replace('#', '') 
                      ? 'text-[#19D1C2] bg-[#19D1C2]/10' 
                      : 'text-gray-300 hover:text-white/80'
                    }
                    group-hover:bg-[#19D1C2]/5
                  `}
                  onClick={() => {
                    setActiveLink(item.href.replace('#', ''));
                    setShowSubmenu(null);
                  }}
                  aria-current={item.ariaCurrent}
                  scroll={true}
                >
                  {/* Icon with 3D hover */}
                  <motion.div
                    className="relative flex-shrink-0"
                    whileHover={{ rotateY: 180, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="absolute inset-0 rounded-full bg-[#19D1C2]/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10" />
                    <span className={`
                      text-lg transition-all duration-300
                      ${activeLink === item.href.replace('#', '') ? 'text-[#19D1C2] drop-shadow-lg' : 'text-gray-300 group-hover:text-[#19D1C2]'}
                    `}>
                      {item.icon}
                    </span>
                  </motion.div>

                  <span className="relative">{item.label}</span>

                  {/* Active indicator */}
                  {activeLink === item.href.replace('#', '') && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#19D1C2] to-[#087e74] rounded-t-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#19D1C2]/10 opacity-0 group-hover:opacity-100 transition-opacity blur"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Submenu indicator */}
                  {item.subItems && item.subItems.length > 0 && (
                    <motion.div
                      className="ml-1 relative"
                      animate={{ rotateX: showSubmenu === item.href ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="h-4 w-4 transition-transform duration-300" />
                    </motion.div>
                  )}
                </Link>

                {/* Submenu */}
                <AnimatePresence>
                  {showSubmenu === item.href && item.subItems && item.subItems.length > 0 && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl shadow-[#19D1C2]/10 z-50 overflow-hidden"
                      variants={submenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      style={{ originY: 0 }}
                    >
                      <div className="py-1">
                        {item.subItems.map((subItem, subIndex) => (
                          <motion.a
                            key={subItem}
                            href="#"
                            className="block px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-[#19D1C2]/10 transition-all duration-200 flex items-center gap-3"
                            whileHover={{ x: 4, backgroundColor: "rgba(25, 209, 194, 0.1)" }}
                            onHoverStart={() => setShowSubmenu(null)}
                          >
                            <motion.span
                              className="w-2 h-2 bg-[#19D1C2] rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: subIndex * 0.05 }}
                            />
                            {subItem}
                          </motion.a>
                        ))}
                      </div>
                      {/* Submenu glow border */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#19D1C2]/20 rounded-xl -z-10"
                        animate={{ 
                          scaleX: [1, 1.02, 1],
                          opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submenu arrow */}
                {showSubmenu === item.href && (
                  <motion.div
                    className="absolute top-full left-4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-[#19D1C2]/20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop CTA Button */}
          <motion.div
            className="hidden lg:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.a
              href="#contato"
              className="relative px-6 py-3 bg-gradient-to-r from-[#19D1C2] to-[#087e74] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#19D1C2]/40 transition-all duration-300 overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 15px 35px rgba(25, 209, 194, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Vamos Conversar
                <FaSparkles className="h-4 w-4" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.a>
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden relative z-10 p-2 text-[#19D1C2] rounded-lg hover:bg-[#19D1C2]/10 transition-all duration-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ 
                opacity: 1, 
                height: "auto", 
                clipPath: "inset(0 0 0 0)",
                backgroundColor: "rgba(3, 7, 18, 0.98)"
              }}
              exit={{ 
                opacity: 0, 
                height: 0, 
                clipPath: "inset(0 0 0 100%)" 
              }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.46, 0.45, 0.94],
                clipPath: {
                  duration: 0.4,
                  ease: "easeInOut"
                }
              }}
              className="md:hidden overflow-hidden relative"
              style={{ 
                backdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(25, 209, 194, 0.1)"
              }}
            >
              <motion.div
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                className="px-4 pt-4 pb-6 space-y-2"
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    className="relative group"
                    custom={index}
                    variants={mobileItemVariants}
                  >
                    <Link
                      href={item.href}
                      className={`
                        flex items-center space-x-4 px-4 py-4 rounded-xl text-base font-medium transition-all duration-300
                        ${activeLink === item.href.replace('#', '') 
                          ? 'bg-[#19D1C2]/20 text-[#19D1C2] border-r-4 border-[#19D1C2]' 
                          : 'text-gray-300 hover:text-white hover:bg-[#19D1C2]/10'
                        }
                        group w-full
                      `}
                      onClick={() => {
                        setActiveLink(item.href.replace('#', ''));
                        setIsOpen(false);
                        setShowSubmenu(null);
                      }}
                      scroll={true}
                    >
                      <motion.span 
                        className={`
                          flex-shrink-0 w-10 h-10 rounded-lg bg-[#19D1C2]/10 flex items-center justify-center
                          ${activeLink === item.href.replace('#', '') ? 'bg-[#19D1C2]/20 shadow-lg shadow-[#19D1C2]/20' : ''}
                          transition-all duration-300
                        `}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.icon}
                      </motion.span>
                      
                      <div className="flex-1 min-w-0">
                        <span className="block font-medium">{item.label}</span>
                        {activeLink === item.href.replace('#', '') && (
                          <motion.div
                            className="h-0.5 bg-gradient-to-r from-[#19D1C2] to-[#087e74] rounded-full mt-1 w-full"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                          />
                        )}
                      </div>

                      {/* Mobile submenu indicator */}
                      {item.subItems && item.subItems.length > 0 && (
                        <motion.div
                          className="ml-auto relative"
                          animate={{ rotate: showSubmenu === item.href ? 180 : 0 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setShowSubmenu(showSubmenu === item.href ? null : item.href);
                          }}
                        >
                          <FaChevronDown className="h-5 w-5 text-gray-400 group-hover:text-[#19D1C2] transition-colors" />
                        </motion.div>
                      )}
                    </Link>

                    {/* Mobile submenu */}
                    <AnimatePresence>
                      {showSubmenu === item.href && item.subItems && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, y: -10 }}
                          animate={{ height: "auto", opacity: 1, y: 0 }}
                          exit={{ height: 0, opacity: 0, y: -10 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="ml-12 mt-2 space-y-1 overflow-hidden"
                        >
                          {item.subItems.map((subItem, subIndex) => (
                            <motion.a
                              key={subItem}
                              href="#"
                              className="block py-2 pl-4 pr-6 text-sm text-gray-400 hover:text-white hover:bg-[#19D1C2]/10 rounded-r-lg transition-all duration-200 flex items-center gap-2"
                              whileHover={{ x: 4, scale: 1.02 }}
                              initial={{ x: 20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: subIndex * 0.05 }}
                              onClick={() => setIsOpen(false)}
                            >
                              <motion.div
                                className="w-1.5 h-1.5 bg-[#19D1C2]/50 rounded-full"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: subIndex * 0.05 + 0.1 }}
                              />
                              {subItem}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mobile CTA */}
              <motion.div
                className="pt-4 pb-2 px-4 border-t border-gray-700/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href="#contato"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#19D1C2] to-[#087e74] text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#19D1C2]/40 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(false)}
                >
                  <FaSparkles className="h-5 w-5" />
                  Iniciar Conversa
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed right-6 bottom-24 w-2 h-2 rounded-full bg-[#19D1C2]/30 z-40"
        style={{ 
          opacity: scrolled ? 1 : 0,
          scale: scrolled ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 w-full rounded-full bg-gradient-to-b from-[#19D1C2] to-[#087e74] shadow-lg"
          style={{ 
            scaleY: scrollYProgress,
            originY: 1
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300,
            damping: 30
          }}
        />
      </motion.div>

      {/* Floating social links */}
      <motion.div
        className="fixed right-6 bottom-6 flex flex-col items-end space-y-3 z-40"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: scrolled ? 1 : 0, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {[
          { icon: <FaCode className="h-6 w-6 text-[#19D1C2]" />, href: "https://github.com/guimenn", label: "GitHub" },
          { icon: <FaUser className="h-6 w-6 text-[#19D1C2]" />, href: "https://linkedin.com/in/guimenn", label: "LinkedIn" },
          { icon: <FaEnvelope className="h-6 w-6 text-[#19D1C2]" />, href: "mailto:men.guilherme5@gmail.com", label: "Email" }
        ].map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-3 rounded-full bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 hover:border-[#19D1C2]/30 transition-all duration-300 shadow-lg hover:shadow-[#19D1C2]/20"
            whileHover={{ 
              scale: 1.15, 
              y: -5,
              rotateY: 180,
              boxShadow: "0 10px 25px rgba(25, 209, 194, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
            aria-label={`Conectar no ${social.label}`}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#19D1C2]/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm -z-10"
            />
            {social.icon}
            <motion.span
              className="absolute right-full mr-2 px-2 py-1 bg-gray-900/95 text-xs text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap"
              initial={{ x: 10 }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {social.label}
            </motion.span>
            <motion.span className="absolute left-full ml-2 px-2 py-1 bg-gray-900/95 text-xs text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
              {social.label}
            </motion.span>
          </motion.a>
        ))}
      </motion.div>
    </motion.nav>
  );
} 