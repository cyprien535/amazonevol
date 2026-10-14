import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number; // How far the button moves with mouse (e.g., 0.25)
  showShimmer?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  title?: string;
  'aria-label'?: string;
}

export default function MagneticButton({
  children,
  strength = 0.3,
  showShimmer = true,
  className = '',
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for physical displacement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Elastic spring physics for tactile suction feel
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden cursor-pointer active:scale-95 transition-shadow duration-300 ${className}`}
      {...(props as any)}
    >
      {/* Shimmer Light Beam sweep effect */}
      {showShimmer && (
        <span
          className={`pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] ${
            isHovered ? 'translate-x-[200%]' : ''
          }`}
        />
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
