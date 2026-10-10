import React from 'react';
import { Plane } from 'lucide-react';
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
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              <Plane className="w-3.5 h-3.5 transform -rotate-45" />
              <span>Appareils en service</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark tracking-tight [text-wrap:balance]">
              Une flotte adaptée à vos besoins de déplacement
            </h2>
            
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal">
              Du vol de ligne régionale sur ATR 42-500 aux trajets d'affaires personnalisés en jet Falcon.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => onSelectAircraft('Ligne Régulière Domestique')}
              className="bg-brand-blue hover:bg-[#005282] text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow transition-colors duration-200 cursor-pointer"
            >
              Voir les vols réguliers
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
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.45, ease: 'easeOut' }}
                className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:border-[#C69214]/60 hover:shadow-xl transition-all duration-300 flex flex-col group justify-between hover:-translate-y-1 cursor-pointer select-none"
              >
                {/* Rayon de brillance oblique traversant toute la carte au toucher / survol */}
                <span className="absolute inset-0 -translate-x-[160%] group-hover:translate-x-[160%] group-active:translate-x-[160%] transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none z-30 skew-x-[-22deg]" />

                <div>
                  {/* Image container with aspect ratio and fallback */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
                    <img
                      src={plane.image}
                      alt={`Photo de l'appareil ${plane.name}`}
                      width={600}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-[#C69214] text-xs font-semibold px-3 py-1 rounded-full border border-white/10 group-hover:border-[#C69214]/60 transition-colors duration-200 uppercase tracking-wider z-20">
                      {plane.category}
                    </div>
                  </div>

                  {/* Body Content - Plane Name */}
                  <div className="p-6 sm:p-7 relative z-10">
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-brand-blue transition-colors tracking-tight">
                      {plane.name}
                    </h3>
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
                    className={`group relative overflow-hidden w-full py-3 px-5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-sm active:scale-98 ${
                      isVipOrCharter
                        ? 'bg-gradient-to-r from-[#071322] via-[#0A192F] to-[#0D2342] text-[#C69214] border border-[#C69214]/30 hover:border-[#C69214] hover:shadow-[0_0_20px_rgba(198,146,20,0.35)]'
                        : 'bg-gradient-to-r from-[#083B63] via-[#0A4D80] to-[#0D5B96] text-white hover:shadow-[0_0_20px_rgba(10,77,128,0.4)] border border-white/10'
                    }`}
                  >
                    <Plane className={`w-4 h-4 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 relative z-10 ${
                      isVipOrCharter ? 'text-[#C69214]' : 'text-white'
                    }`} />
                    <span className="relative z-10">
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

