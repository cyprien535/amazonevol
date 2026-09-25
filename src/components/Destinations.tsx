import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, ChevronLeft, ChevronRight, Play, Pause, Compass, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DESTINATIONS } from '../data';

interface DestinationsProps {
  onSelectRoute: (departure: string, destination: string) => void;
}

export default function Destinations({ onSelectRoute }: DestinationsProps) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

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
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    setProgress(0);
  };

  // Auto-play timer with smooth incremental progress bar update
  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }
    const intervalTime = 5000; // 5 seconds per slide transition
    const stepTime = 50; // update progress every 50ms for performance and smoothness
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += stepTime;
      setProgress((elapsed / intervalTime) * 100);
      if (elapsed >= intervalTime) {
        nextSlide();
        elapsed = 0;
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, maxIndex]);

  return (
    <section id="destinations" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative premium radial gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-blue/5 rounded-full filter blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-brand-yellow/5 rounded-full filter blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block with Integrated Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="space-y-4 max-w-2xl">
            <span className="text-brand-blue font-mono font-bold text-xs uppercase tracking-widest bg-brand-blue/10 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-brand-blue animate-spin-slow" />
              Nos Destinations Régionales
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-brand-dark tracking-tight">
              Connecter le Bénin à la sous-région
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Découvrez nos liaisons intérieures quotidiennes actives et notre plan de déploiement vers les grandes métropoles d'Afrique de l'Ouest.
            </p>
          </div>

          {/* Professional Carousel Controls & Progress Info */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 self-start md:self-auto min-w-[280px]">
            {/* Auto-rotation status & indicator */}
            <div className="flex items-center justify-between gap-3 px-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-xl hover:bg-slate-50 text-slate-500 hover:text-brand-blue transition-all"
                title={isPlaying ? "Mettre en pause l'auto-rotation" : "Lancer l'auto-rotation"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              
              <div className="flex flex-col w-20">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  {isPlaying ? 'Auto-play' : 'Pause'}
                </span>
                {/* Slim progress bar track */}
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-brand-blue h-full transition-all duration-75"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-slate-100" />

            {/* Slides Pagination Counter */}
            <div className="flex items-center justify-between sm:justify-start gap-4">
              <span className="text-xs font-mono font-bold text-slate-600 px-2">
                0{currentIndex + 1} <span className="text-slate-300">/</span> 0{DESTINATIONS.length}
              </span>

              {/* Prev/Next Navigation triggers */}
              <div className="flex gap-1.5">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-brand-blue hover:text-white text-slate-700 transition-all shadow-sm border border-slate-100"
                  aria-label="Destination précédente"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-xl bg-slate-50 hover:bg-brand-blue hover:text-white text-slate-700 transition-all shadow-sm border border-slate-100"
                  aria-label="Destination suivante"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
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
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Premium gradient mesh */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent"></div>

                      {/* Top floating badge panel */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        {isRouteActive ? (
                          <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
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
                          <h4 className="text-lg font-bold text-white font-display">
                            {dest.name}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Card detailed body */}
                    <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {dest.description}
                      </p>

                      {/* Footer block with time indicator & action buttons */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-bold">
                            DURÉE DU VOL
                          </span>
                          <span className="font-mono font-bold text-slate-800 text-sm">
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
                            className="bg-brand-blue hover:bg-[#005282] text-white px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-2 font-bold text-xs cursor-pointer active:scale-95"
                            title={`Réserver un vol pour ${dest.name}`}
                          >
                            <span>Réserver</span>
                            <ArrowRight className="w-3.5 h-3.5 text-brand-yellow" />
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

        {/* Carousel Visual Navigation Dots */}
        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setProgress(0);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-brand-blue'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`Aller à la diapositive ${idx + 1}`}
              aria-label={`Aller à la diapositive ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

