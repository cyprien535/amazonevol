import React from 'react';
import { Plane, Check } from 'lucide-react';
import { FLEET } from '../data';
import FlipCard from './FlipCard';

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
              Du vol de ligne régionale sur ATR 42-500 aux trajets d'affaires personnalisés en jet Falcon. Cliquez ou faites glisser les cartes pour explorer leurs caractéristiques techniques.
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

        {/* Fleet Cards Grid with React Bits FlipCard Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
          {FLEET.map((plane) => {
            const isVipOrCharter = plane.category.includes('VIP') || plane.category.includes('Charter');

            const frontFace = (
              <div className="relative w-full h-full flex flex-col justify-between bg-white overflow-hidden rounded-[22px] border border-slate-200/90 shadow-sm group select-none">
                <div>
                  {/* Image container */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-900">
                    <img
                      src={plane.image}
                      alt={`Photo de l'appareil ${plane.name}`}
                      width={600}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Gradient scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-[#C69214] text-xs font-semibold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider z-20">
                      {plane.category}
                    </div>
                  </div>

                  {/* Body Content - Plane Name & Quick Description */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-brand-blue transition-colors tracking-tight">
                      {plane.name}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed font-normal">
                      {plane.description}
                    </p>
                  </div>
                </div>
              </div>
            );

            const backFace = (
              <div className="relative w-full h-full flex flex-col justify-between bg-gradient-to-b from-[#071322] via-[#0A192F] to-[#0D2342] text-white p-7 overflow-hidden rounded-[22px] border border-white/10 select-none">
                <div className="space-y-4">
                  {/* Header info */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-brand-yellow uppercase tracking-wider bg-brand-yellow/15 border border-brand-yellow/30 px-3 py-1 rounded-full">
                      {plane.category}
                    </span>
                  </div>

                  {/* Plane Name */}
                  <div>
                    <h3 className="text-2xl font-semibold text-white tracking-tight">
                      {plane.name}
                    </h3>
                    <p className="text-slate-300 text-xs mt-1.5 leading-relaxed font-normal">
                      {plane.description}
                    </p>
                  </div>

                  {/* Technical Specs Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Capacité</span>
                      <span className="text-xs font-bold text-white font-mono">{plane.capacity}</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">Vitesse</span>
                      <span className="text-xs font-bold text-white font-mono">{plane.speed}</span>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] uppercase font-mono text-brand-yellow tracking-wider font-semibold block">
                      Services & Équipements inclus :
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {plane.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-brand-yellow shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAircraft(plane.category);
                      if (isVipOrCharter) {
                        const element = document.getElementById('vip');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className={`group relative overflow-hidden w-full py-3 px-5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer shadow-md active:scale-98 ${
                      isVipOrCharter
                        ? 'bg-gradient-to-r from-[#B8860B] via-[#C69214] to-[#D4A017] text-white hover:from-[#C69214] hover:to-[#E5A81B]'
                        : 'bg-gradient-to-r from-[#083B63] via-[#0A4D80] to-[#0D5B96] text-white hover:shadow-[0_0_20px_rgba(10,77,128,0.4)] border border-white/10'
                    }`}
                  >
                    <Plane className="w-4 h-4 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 relative z-10 text-white" />
                    <span className="relative z-10">
                      {plane.name.startsWith('Charter')
                        ? 'Affréter ce Charter'
                        : plane.category.includes('VIP')
                          ? 'Réserver un vol VIP'
                          : `Réserver un vol sur ${plane.name}`}
                    </span>
                  </button>
                </div>
              </div>
            );

            return (
              <div key={plane.name} className="w-full flex justify-center">
                <FlipCard
                  front={frontFace}
                  back={backFace}
                  axis="y"
                  flipOnHover={true}
                  flipOnClick={true}
                  draggable={true}
                  dragDistance={0}
                  tilt={true}
                  tiltMax={12}
                  glare={true}
                  glareOpacity={0.22}
                  hoverScale={1.03}
                  perspective={1100}
                  stiffness={170}
                  damping={20}
                  width="100%"
                  height={490}
                  radius={22}
                  background="#ffffff"
                  color="#1e293b"
                  shadow={true}
                  shadowColor="#000000"
                  shadowOpacity={0.18}
                  className="w-full max-w-sm"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
