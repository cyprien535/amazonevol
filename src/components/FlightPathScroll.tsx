import React, { useRef, useState, useEffect, useId } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import realPlaneImg from '../assets/images/user_plane_flight.webp';

interface FlightPathScrollProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function FlightPathScroll({ containerRef }: FlightPathScrollProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [planeState, setPlaneState] = useState<{
    x: number;
    y: number;
    angle: number;
    progress: number;
  }>({
    x: 300,
    y: 60,
    angle: 45,
    progress: 0,
  });

  const [containerDimensions, setContainerDimensions] = useState({
    width: 1200,
    height: 4000,
  });

  // Track scroll progress within the middle sections container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 85%'],
  });

  // Smooth scroll spring for silky fluid motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 25,
    restDelta: 0.001,
  });

  // Update container dimensions on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [containerRef]);

  // Synchronize plane position along the curved path
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (progress) => {
      if (!pathRef.current) return;

      const path = pathRef.current;
      const totalLength = path.getTotalLength();
      if (!totalLength) return;

      const clampedProgress = Math.max(0.001, Math.min(0.999, progress));
      const currentLength = clampedProgress * totalLength;
      const deltaLength = 6; // Sampling distance for angle calculation

      const currentPoint = path.getPointAtLength(currentLength);
      const nextPoint = path.getPointAtLength(
        Math.min(totalLength, currentLength + deltaLength)
      );

      // Convert from SVG 1000x4000 coordinate space into container pixels
      const scaleX = containerDimensions.width / 1000;
      const scaleY = containerDimensions.height / 4000;

      const pixelX = currentPoint.x * scaleX;
      const pixelY = currentPoint.y * scaleY;

      const nextPixelX = nextPoint.x * scaleX;
      const nextPixelY = nextPoint.y * scaleY;

      // Calculate tangent flight direction (angle in degrees)
      const dx = nextPixelX - pixelX;
      const dy = nextPixelY - pixelY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      setPlaneState({
        x: pixelX,
        y: pixelY,
        angle: angle + 90, // Airplane SVG faces UP by default
        progress: clampedProgress,
      });
    });

    return () => unsubscribe();
  }, [smoothProgress, containerDimensions]);

  // S-Curve coordinates through the 4 sections
  const pathData =
    'M 280 60 C 150 420, 840 500, 820 900 C 800 1350, 160 1450, 180 1950 C 200 2450, 840 2550, 800 3050 C 760 3550, 500 3750, 500 3960';

  // Contextual flight status label based on progression
  const getFlightStatus = (p: number) => {
    if (p < 0.15) {
      return { code: 'COO', label: 'Décollage · Cotonou Cadjehoun', alt: 'FL040' };
    }
    if (p < 0.45) {
      return { code: 'CRZ', label: 'Croisière · Cap Parakou 350°', alt: 'FL180' };
    }
    if (p < 0.75) {
      return { code: 'ZOU', label: 'Survol Collines / Dassa', alt: 'FL140' };
    }
    if (p < 0.95) {
      return { code: 'PKO', label: 'Descente · Approche Parakou', alt: 'FL030' };
    }
    return { code: 'ARR', label: 'Atterrissage · Parakou Airport', alt: 'FL005' };
  };

  const isNearRightEdge = planeState.x > containerDimensions.width - 260;
  const status = getFlightStatus(planeState.progress);
  const gradId = useId();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-20"
    >
      {/* Flight Path SVG Canvas */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 4000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id={`${gradId}-route`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C69214" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#00B8D9" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#0057B8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C69214" stopOpacity="0.95" />
          </linearGradient>

          <filter id={`${gradId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Full planned flight route (soft dashed line) */}
        <path
          ref={pathRef}
          d={pathData}
          stroke="currentColor"
          className="text-slate-300/60"
          strokeWidth="2.5"
          strokeDasharray="6 8"
          strokeLinecap="round"
        />

        {/* Dynamic Glowing Flight Path traced up to airplane position */}
        <motion.path
          d={pathData}
          stroke={`url(#${gradId}-route)`}
          strokeWidth="3.5"
          strokeLinecap="round"
          filter={`url(#${gradId}-glow)`}
          style={{ pathLength: smoothProgress }}
          className="opacity-90"
        />

        {/* Waypoints along the journey */}
        {/* 1. COO - Cotonou */}
        <g transform="translate(280, 60)">
          <circle r="14" fill="#0057B8" fillOpacity="0.15" />
          <circle r="6" fill="#C69214" />
          <circle r="2.5" fill="#FFFFFF" />
        </g>

        {/* 2. FLEET WAYPOINT */}
        <g transform="translate(820, 900)">
          <circle r="9" fill="#00B8D9" fillOpacity="0.2" />
          <circle r="4" fill="#00B8D9" />
        </g>

        {/* 3. ZOU / COLLINES WAYPOINT */}
        <g transform="translate(180, 1950)">
          <circle r="9" fill="#0057B8" fillOpacity="0.2" />
          <circle r="4" fill="#0057B8" />
        </g>

        {/* 4. DESTINATION APPROACH */}
        <g transform="translate(800, 3050)">
          <circle r="9" fill="#C69214" fillOpacity="0.2" />
          <circle r="4" fill="#C69214" />
        </g>

        {/* 5. PKO TERMINAL - Parakou */}
        <g transform="translate(500, 3960)">
          <circle r="15" fill="#C69214" fillOpacity="0.25" />
          <circle r="7" fill="#C69214" />
          <circle r="3" fill="#FFFFFF" />
        </g>
      </svg>

      {/* Animated Airplane & Cockpit HUD Marker */}
      <div
        className="absolute top-0 left-0 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${planeState.x}px, ${planeState.y}px, 0px)`,
        }}
      >
        {/* Real Airplane with Transparent Background */}
        <div
          className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `rotate(${planeState.angle}deg)`,
          }}
        >
          {/* Dual Engine Contrail / Jet Exhaust Vapor */}
          <div className="absolute top-[80%] flex items-center justify-center gap-3 pointer-events-none">
            <div className="w-1.5 h-16 bg-gradient-to-b from-brand-yellow/85 via-cyan-400/40 to-transparent blur-[2px] rounded-full" />
            <div className="w-1.5 h-16 bg-gradient-to-b from-brand-yellow/85 via-cyan-400/40 to-transparent blur-[2px] rounded-full" />
          </div>

          {/* Real Cutout Airplane */}
          <div className="relative w-16 h-24 sm:w-20 sm:h-28 flex items-center justify-center">
            {/* Ambient dynamic shadow for authentic flight depth */}
            <div className="absolute inset-0 rounded-full bg-brand-yellow/15 animate-ping opacity-30 pointer-events-none" />

            <img
              src={realPlaneImg}
              alt="Avion Amazone Airlines en vol"
              width={149}
              height={240}
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain drop-shadow-[0_16px_25px_rgba(6,59,115,0.65)] select-none pointer-events-none transform -rotate-15 hover:scale-105 transition-transform"
            />
          </div>
        </div>

        {/* Flight HUD Floating Tag (Intelligently flips side near screen edges) */}
        <div
          className={`absolute ${
            isNearRightEdge ? 'right-8 left-auto' : 'left-8'
          } -top-4 pointer-events-auto hidden sm:flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-full shadow-2xl shadow-slate-950/60 whitespace-nowrap transform -translate-y-1/2`}
        >
          <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <span className="font-extrabold text-brand-yellow">{status.code}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-200 font-sans font-medium text-[11px]">
              {status.label}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-cyan-300 font-bold">{status.alt}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
