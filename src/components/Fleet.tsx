import React from 'react';
import { Plane, Users, Compass, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { FLEET } from '../data';

interface FleetProps {
  onSelectAircraft: (category: string) => void;
}

export default function Fleet({ onSelectAircraft }: FleetProps) {
  return (
    <section id="flotte" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative gradient backdrops */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
              <Plane className="w-3.5 h-3.5 transform -rotate-45" />
              <span>Notre Flotte Moderne</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-dark tracking-tight [text-wrap:balance]">
              Des appareils éprouvés et certifiés pour vos déplacements
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              De l'efficience économique de notre ATR 42 pour vos liaisons régulières à la discrétion exclusive de nos jets Falcon d'affaires.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => onSelectAircraft('Vol Régional Régulier')}
              className="bg-brand-blue hover:bg-[#005282] text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            >
              Consulter les tarifs réguliers
            </button>
          </div>
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FLEET.map((plane, index) => {
            const isVipOrCharter = plane.category.includes('VIP') || plane.category.includes('Charter');

            return (
              <motion.div
                key={plane.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="bg-slate-50 hover:bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group justify-between"
              >
                <div>
                  {/* Image container with aspect ratio and fallback */}
                  <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-200">
                    <img
                      src={plane.image}
                      alt={`Photo de l'appareil ${plane.name}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-brand-yellow text-xs font-mono font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                      {plane.category}
                    </div>
                  </div>

                  {/* Body Specs & Description */}
                  <div className="p-6 sm:p-7 space-y-5">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                        {plane.name}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mt-2">
                        {plane.description}
                      </p>
                    </div>

                    {/* Specs metric grid */}
                    <div className="grid grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-brand-blue shrink-0" />
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Capacité</span>
                          <span className="font-bold text-slate-800">{plane.capacity}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Compass className="w-4 h-4 text-brand-blue shrink-0" />
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Vitesse</span>
                          <span className="font-bold text-slate-800">{plane.speed}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 pt-1">
                      {plane.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="p-6 sm:p-7 pt-0">
                  <button
                    onClick={() => {
                      onSelectAircraft(plane.category);
                      if (isVipOrCharter) {
                        const element = document.getElementById('vip');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                      isVipOrCharter
                        ? 'bg-brand-dark hover:bg-slate-900 text-brand-yellow border border-white/10'
                        : 'bg-brand-blue hover:bg-[#005282] text-white shadow-brand-blue/10'
                    }`}
                  >
                    <Plane className="w-4 h-4 transform -rotate-45" />
                    <span>
                      {plane.name.startsWith('Charter')
                        ? 'Affréter ce Charter'
                        : plane.category.includes('VIP')
                          ? 'Réserver un vol VIP'
                          : `Réserver un vol sur ${plane.name}`}
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

