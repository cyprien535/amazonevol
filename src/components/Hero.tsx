import React, { useState } from 'react';
import { Plane, Calendar, Users, ArrowRight, ArrowLeftRight } from 'lucide-react';
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
    <section id="accueil" className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Immersive airplane in flight hero background */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.hero}
          alt="Amazone Airlines Jet flying above clouds"
          className="w-full h-full object-cover object-center opacity-85 scale-105 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        {/* Dark overlay with blue & purple gradient for high premium look */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-brand-blue/35"></div>
      </div>

      {/* Floating Animated elements */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-brand-blue/20 rounded-full filter blur-[100px] animate-blob"></div>
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-brand-yellow/10 rounded-full filter blur-[120px] animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slogan and Text (6 Columns on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-brand-yellow text-xs sm:text-sm font-bold uppercase tracking-wider">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Compagnie Aérienne Officielle du Bénin
              </div>

              <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                Voyagez le Bénin <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-400 to-yellow-300">
                  autrement
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-100 max-w-2xl mx-auto lg:mx-0 font-medium tracking-wide drop-shadow">
                Cotonou <span className="text-brand-yellow font-bold">↔</span> Parakou en{' '}
                <span className="text-brand-yellow font-bold underline decoration-brand-yellow underline-offset-4">
                  1h15 seulement
                </span>. Rapide, sûr et extrêmement confortable.
              </p>
            </motion.div>

            {/* Quick stats badge line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-slate-100 text-xs sm:text-sm font-mono"
            >
              <div className="flex items-center gap-2 bg-slate-950/40 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/5">
                <span className="text-brand-yellow font-bold">✓</span> Sécurité certifiée aviation
              </div>
              <div className="flex items-center gap-2 bg-slate-950/40 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/5">
                <span className="text-brand-yellow font-bold">✓</span> Confort premium cabine
              </div>
              <div className="flex items-center gap-2 bg-slate-950/40 px-3.5 py-2 rounded-xl backdrop-blur-sm border border-white/5">
                <span className="text-brand-yellow font-bold">✓</span> Vol rapide et fiable
              </div>
            </motion.div>
          </div>

          {/* Form Card (5 Columns on desktop) */}
          <div className="lg:col-span-5 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-slate-950/70 backdrop-blur-xl rounded-none p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-xl font-display font-bold text-white">
                  Réserver un vol
                </h2>
                <div className="flex bg-white/5 p-1 rounded-none border border-white/10 text-[10px] sm:text-xs">
                  <button
                    onClick={() => setTripType('one-way')}
                    className={`px-3 py-1.5 rounded-none font-bold transition-all ${
                      tripType === 'one-way'
                        ? 'bg-brand-blue text-white shadow'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Aller simple
                  </button>
                  <button
                    onClick={() => setTripType('round-trip')}
                    className={`px-3 py-1.5 rounded-none font-bold transition-all ${
                      tripType === 'round-trip'
                        ? 'bg-brand-blue text-white shadow'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Aller-retour
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Route selection row */}
                <div className="relative grid grid-cols-1 gap-3">
                  {/* From */}
                  <div className="bg-white/5 border border-white/10 rounded-none p-3 text-left">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Départ (Bénin)
                    </label>
                    <select
                      value={departure}
                      onChange={(e) => setDeparture(e.target.value)}
                      className="w-full bg-transparent text-white font-bold text-lg focus:outline-none cursor-pointer"
                    >
                      <option className="bg-slate-900 text-white font-bold" value="Cotonou">
                        Cotonou (COO) - Aéroport Cardozo
                      </option>
                      <option className="bg-slate-900 text-white font-bold" value="Parakou">
                        Parakou (PKO) - Aéroport National
                      </option>
                    </select>
                  </div>

                  {/* Swap button floating in mid */}
                  <div className="absolute right-6 top-[44%] -translate-y-1/2 z-20">
                    <button
                      type="button"
                      onClick={handleSwapRoute}
                      className="w-9 h-9 rounded-none bg-brand-yellow text-slate-950 flex items-center justify-center shadow-lg hover:rotate-180 transition-all duration-500 hover:scale-105 active:scale-95"
                      title="Inverser les villes"
                    >
                      <ArrowLeftRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* To */}
                  <div className="bg-white/5 border border-white/10 rounded-none p-3 text-left">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Destination
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-transparent text-white font-bold text-lg focus:outline-none cursor-pointer"
                    >
                      <option className="bg-slate-900 text-white font-bold" value="Parakou">
                        Parakou (PKO) - Aéroport National
                      </option>
                      <option className="bg-slate-900 text-white font-bold" value="Cotonou">
                        Cotonou (COO) - Aéroport Cardozo
                      </option>
                    </select>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="bg-white/5 border border-white/10 rounded-none p-3 text-left">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-brand-yellow" />
                    Date de Départ
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent text-white font-bold text-base focus:outline-none cursor-pointer [color-scheme:dark]"
                  />
                </div>

                {/* Passengers count selector */}
                <div className="bg-white/5 border border-white/10 rounded-none p-3 text-left">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Users className="w-3 h-3 text-brand-yellow" />
                    Nombre de passagers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    className="w-full bg-transparent text-white font-bold text-base focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} className="bg-slate-900 text-white" value={num}>
                        {num} {num > 1 ? 'Voyageurs' : 'Voyageur'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit button CTA */}
                <button
                  type="submit"
                  className="w-full bg-brand-yellow hover:bg-amber-400 text-brand-dark font-display font-extrabold text-lg py-4 rounded-none shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 border border-brand-yellow hover:border-amber-400"
                >
                  RECHERCHER UN VOL
                  <ArrowRight className="w-5 h-5 text-brand-dark" />
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
