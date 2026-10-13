import React from 'react';
import {
  Compass,
  Sparkles,
  Plane,
  Clock,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import ScrollStack from './ScrollStack';

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
      image:
        'https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&q=80&w=1200',
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
      image:
        'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?auto=format&fit=crop&q=80&w=1200',
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
      image:
        'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Liaison aérienne d’affaires entre Cotonou et Abidjan',
    },
    {
      index: '04',
      name: 'Cotonou ↔ Dakar',
      routeSubtitle: 'Aéroport Cadjehoun (COO) ↔ Blaise Diagne (DSS)',
      status: 'upcoming' as const,
      statusLabel: 'Grande Liaison Panafricaine • Bientôt disponible',
      code: 'COO ↔ DKR',
      time: '3h 30m',
      frequency: 'Vols directs sans escale',
      priceFrom: 'Tarif d’ouverture bientôt',
      description:
        'Ouverture d’une liaison directe vers le Sénégal reliant deux capitales côtières phares. Conçue pour les délégations institutionnelles, opérateurs économiques et voyageurs fréquents en quête de ponctualité et d’efficacité.',
      highlights: [
        { label: 'Temps de vol', value: '3h 30m' },
        { label: 'Trajet', value: 'Direct sans escale' },
        { label: 'Service', value: 'Prestations VIP' },
      ],
      airportFrom: 'Cotonou-Cadjehoun (COO)',
      airportTo: 'Dakar-Blaise Diagne (DSS)',
      image:
        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200',
      imageAlt: 'Corridor trans-africain Cotonou - Dakar en vol direct',
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
        className="w-full overflow-hidden rounded-[24px] sm:rounded-[32px] bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 flex flex-col transition-all duration-300 relative group select-none"
      >
        {/* Uniform brand accent line at the top of each card */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-blue via-brand-blue to-brand-gold" />

        <div className="w-full flex flex-col lg:flex-row items-stretch flex-1">
          {/* Left Side: Rich Route Copy & Flight Details */}
          <div className="w-full lg:w-[57%] p-6 sm:p-9 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Top Bar: Number badge + Status Badge + IATA Code */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-xl bg-brand-blue/10 text-brand-blue font-mono font-bold text-xs flex items-center justify-center border border-brand-blue/20">
                    {route.index}
                  </span>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] sm:text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      {route.statusLabel}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 text-[11px] sm:text-xs font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                      {route.statusLabel}
                    </span>
                  )}
                </div>

                {/* IATA Airport Route Code */}
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
                    className="bg-slate-50 border border-slate-200/80 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl"
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

              {/* Bottom Actions: Direct Booking Button */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                  <span>
                    {isActive
                      ? '3 vols par jour • Cotonou ↔ Parakou'
                      : 'Pré-enregistrements ouverts pour cette ligne'}
                  </span>
                </div>

                {isActive ? (
                  <button
                    onClick={() => handleBookRoute(route.name)}
                    className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer group active:scale-95"
                  >
                    <Plane className="w-4 h-4 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Sélectionner ce vol</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full border border-slate-200 transition-all cursor-pointer"
                  >
                    <span>Être informé du lancement</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: High-Resolution Scenic Route Image Asset */}
          <div className="w-full lg:w-[43%] relative min-h-[260px] sm:min-h-[320px] lg:min-h-full overflow-hidden bg-slate-900">
            <img
              src={route.image}
              alt={route.imageAlt}
              width={750}
              height={550}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-slate-950/30" />

            {/* Floating Pills on image */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex justify-between items-end">
              <div className="bg-brand-dark/85 backdrop-blur-md border border-white/20 text-white px-3.5 py-1.5 rounded-full text-xs font-mono font-medium shadow-xl flex items-center gap-2">
                <Plane className="w-3.5 h-3.5 text-brand-yellow -rotate-45" />
                <span>Vol direct • {route.time}</span>
              </div>

              <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-[11px] font-mono font-bold shadow-md">
                {route.airportTo}
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
