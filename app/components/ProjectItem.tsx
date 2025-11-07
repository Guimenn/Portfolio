import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCalendar, FaCode, FaExternalLinkAlt, FaStar } from 'react-icons/fa';

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
        relative group cursor-none
        bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90
        border-2 border-gray-700/50 hover:border-[#19D1C2]/50
        rounded-2xl p-6 shadow-xl
        transition-all duration-300 ease-out
        backdrop-blur-xl
        overflow-hidden
        ${isActive ? 'border-[#19D1C2] shadow-2xl shadow-[#19D1C2]/30 bg-gradient-to-br from-gray-900 via-gray-800/90 to-[#19D1C2]/10' : ''}
      `}
      onClick={onClick}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.98 }}
      role={onClick ? "button" : "article"}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `Selecionar projeto ${title}` : undefined}
    >
      {/* Brilho suave de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#19D1C2]/5 via-transparent to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
      
      {/* Ícone de destaque para projeto ativo */}
      {isActive && (
        <motion.div
          className="absolute top-4 right-4 z-20"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative">
            <FaStar className="w-5 h-5 text-[#19D1C2] drop-shadow-lg" />
            <motion.div
              className="absolute inset-0 rounded-full bg-[#19D1C2]/30 blur-md"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
      
      {/* Header com título e ano */}
      <div className="relative z-10 flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-white group-hover:text-[#19D1C2] transition-colors duration-300 flex-1 pr-2">
          {title}
        </h3>
        <motion.span
          className="flex-shrink-0 px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#19D1C2]/20 text-[#19D1C2] border border-[#19D1C2]/30"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(25, 209, 194, 0.3)" }}
        >
          {year}
        </motion.span>
      </div>

      {/* Descrição */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2 relative z-10">
        {description}
      </p>

      {/* Tecnologias - sem flip, apenas hover */}
      <div className="relative z-10 flex flex-wrap gap-2 mb-4">
        {technologies.slice(0, 3).map((tech, index) => (
          <motion.span
            key={index}
            className="px-2.5 py-1 bg-gray-800/60 text-xs font-medium text-gray-300 rounded-lg border border-gray-700/50 hover:border-[#19D1C2]/50 hover:bg-[#19D1C2]/10 hover:text-[#19D1C2] transition-all duration-200"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {tech}
          </motion.span>
        ))}
        {technologies.length > 3 && (
          <motion.span
            className="px-2.5 py-1 bg-gray-800/60 text-xs font-medium text-gray-400 rounded-lg border border-gray-700/50"
            whileHover={{ scale: 1.05 }}
          >
            +{technologies.length - 3}
          </motion.span>
        )}
      </div>

      {/* Footer simplificado */}
      <div className="relative z-10 flex items-center justify-between pt-3 border-t border-gray-700/30">
        {/* Indicador de status */}
        <div className="flex items-center gap-2">
          <motion.div
            className={`w-2 h-2 rounded-full ${
              isActive 
                ? 'bg-[#19D1C2] shadow-lg shadow-[#19D1C2]/50' 
                : 'bg-gray-600/50'
            }`}
            animate={isActive ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-gray-400 font-medium">
            {isActive ? 'Selecionado' : 'Clique para ver'}
          </span>
        </div>

        {/* Ícone de ação */}
        <motion.div
          className="text-gray-400 group-hover:text-[#19D1C2] transition-colors"
          whileHover={{ x: 3 }}
        >
          <FaExternalLinkAlt className="h-3.5 w-3.5" />
        </motion.div>
      </div>

      {/* Borda animada no hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-[#19D1C2]/0 group-hover:border-[#19D1C2]/30 transition-all duration-300 pointer-events-none"
        style={{ 
          background: "linear-gradient(135deg, rgba(25, 209, 194, 0.05), transparent)",
        }}
      />
    </motion.div>
  );
};

export default ProjectItem;
