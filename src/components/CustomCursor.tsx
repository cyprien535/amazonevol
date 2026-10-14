import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for magnetic trailing effect
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 40, stiffness: 600, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Detect touch-only devices to avoid showing custom cursor on phones/tablets
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, select, textarea, [role="button"], [data-cursor-hover]');
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Ambient Spotlight halo that glides under the cursor */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-40 rounded-full blur-3xl opacity-25 mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 280 : 180,
          height: isHovered ? 280 : 180,
          background: 'radial-gradient(circle, rgba(14,165,233,0.35) 0%, rgba(245,158,11,0.15) 45%, transparent 70%)',
          transition: 'width 0.3s ease-out, height 0.3s ease-out',
        }}
      />

      {/* Outer interactive ring with spring physics */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-sky-400/80 bg-sky-400/10 backdrop-blur-[0.5px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 48 : isClicking ? 20 : 28,
          height: isHovered ? 48 : isClicking ? 20 : 28,
          scale: isClicking ? 0.85 : 1,
          borderColor: isHovered ? 'rgba(245, 158, 11, 0.9)' : 'rgba(56, 189, 248, 0.75)',
          backgroundColor: isHovered ? 'rgba(245, 158, 11, 0.12)' : 'rgba(56, 189, 248, 0.08)',
          boxShadow: isHovered ? '0 0 16px rgba(245, 158, 11, 0.4)' : '0 0 10px rgba(56, 189, 248, 0.25)',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, border-color 0.2s',
        }}
      />

      {/* Center pinpoint precision dot */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-brand-yellow shadow-sm"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
          opacity: isHovered ? 0.9 : 0.7,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
        }}
      />
    </>
  );
}
