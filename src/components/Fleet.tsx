import React from 'react';
import { Plane, Users, Compass, Eye, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { FLEET } from '../data';

interface FleetProps {
  onSelectAircraft: (category: string) => void;
}

export default function Fleet({ onSelectAircraft }: FleetProps) {
  return (
    <section id="flotte" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Absolute decorative backdrops */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="text-brand-blue font-mono font-bold text-xs uppercase tracking-widest bg-brand-blue/10 px-3.5 py-1.5 rounded-full inline-block">
              Notre Flotte Moderne
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-brand-dark tracking-tight">
              Voyagez dans des cabines d'exception
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              De l'efficience de notre vol régulier ATR à la liberté discrète de nos jets privés de luxe, nous mettons en œuvre les technologies aéronautiques les plus fiables.
            </p>
          </div>
          <button
            onClick={() => {
              onSelectAircraft('Vol Régional Régulier');
            }}
            className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-6 py-3 rounded-none text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 shrink-0"
          >
            Voir tous les tarifs
          </button>
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FLEET.map((plane, index) => (
            <motion.div
              key={plane.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
              className="bg-white rounded-none overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col group"
            >
              {/* Image box with overlay hover */}
              <div className="relative h-64 overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={plane.image}
                  alt={plane.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient shadows */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

                {/* Tags */}
                <span className="absolute top-4 left-4 bg-brand-blue text-brand-yellow text-xs font-mono font-bold px-3 py-1.5 rounded-none shadow border border-white/10 uppercase tracking-wider">
                  {plane.category}
                </span>
              </div>

              {/* Specs & info block */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-display font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                      {plane.name}
                    </h3>
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed">
                    {plane.description}
                  </p>

                  {/* Core specs row */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 rounded-none p-4 text-xs text-slate-600 border border-slate-100 font-mono">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-brand-blue" />
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">Capacité</span>
                        <span className="font-bold text-slate-800">{plane.capacity}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-brand-blue" />
                      <div>
                        <span className="text-slate-400 block text-[9px] uppercase">Vitesse</span>
                        <span className="font-bold text-slate-800">{plane.speed}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bullet perks list */}
                  <div className="space-y-2 pt-2">
                    {plane.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action */}
                <button
                  onClick={() => {
                    onSelectAircraft(plane.category);
                    if (plane.category.includes('VIP') || plane.category.includes('Charter')) {
                      const element = document.getElementById('vip');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-slate-100 hover:bg-brand-blue hover:text-white text-slate-800 py-3.5 rounded-none text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-brand-blue group-hover:text-white"
                >
                  <Plane className="w-4 h-4 transform -rotate-45" />
                  Réserver {plane.name.startsWith('Charter') ? 'un Charter' : `un Vol ${plane.name}`}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
