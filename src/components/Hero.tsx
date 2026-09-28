import React from 'react';
import { Plane, ArrowRight, Clock, ShieldCheck, Luggage, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BookingState } from '../types';
import { IMAGES } from '../data';

interface HeroProps {
  onSearch: (searchData: BookingState) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const handleQuickBook = () => {
    onSearch({
      departure: 'Cotonou',
      destination: 'Parakou',
      date: new Date().toISOString().split('T')[0],
      passengers: 1,
      tripType: 'one-way',
    });
  };

  return (
    <section id="accueil" className="relative min-h-[92vh] pt-32 pb-24 flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Immersive background image with resilient fallback */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Avion Amazone Airlines en vol au-dessus des nuages"
          width={1440}
          height={900}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-center opacity-75 scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Optical gradient scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40"></div>
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Main Editorial Hero Copy (6 Columns) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {/* Eyebrow Contextual Tag */}
              <div className="inline-flex items-center gap-2 bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow font-mono font-bold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Liaison quotidienne directe Cotonou – Parakou</span>
              </div>

              {/* Primary Headline with Text-Wrap Balance */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.12] tracking-tight drop-shadow-sm [text-wrap:balance]">
                Reliez <span className="text-brand-yellow">Cotonou</span> et{' '}
                <span className="text-brand-yellow">Parakou</span> en 1h15 de vol direct
              </h1>

              {/* Context description with strict reading measure */}
              <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed drop-shadow-sm [text-wrap:pretty]">
                Évitez 8 à 10 heures de route. Voyagez sereinement à bord de nos appareils avec 3 vols quotidiens, une franchise de 23 kg en soute incluse et des départs réguliers depuis l'aéroport de Cadjehoun.
              </p>

              {/* Hero CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
                <motion.button
                  onClick={handleQuickBook}
                  animate={{
                    scale: [1, 1.025, 1],
                    boxShadow: [
                      '0 10px 25px -5px rgba(198, 146, 20, 0.25), 0 0 0 0 rgba(212, 160, 23, 0)',
                      '0 16px 32px -5px rgba(198, 146, 20, 0.45), 0 0 0 8px rgba(212, 160, 23, 0.16)',
                      '0 10px 25px -5px rgba(198, 146, 20, 0.25), 0 0 0 0 rgba(212, 160, 23, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden bg-gradient-to-r from-[#B8860B] via-[#C69214] to-[#D4A017] hover:from-[#C69214] hover:to-[#E5A81B] text-white font-display font-extrabold text-base py-3.5 px-7 rounded-xl border border-amber-200/40 transition-colors duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full group-active:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />
                  <Plane className="w-4 h-4 text-white -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span className="relative z-10">Réserver un vol direct</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform relative z-10" />
                </motion.button>

                <a
                  href="#flotte"
                  className="px-6 py-3.5 rounded-xl text-slate-200 hover:text-white font-semibold text-sm border border-white/20 hover:border-white/50 hover:bg-white/5 transition-all duration-200 backdrop-blur-sm text-center"
                >
                  Découvrir la flotte
                </a>
              </div>

              <p className="text-xs text-slate-400 font-mono">
                Tarifs réguliers à partir de <span className="text-white font-bold">65 000 FCFA</span> TTC · 23 kg de bagages inclus
              </p>
            </motion.div>

            {/* Adjacency Proof Points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-slate-200 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10">
                <Clock className="w-4 h-4 text-brand-yellow shrink-0" />
                <div className="text-left">
                  <span className="font-bold text-white block">1h 15m</span>
                  <span className="text-slate-400 text-[11px]">vs 8h à 10h de route</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-brand-yellow shrink-0" />
                <div className="text-left">
                  <span className="font-bold text-white block">Conformité ANAC</span>
                  <span className="text-slate-400 text-[11px]">Aviation civile Bénin</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10">
                <Luggage className="w-4 h-4 text-brand-yellow shrink-0" />
                <div className="text-left">
                  <span className="font-bold text-white block">23 kg inclus</span>
                  <span className="text-slate-400 text-[11px]">Soute + 7 kg cabine</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Transparent Cutout Airplane (6 Columns, enlarged) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Ambient decorative glow */}
            <div className="absolute w-80 sm:w-[480px] h-80 sm:h-[480px] rounded-full bg-brand-blue/25 filter blur-3xl pointer-events-none" />
            <div className="absolute w-72 h-72 rounded-full bg-brand-yellow/15 filter blur-2xl pointer-events-none transform translate-y-12" />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [-6, 6, -6],
              }}
              transition={{
                opacity: { duration: 0.6 },
                scale: { duration: 0.6 },
                y: {
                  repeat: Infinity,
                  duration: 4.5,
                  ease: 'easeInOut',
                },
              }}
              className="relative w-full max-w-xl lg:max-w-2xl flex flex-col items-center"
            >
              <img
                src={IMAGES.planeCutout}
                alt="Avion Amazone Airlines"
                width={1024}
                height={1536}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[460px] sm:max-h-[540px] lg:max-h-[620px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.7)] select-none transform hover:scale-[1.03] transition-transform duration-500 ease-out"
              />

              {/* Floating micro glass badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-3 inline-flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full shadow-xl shadow-slate-950/60"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-slate-200">
                  Ligne active Cotonou (COO) ↔ Parakou (PKO)
                </span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

