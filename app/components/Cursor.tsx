'use client';
import { useEffect, useState, useRef } from 'react';
import {
    Cursor,
    CursorBody,
    CursorName,
    CursorPointer,
} from '@/components/ui/shadcn-io/cursor';

const CursorComponent = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const rafId = useRef<number | null>(null);
    const lastPosition = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = () => {
            setPosition(lastPosition.current);
            rafId.current = null;
        };

        const handleMouseMove = (e: MouseEvent) => {
            lastPosition.current = { x: e.clientX, y: e.clientY };
            setIsVisible(true);

            // Usar requestAnimationFrame para otimizar atualizações
            if (rafId.current === null) {
                rafId.current = requestAnimationFrame(updatePosition);
            }
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        // Garantir que estamos no cliente antes de modificar o DOM
        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', handleMouseMove, { passive: true });
            document.addEventListener('mouseenter', handleMouseEnter);
            document.addEventListener('mouseleave', handleMouseLeave);

            // Esconder cursor padrão quando o componente estiver montado
            // Usar setTimeout para garantir que a hidratação já aconteceu
            const timer = setTimeout(() => {
                if (document.body) {
                    document.body.style.cursor = 'none';
                }
            }, 0);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseenter', handleMouseEnter);
                document.removeEventListener('mouseleave', handleMouseLeave);
                if (rafId.current !== null) {
                    cancelAnimationFrame(rafId.current);
                }
                // Restaurar cursor padrão ao desmontar
                if (document.body) {
                    document.body.style.cursor = 'auto';
                }
            };
        }
        
        return () => {
            if (rafId.current !== null) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    return (
        <Cursor
            className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-10px, -10px)',
            }}
        >
            <CursorPointer
                className="text-[#19D1C2]"
                style={{
                    filter: 'drop-shadow(0 0 8px rgba(25, 209, 194, 0.8))',
                }}
            />
            <CursorBody
                className="bg-[#0f172a] border border-[#19D1C2] text-white shadow-[0_0_15px_rgba(25,209,194,0.5)]"
                style={{
                    backdropFilter: 'blur(10px)',
                }}
            >
                <CursorName className="text-[#19D1C2] font-semibold">Você</CursorName>
            </CursorBody>
        </Cursor>
    );
};

export default CursorComponent;
