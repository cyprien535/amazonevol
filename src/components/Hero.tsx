import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRight, ArrowLeftRight, Clock, ShieldCheck, Luggage, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { BookingState } from '../types';
import { IMAGES } from '../data';

interface HeroProps {
  onSearch: (searchData: BookingState) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [departure, setDeparture] = useState('Cotonou');
  const [destination, setDestination] = useState('Parakou');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('one-way');

  const handleSwapRoute = () => {
    const temp = departure;
    setDeparture(destination);
    setDestination(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      departure,
      destination,
      date,
      passengers,
      tripType,
    });
  };

  return (
    <section id="accueil" className="relative min-h-[92vh] pt-28 pb-20 flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Immersive background image with resilient fallback */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Avion Amazone Airlines en vol au-dessus des nuages"
          className="w-full h-full object-cover object-center opacity-75 scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Optical gradient scrim for WCAG AA readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/40"></div>
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-slate-950/40 to-slate-950/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Editorial Hero Copy (7 Columns) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Primary Headline with Text-Wrap Balance */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-[1.12] tracking-tight drop-shadow-sm [text-wrap:balance]">
                Reliez <span className="text-brand-yellow">Cotonou</span> et{' '}
                <span className="text-brand-yellow">Parakou</span> en 1h15 de vol direct
              </h1>

              {/* Context description with strict reading measure */}
              <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed drop-shadow-sm [text-wrap:pretty]">
                Évitez plus de 8 heures de route difficile. Voyagez dans le confort absolu de nos appareils ATR 42 et Falcon VIP avec une ponctualité rigoureuse et des standards de sécurité certifiés.
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
                <div>
                  <span className="font-bold text-white block">1h 15m</span>
                  <span className="text-slate-400 text-[11px]">vs 8h de route</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10">
                <ShieldCheck className="w-4 h-4 text-brand-yellow shrink-0" />
                <div>
                  <span className="font-bold text-white block">Certifié ANAC</span>
                  <span className="text-slate-400 text-[11px]">Normes OACI</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 bg-slate-900/60 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10">
                <Luggage className="w-4 h-4 text-brand-yellow shrink-0" />
                <div>
                  <span className="font-bold text-white block">23 kg inclus</span>
                  <span className="text-slate-400 text-[11px]">En soute + cabine</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Search Console (5 Columns) */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="bg-slate-900/85 backdrop-blur-xl rounded-2xl p-6 sm:p-7 border border-white/15 shadow-2xl shadow-slate-950/80 space-y-5"
            >
              {/* Card Header & Trip Type Selector */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Plane className="w-5 h-5 text-brand-yellow transform -rotate-45" />
                  <h2 className="text-lg font-display font-bold text-white">
                    Rechercher un vol
                  </h2>
                </div>

                <div className="flex bg-slate-950/60 p-1 rounded-lg border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={() => setTripType('one-way')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                      tripType === 'one-way'
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Aller simple
                  </button>
                  <button
                    type="button"
                    onClick={() => setTripType('round-trip')}
                    className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                      tripType === 'round-trip'
                        ? 'bg-brand-blue text-white shadow-sm'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Aller-retour
                  </button>
                </div>
              </div>

              {/* Form Controls */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {/* Route selection row */}
                <div className="relative space-y-2.5">
                  {/* Origin City */}
                  <div className="bg-slate-950/70 border border-white/10 rounded-xl p-3 text-left focus-within:border-brand-yellow/60 transition-colors">
                    <label htmlFor="hero-departure" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Ville de départ
                    </label>
                    <select
                      id="hero-departure"
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className="w-full bg-transparent text-white font-bold text-base focus:outline-none cursor-pointer"
                    >
                      <option className="bg-slate-900 text-white" value="Cotonou">
                        Cotonou (COO) · Cadjehoun
                      </option>
                      <option className="bg-slate-900 text-white" value="Parakou">
                        Parakou (PKO) · Tourou
                      </option>
                    </select>
                  </div>

                  {/* Swap Button */}
                  <div className="absolute right-5 top-[50%] -translate-y-1/2 z-20">
                    <button
                      type="button"
                      onClick={handleSwapRoute}
                      className="w-8 h-8 rounded-full bg-[#C69214] text-white flex items-center justify-center shadow-lg hover:rotate-180 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                      title="Inverser départ et destination"
                      aria-label="Inverser départ et destination"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Destination City */}
                  <div className="bg-slate-950/70 border border-white/10 rounded-xl p-3 text-left focus-within:border-brand-yellow/60 transition-colors">
                    <label htmlFor="hero-destination" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Destination
                    </label>
                    <select
                      id="hero-destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-transparent text-white font-bold text-base focus:outline-none cursor-pointer"
                    >
                      <option className="bg-slate-900 text-white" value="Parakou">
                        Parakou (PKO) · Tourou
                      </option>
                      <option className="bg-slate-900 text-white" value="Cotonou">
                        Cotonou (COO) · Cadjehoun
                      </option>
                    </select>
                  </div>
                </div>

                {/* Date & Passengers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Date Input */}
                  <div className="bg-slate-950/70 border border-white/10 rounded-xl p-3 text-left focus-within:border-brand-yellow/60 transition-colors">
                    <label htmlFor="hero-date" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-brand-yellow" />
                      Date de vol
                    </label>
                    <input
                      id="hero-date"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer [color-scheme:dark]"
                    />
                  </div>

                  {/* Passengers Input */}
                  <div className="bg-slate-950/70 border border-white/10 rounded-xl p-3 text-left focus-within:border-brand-yellow/60 transition-colors">
                    <label htmlFor="hero-passengers" className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-brand-yellow" />
                      Passagers
                    </label>
                    <select
                      id="hero-passengers"
                      value={passengers}
                      onChange={(e) => setPassengers(parseInt(e.target.value, 10))}
                      className="w-full bg-transparent text-white font-bold text-sm focus:outline-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} className="bg-slate-900 text-white" value={num}>
                          {num} {num > 1 ? 'passagers' : 'passager'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="submit"
                  className="w-full bg-[#C69214] hover:bg-[#AF7F0E] text-white font-display font-extrabold text-base py-3.5 px-6 rounded-xl shadow-lg shadow-[#C69214]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Rechercher les vols disponibles</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>

                <p className="text-center text-[11px] text-slate-400 pt-1">
                  Tarifs réguliers à partir de <span className="text-white font-bold font-mono">65 000 FCFA</span> TTC
                </p>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

