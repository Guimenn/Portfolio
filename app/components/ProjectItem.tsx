import React from 'react';
import { motion } from 'framer-motion';
import styles from './styles/Projects.module.css';

interface ProjectItemProps {
  title: string;
  description?: string;
  technologies?: string[];
  year?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export default function ProjectItem({ 
  title, 
  description, 
  technologies = [],
  year,
  isActive = false,
  onClick 
}: ProjectItemProps) {
  return (
    <motion.li 
      className={`${styles.projectItem} rounded-xl border ${isActive 
        ? 'border-[#19D1C2] shadow-lg shadow-[#19D1C2]/20 bg-gray-800/90' 
        : 'border-gray-800 bg-gray-900/80'} p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#19D1C2]/50 hover:shadow-lg hover:shadow-[#19D1C2]/20 cursor-pointer relative overflow-hidden group`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Glowing border effect */}
      <span className={`${styles.glowBorder} absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></span>
      
      {/* Selection indicator */}
      {isActive && (
        <motion.span 
          layoutId="activeIndicator"
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#19D1C2] to-[#087e74]"
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 0.3 }}
        ></motion.span>
      )}
      
      <div className="flex flex-col gap-3 relative">
        <div className="flex justify-between items-start gap-2">
          <h3 className={`${styles.highlightText} text-xl font-bold ${isActive ? 'text-[#19D1C2]' : 'text-white'} group-hover:text-[#19D1C2] transition-colors`}>
            {title}
          </h3>
          
          {year && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300">
              {year}
            </span>
          )}
        </div>
        
        {isActive && (
          <motion.span 
            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#19D1C2] text-gray-900"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Selecionado
          </motion.span>
        )}
        
        {description && (
          <p className="text-sm text-gray-300 line-clamp-2">{description}</p>
        )}
        
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className={`${styles.techBadge} inline-block px-2 py-0.5 text-xs font-medium rounded bg-gray-800 text-gray-300 transition-all duration-300`}>
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="inline-block px-2 py-0.5 text-xs font-medium rounded bg-gray-800 text-gray-300">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        )}
        
        {/* Interactive elements for visual appeal */}
        <motion.div 
          className="absolute right-0 bottom-0 w-16 h-16 opacity-10"
          initial={{ rotate: 0 }}
          animate={{ rotate: isActive ? 90 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#19D1C2]">
            <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>
    </motion.li>
  );
}
