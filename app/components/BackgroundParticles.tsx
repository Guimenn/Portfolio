"use client";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import React, { useMemo, useState, useEffect } from "react";

export default function BackgroundParticles() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    // Verificar se é mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      // Só renderizar em desktop e após um pequeno delay para não bloquear o carregamento inicial
      if (!mobile && !shouldRender) {
        timer = setTimeout(() => setShouldRender(true), 500);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (timer) clearTimeout(timer);
    };
  }, [shouldRender]);

  const positions = useMemo(() => {
    // Reduzir número de partículas para melhor performance
    const arr = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  // Não renderizar em mobile
  if (isMobile || !shouldRender) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      width: '100vw',
      height: '100vh',
      opacity: 0.22,
      overflow: 'hidden',
    }} aria-hidden>
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }} 
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]} // Limitar DPR para melhor performance
        performance={{ min: 0.5 }} // Reduzir qualidade quando necessário
      >
        <ambientLight intensity={0.21} />
        <pointLight position={[8, 10, 7]} color="#19D1C2" intensity={0.5} />
        {/* Geometrias flutuantes - reduzir complexidade */}
        <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.23}>
          <mesh position={[-2, 0, 0]}>
            <torusKnotGeometry args={[0.5, 0.15, 50, 8]} />
            <meshStandardMaterial color="#19D1C2" emissive="#19D1C2" emissiveIntensity={0.09} />
          </mesh>
        </Float>
        <Float speed={0.92} rotationIntensity={0.13} floatIntensity={0.17}>
          <mesh position={[2, 1, -1]}>
            <dodecahedronGeometry args={[0.8]} />
            <meshStandardMaterial color="#19D1C2" wireframe emissive="#19D1C2" emissiveIntensity={0.05} />
          </mesh>
        </Float>
        {/* Partículas */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial color="#19D1C2" size={0.05} transparent opacity={0.17} />
        </points>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
