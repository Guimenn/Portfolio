import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCalendar, FaCode, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectItemProps {
  title: string;
  description: string;
  technologies: string[];
  year: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  technologies,
  year,
  isActive = false,
  onClick,
  className = ''
}) => {
  return (
    <motion.div
      className={`
        ${className}
        flip-card-front
        relative group cursor-pointer
        bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80
        border border-gray-700/50 hover:border-[#19D1C2]/30
        rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:shadow-[#19D1C2]/20
        transition-all duration-500 ease-out
        backdrop-blur-xl
        overflow-hidden
        ${isActive ? 'ring-2 ring-[#19D1C2]/30 scale-105' : ''}
        ${onClick ? 'hover:scale-105' : ''}
      `}
      onClick={onClick}
      whileHover={{ 
        y: isActive ? 0 : -5,
        boxShadow: isActive 
          ? "0 25px 50px -12px rgba(25, 209, 194, 0.4)" 
          : "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        duration: 0.3 
      }}
      role={onClick ? "button" : "article"}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Selecionar projeto ${title}` : undefined}
    >
      {/* Glass overlay para profundidade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
      
      {/* Header com título e ano */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-[#19D1C2] transition-colors duration-300 line-clamp-1">
          {title}
        </h3>
        <motion.span
          className="px-2 py-1 text-xs font-medium rounded-full bg-[#19D1C2]/20 text-[#19D1C2] flex items-center gap-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
        >
          <FaCalendar className="h-3 w-3" />
          {year}
        </motion.span>
      </div>

      {/* Descrição */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3 relative z-10">
        {description}
      </p>

      {/* Tecnologias - horizontal scroll on hover */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-4">
        {technologies.slice(0, 4).map((tech, index) => (
          <motion.span
            key={index}
            className="px-3 py-1 bg-gray-800/50 hover:bg-[#19D1C2]/20 text-xs font-medium text-gray-300 hover:text-[#19D1C2] rounded-full transition-all duration-300 border border-gray-600/50 hover:border-[#19D1C2]/30"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05, type: "spring" }}
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0 4px 12px rgba(25, 209, 194, 0.3)",
              backgroundColor: "rgba(25, 209, 194, 0.15)"
            }}
          >
            {tech}
          </motion.span>
        ))}
        {technologies.length > 4 && (
          <motion.span
            className="px-3 py-1 bg-gray-800/50 text-xs font-medium text-gray-400 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.1 }}
          >
            +{technologies.length - 4}
          </motion.span>
        )}
      </div>

      {/* Footer com indicadores visuais */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-gray-700/30">
        {/* Indicador de seleção */}
        <motion.div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isActive 
              ? 'bg-[#19D1C2] scale-125 shadow-lg shadow-[#19D1C2]/50 animate-pulse' 
              : 'bg-gray-600/50 hover:bg-gray-500/50'
          }`}
          initial={{ scale: 0 }}
          animate={{ scale: isActive ? 1.25 : 1 }}
          transition={{ type: "spring", stiffness: 400 }}
        />

        {/* Action indicator */}
        {onClick && (
          <motion.div
            className="flex items-center gap-2 text-gray-400 group-hover:text-[#19D1C2] transition-colors"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <FaExternalLinkAlt className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            <span className="text-xs font-medium">Explorar</span>
          </motion.div>
        )}

        {/* Progress bar para indicar posição na lista */}
        <motion.div
          className="w-8 h-1 bg-gray-700/50 rounded-full overflow-hidden"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div 
            className="h-full bg-gradient-to-r from-[#19D1C2] to-[#087e74] rounded-full"
            style={{ 
              width: `${Math.random() * 80 + 20}%`,
              transition: 'width 0.3s ease' 
            }}
          />
        </motion.div>
      </div>

      {/* Hover overlay com efeito glass */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#19D1C2]/5 via-transparent to-transparent 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#19D1C2] rounded-full opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
              animationDelay: `${i * 0.1}s`
            }}
            initial={{ 
              scale: 0, 
              y: 20,
              opacity: 0 
            }}
            whileHover={{ 
              scale: 2, 
              y: -10,
              opacity: 0.8 
            }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 15 
            }}
          />
        ))}
      </motion.div>

      {/* 3D transform container para flip effect */}
      <div className="absolute inset-0 transform-3d">
        {/* Front face */}
        <div className="absolute inset-0 backface-visibility: hidden">
          {/* Content já está aqui */}
        </div>
        
        {/* Back face - será sobreposto pelo container principal */}
        <div className="absolute inset-0 backface-visibility: hidden rotate-3d-y-180">
          {/* Back content será renderizado no Projects.tsx */}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectItem;
