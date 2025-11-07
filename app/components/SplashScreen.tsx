'use client';

import { useEffect, useState } from 'react';
import '../globals.css'; // Assuming styles are in globals.css

export default function SplashScreen() {
  const [particles, setParticles] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    // Create particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      style: {
        width: Math.random() * 5 + 2 + 'px',
        height: Math.random() * 5 + 2 + 'px',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animationDelay: Math.random() * 15 + 's',
      },
    }));
    setParticles(newParticles);

    const splashScreen = document.querySelector(".splash-screen") as HTMLElement | null;
    const content = document.querySelector(".main-content") as HTMLElement | null; // Target the main content wrapper

    if (!splashScreen || !content) return;

    const hideSplashScreen = () => {
      if (splashScreen) {
        splashScreen.classList.add("up");
      }
      
      // Libera o scroll do body
      document.body.classList.add("loaded");

      // Delay showing content until splash screen animation is partway through
      setTimeout(() => {
        if (content) {
            content.classList.add("show");
        }
         // Hide splash screen completely after animation
         setTimeout(() => {
            if (splashScreen) {
                splashScreen.style.display = 'none';
            }
        }, 500); // Matches the slideUp animation duration
      }, 1000); // Start fading in content slightly before splash is fully gone
    };

    // Total time splash screen is visible before starting slide up
    const splashTimer = setTimeout(() => {
      hideSplashScreen();
    }, 3500);

    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <div className="splash-screen">
      {/* Decorative background elements (similar to Hero) */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="animate-pulse-slow absolute top-20 left-10 h-72 w-72 rounded-full bg-[#19D1C2]/15 blur-3xl filter"></div>
        <div className="animate-pulse-slow absolute right-10 bottom-20 h-96 w-96 rounded-full bg-purple-600/15 blur-3xl filter"></div>
        <div className="animate-pulse-slow absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl filter"></div>
      </div>

      {/* Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={particle.style}
        />
      ))}

      {/* SVG centered on top - Widened viewBox and adjusted x */}
      <svg className="drawing z-10" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg">
        <text x="20" y="100" className="text-path">GUIMEN</text>
      </svg>
    </div>
  );
} 