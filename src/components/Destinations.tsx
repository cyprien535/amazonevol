import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, ChevronLeft, ChevronRight, Compass, Sparkles, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS } from '../data';

interface DestinationsProps {
  onSelectRoute: (departure: string, destination: string) => void;
}

export default function Destinations({ onSelectRoute }: DestinationsProps) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle window resizing dynamically for correct visible card counts
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getVisibleCount = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 3;
  };

  const visibleCount = getVisibleCount();
  const maxIndex = Math.max(0, DESTINATIONS.length - visibleCount);

  // Keep index within bounds if resized
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, maxIndex, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // Smooth auto-rotation in background
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section id="destinations" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative premium radial gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/5 rounded-full filter blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-brand-yellow/5 rounded-full filter blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clean Header Block */}
        <div className="mb-12 max-w-2xl space-y-4">
          <span className="text-brand-blue font-semibold text-xs uppercase tracking-wider bg-brand-blue/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-blue animate-spin-slow" />
            Réseau de lignes
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold text-brand-dark tracking-tight">
            Relier les pôles économiques du Bénin et de la région
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Ligne active quotidienne entre Cotonou et Parakou, avec ouverture prochaine des corridors sous-régionaux majeurs.
          </p>
        </div>

        {/* Carousel Container Viewport */}
        <div className="overflow-hidden p-2 -m-2">
          <motion.div
            className="flex gap-6 sm:gap-8"
            animate={{ x: `-${currentIndex * (100 / DESTINATIONS.length)}%` }}
            transition={{ type: 'spring', stiffness: 180, damping: 25 }}
            style={{
              width: `${(DESTINATIONS.length / visibleCount) * 100}%`,
            }}
          >
            {DESTINATIONS.map((dest, index) => {
              const isRouteActive = dest.status === 'active';
              return (
                <div
                  key={dest.name}
                  style={{ width: `${100 / DESTINATIONS.length}%` }}
                  className="px-1"
                >
                  <motion.div
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-brand-blue/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group h-full relative"
                    whileHover={{ y: -4 }}
                  >
                    {/* Cinematic Card Image with Status Badge */}
                    <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-100">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        width={600}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Premium gradient mesh */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent"></div>

                      {/* Top floating badge panel */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        {isRouteActive ? (
                          <span className="bg-emerald-800 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                            Liaison Active
                          </span>
                        ) : (
                          <span className="bg-slate-950/80 backdrop-blur-md text-brand-yellow text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider flex items-center gap-1 shadow-md">
                            <Sparkles className="w-3 h-3 text-brand-yellow" />
                            Bientôt disponible
                          </span>
                        )}

                        <span className="bg-white/15 backdrop-blur-md text-white border border-white/20 text-[11px] font-mono font-bold px-2.5 py-1 rounded-full">
                          {dest.code}
                        </span>
                      </div>

                      {/* Flight Route Code Overlay at Bottom of Image */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="space-y-0.5">
                          <p className="text-[10px] uppercase font-mono tracking-widest text-brand-yellow font-bold">
                            Vol direct régulier
                          </p>
                          <h3 className="text-lg font-semibold text-white tracking-tight">
                            {dest.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Card detailed body */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                        {dest.description}
                      </p>

                      {/* Footer block with time indicator & action buttons */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                            DURÉE DU VOL
                          </span>
                          <span className="font-semibold text-gray-900 text-sm">
                            {dest.time}
                          </span>
                        </div>
                        
                        {isRouteActive ? (
                          <button
                            onClick={() => {
                              const parts = dest.name.split(' ↔ ');
                              if (parts.length === 2) {
                                onSelectRoute(parts[0], parts[1]);
                              }
                            }}
                            className="group relative overflow-hidden bg-gradient-to-r from-[#083B63] via-[#0A4D80] to-[#0D5B96] hover:from-[#0A4D80] hover:to-[#0F6EB4] text-white px-5 py-2.5 rounded-full transition-colors duration-200 shadow-sm flex items-center gap-2 font-medium text-xs sm:text-sm cursor-pointer active:scale-98"
                            title={`Réserver un vol pour ${dest.name}`}
                          >
                            {/* Rayon de brillance */}
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full group-active:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

                            <Plane className="w-3.5 h-3.5 text-white -rotate-45 group-hover:translate-x-0.5 transition-transform" />
                            <span className="relative z-10">Réserver un vol</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C69214] group-hover:translate-x-1 transition-transform relative z-10" />
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full uppercase tracking-wider">
                            En ouverture
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Carousel Visual Navigation Dots & Arrows */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white hover:bg-brand-blue hover:text-white text-slate-700 transition-all shadow-sm border border-slate-200 flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Destination précédente"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                }}
                className="w-10 h-11 flex items-center justify-center p-2 group cursor-pointer"
                title={`Aller à la diapositive ${idx + 1}`}
                aria-label={`Aller à la diapositive ${idx + 1}`}
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 block ${
                    currentIndex === idx
                      ? 'w-8 bg-brand-blue'
                      : 'w-2.5 bg-slate-300 group-hover:bg-slate-400'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white hover:bg-brand-blue hover:text-white text-slate-700 transition-all shadow-sm border border-slate-200 flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Destination suivante"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}

