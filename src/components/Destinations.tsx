import React from 'react';
import {
  Compass,
  Plane,
  Clock,
  MapPin,
} from 'lucide-react';
import { IMAGES } from '../data';
import ScrollStack from './ScrollStack';
import LiquidChrome from './LiquidChrome';

interface DestinationsProps {
  onSelectRoute: (departure: string, destination: string) => void;
}

export default function Destinations({ onSelectRoute }: DestinationsProps) {
  const routesData = [
    {
      index: '01',
      name: 'Cotonou ↔ Parakou',
      routeSubtitle: 'Aéroport Cadjehoun (COO) ↔ Aéroport de Tourou (PKO)',
      status: 'active' as const,
      statusLabel: 'Liaison Active Quotidienne',
      code: 'COO ↔ PKO',
      time: '1h 15m',
      frequency: '3 rotations / jour',
      priceFrom: '65 000 FCFA',
      description:
        'Notre ligne commerciale phare reliant la capitale économique au grand carrefour du Septentrion. Évitez les 8 à 10 heures d’épreuve sur la RNIE 2 grâce à nos 3 vols quotidiens programmés matin, midi et fin de journée.',
      highlights: [
        { label: 'Temps de vol', value: '1h 15m' },
        { label: 'Fréquence', value: '3 vols / jour' },
        { label: 'Tarif dès', value: '65 000 F' },
      ],
      airportFrom: 'Cotonou-Cadjehoun (COO)',
      airportTo: 'Parakou-Tourou (PKO)',
      image: IMAGES.cotonouParakou,
      imageAlt: 'Vue aérienne et appareils au départ de Cotonou vers Parakou',
    },
    {
      index: '02',
      name: 'Cotonou ↔ Lagos',
      routeSubtitle: 'Aéroport Cadjehoun (COO) ↔ Murtala Muhammed (LOS)',
      status: 'upcoming' as const,
      statusLabel: 'Corridor Régional • Bientôt disponible',
      code: 'COO ↔ LOS',
      time: '45m',
      frequency: 'Corridor express d’affaires',
      priceFrom: 'Tarif d’ouverture bientôt',
      description:
        'Liaison directe express vers la première place financière et commerciale du Nigéria. Franchissez la frontière en 45 minutes de vol sans subir les longues heures d’embouteillages et formalités terrestres de Sèmè-Kraké.',
      highlights: [
        { label: 'Temps de vol', value: '45 min' },
        { label: 'Gain frontière', value: '+6 heures' },
        { label: 'Liaison', value: 'Express Affaires' },
      ],
      airportFrom: 'Cotonou-Cadjehoun (COO)',
      airportTo: 'Lagos-Murtala Muhammed (LOS)',
      image: IMAGES.destLagos,
      imageAlt: 'Métropole dynamique de Lagos, future liaison régionale directe',
    },
    {
      index: '03',
      name: 'Cotonou ↔ Abidjan',
      routeSubtitle: 'Aéroport Cadjehoun (COO) ↔ Félix-Houphouët-Boigny (ABJ)',
      status: 'upcoming' as const,
      statusLabel: 'Axe Stratégique UEMOA • Bientôt disponible',
      code: 'COO ↔ ABJ',
      time: '1h 40m',
      frequency: 'Vols directs régionaux',
      priceFrom: 'Tarif d’ouverture bientôt',
      description:
        'Connectez directement le Bénin à la locomotive économique francophone d’Afrique de l’Ouest. Développez vos partenariats, conventions d’entreprises et échanges commerciaux avec la Côte d’Ivoire en toute fluidité.',
      highlights: [
        { label: 'Temps de vol', value: '1h 40m' },
        { label: 'Réseau', value: 'Espace UEMOA' },
        { label: 'Confort', value: 'Cabine spacieuse' },
      ],
      airportFrom: 'Cotonou-Cadjehoun (COO)',
      airportTo: 'Abidjan-Félix-Houphouët (ABJ)',
      image: IMAGES.destAbidjan,
      imageAlt: 'Liaison aérienne d’affaires entre Cotonou et Abidjan',
    },
  ];

  const handleBookRoute = (routeName: string) => {
    if (routeName.includes('Parakou')) {
      onSelectRoute('Cotonou', 'Parakou');
      const bookingEl = document.getElementById('booking') || document.getElementById('hero');
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const contactEl = document.getElementById('footer') || document.getElementById('hero');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const renderedCards = routesData.map((route) => {
    const isActive = route.status === 'active';

    return (
      <div
        key={route.index}
        onClick={() => {
          if (isActive) {
            handleBookRoute(route.name);
          }
        }}
        className={`w-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-slate-100/90 border border-slate-200/90 shadow-2xl shadow-slate-900/10 flex flex-col transition-all duration-300 relative group select-none ${
          isActive ? 'cursor-pointer hover:border-brand-blue/50' : ''
        }`}
      >
        {/* Animated LiquidChrome Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <LiquidChrome
            baseColor={[0.1, 0.1, 0.1]}
            speed={0.4}
            amplitude={0.6}
            frequencyX={2.5}
            frequencyY={1.5}
            interactive={true}
            className="w-full h-full opacity-60 group-hover:opacity-80 transition-opacity duration-700"
          />
          {/* Luminous frosted glass wash to ensure text readability while letting chrome waves ripple underneath */}
          <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px] transition-colors group-hover:bg-white/65 pointer-events-none" />
        </div>

        {/* Uniform brand accent line at the top of each card */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue via-brand-blue to-brand-gold relative z-10" />

        <div className="w-full flex flex-col lg:flex-row items-stretch flex-1 relative z-10">
          {/* Left Side: Rich Route Copy & Flight Details */}
          <div className="w-full lg:w-[54%] p-6 sm:p-9 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Top Bar: IATA Route Code */}
              <div className="flex items-center justify-between">
                <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-bold px-3 py-1 rounded-full tracking-wider">
                  {route.code}
                </span>
              </div>

              {/* Main Route Title & Subtitle */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-brand-dark leading-tight">
                  {route.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono mt-1.5 flex items-center gap-1.5 text-brand-gold">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                  <span>{route.routeSubtitle}</span>
                </p>
              </div>

              {/* Route Descriptive Body */}
              <p className="text-slate-600 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-normal">
                {route.description}
              </p>
            </div>

            {/* Highlights Row: 3 Metrics */}
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {route.highlights.map((h, hIdx) => (
                  <div
                    key={hIdx}
                    className="bg-white/85 backdrop-blur-sm border border-slate-200/90 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-xs"
                  >
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-mono text-slate-500 truncate">
                      {h.label}
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base font-bold font-mono text-brand-dark mt-0.5 truncate">
                      {h.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Info: Flight schedule information without button */}
              <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>
                    {isActive
                      ? '3 vols par jour • Cotonou ↔ Parakou'
                      : 'Pré-enregistrements ouverts pour cette ligne'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Showcase Visual Asset (Hidden on mobile and tablet, displayed only on PC / lg screens) */}
          <div className="hidden lg:flex lg:w-[46%] relative overflow-hidden bg-slate-950 flex-col justify-center items-center lg:p-7 lg:min-h-full">
            {/* Atmospheric blurred ambient backdrop using the destination photo */}
            <img
              src={route.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-35 scale-125 pointer-events-none select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-950/70 pointer-events-none" />

            {/* Showcase Framed Image: Reduced & 100% Complete View Without Cropping */}
            <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto">
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-black/70 bg-black/50 group-hover:border-white/35 transition-all duration-500">
                <img
                  src={route.image}
                  alt={route.imageAlt}
                  referrerPolicy="no-referrer"
                  width={750}
                  height={422}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-[280px] sm:max-h-[340px] lg:max-h-[380px] object-contain block transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Floating Info Overlay inside/on bottom of framed image */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between gap-2 pointer-events-none">
                  <div className="bg-brand-dark/90 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono font-medium shadow-lg flex items-center gap-1.5">
                    <Plane className="w-3.5 h-3.5 text-brand-yellow -rotate-45 shrink-0" />
                    <span>Vol direct • {route.time}</span>
                  </div>

                  <div className="bg-black/70 backdrop-blur-md border border-white/25 text-white px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-semibold shadow-md truncate max-w-[180px]">
                    {route.airportTo}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <section id="destinations" className="py-24 bg-brand-surface border-y border-brand-border/60 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[15%] left-[-8%] w-[550px] h-[550px] bg-brand-blue/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-8%] w-[550px] h-[550px] bg-brand-yellow/5 rounded-full filter blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <Compass className="w-3.5 h-3.5 text-brand-blue animate-spin-slow" />
            <span>Réseau de lignes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark tracking-tight [text-wrap:balance]">
            Relier les pôles économiques du Bénin et de la sous-région
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Liaison active quotidienne entre Cotonou et Parakou en 1h15, avec ouverture progressive des corridors ouest-africains stratégiques.
          </p>
        </div>

        {/* ScrollStack Component Integration on Destinations */}
        <ScrollStack
          cards={renderedCards}
          useWindowScroll={true}
          itemDistance={95}
          itemScale={0.035}
          itemStackDistance={26}
          stackPosition="18%"
          scaleEndPosition="8%"
          baseScale={0.88}
          blurAmount={0}
        />
      </div>
    </section>
  );
}
