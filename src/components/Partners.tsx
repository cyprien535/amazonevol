import React from 'react';
import { ShieldCheck, Award, Building2 } from 'lucide-react';
import LogoLoop, { LogoItem } from './LogoLoop';

// High-fidelity partner logo badges with crisp aeronautical styling
const PARTNER_LOGOS: LogoItem[] = [
  {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 70" width="200" height="70">
        <rect width="200" height="70" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
        <circle cx="36" cy="35" r="22" fill="#0A192F" stroke="#C69214" stroke-width="2"/>
        <path d="M24 38 L36 24 L48 38 L42 38 L36 30 L30 38 Z" fill="#C69214"/>
        <text x="68" y="32" fill="#071322" font-family="Inter, sans-serif" font-size="16" font-weight="800" letter-spacing="1.5">ANAC</text>
        <text x="68" y="48" fill="#64748B" font-family="Inter, sans-serif" font-size="10" font-weight="600">AVIATION CIVILE BÉNIN</text>
      </svg>
    `)}`,
    alt: 'ANAC Bénin - Agence Nationale de l\'Aviation Civile',
    title: 'ANAC Bénin',
  },
  {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 70" width="200" height="70">
        <rect width="200" height="70" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
        <circle cx="36" cy="35" r="22" fill="#0A4D80"/>
        <polygon points="36,19 50,35 36,51 22,35" fill="none" stroke="#C69214" stroke-width="2.5"/>
        <text x="68" y="32" fill="#071322" font-family="Inter, sans-serif" font-size="15" font-weight="800" letter-spacing="1">ASECNA</text>
        <text x="68" y="48" fill="#64748B" font-family="Inter, sans-serif" font-size="10" font-weight="600">SÉCURITÉ DU CIEL</text>
      </svg>
    `)}`,
    alt: 'ASECNA - Sécurité de la Navigation Aérienne',
    title: 'ASECNA',
  },
  {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 70" width="210" height="70">
        <rect width="210" height="70" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
        <circle cx="36" cy="35" r="22" fill="#071322" stroke="#0A4D80" stroke-width="2"/>
        <text x="36" y="39" fill="#C69214" font-family="Inter, sans-serif" font-size="12" font-weight="800" text-anchor="middle">COO</text>
        <text x="68" y="32" fill="#071322" font-family="Inter, sans-serif" font-size="14" font-weight="800" letter-spacing="0.5">AÉROPORT COTONOU</text>
        <text x="68" y="48" fill="#64748B" font-family="Inter, sans-serif" font-size="10" font-weight="600">CADJEHOUN INTERNATIONAL</text>
      </svg>
    `)}`,
    alt: 'Aéroport International de Cotonou Cadjehoun',
    title: 'Aéroport Cotonou',
  },
  {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 70" width="210" height="70">
        <rect width="210" height="70" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
        <circle cx="36" cy="35" r="22" fill="#0A192F" stroke="#C69214" stroke-width="2"/>
        <text x="36" y="39" fill="#FFFFFF" font-family="Inter, sans-serif" font-size="12" font-weight="800" text-anchor="middle">PKO</text>
        <text x="68" y="32" fill="#071322" font-family="Inter, sans-serif" font-size="14" font-weight="800" letter-spacing="0.5">AÉROPORT PARAKOU</text>
        <text x="68" y="48" fill="#64748B" font-family="Inter, sans-serif" font-size="10" font-weight="600">AÉROGARE DE TOUROU</text>
      </svg>
    `)}`,
    alt: 'Aéroport de Parakou Tourou',
    title: 'Aéroport Parakou',
  },
  {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 70" width="200" height="70">
        <rect width="200" height="70" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
        <circle cx="36" cy="35" r="22" fill="#F8FAFC" stroke="#0A4D80" stroke-width="2"/>
        <path d="M26 35 Q36 22 46 35 Q36 48 26 35 Z" fill="#0A4D80"/>
        <circle cx="36" cy="35" r="5" fill="#C69214"/>
        <text x="68" y="32" fill="#071322" font-family="Inter, sans-serif" font-size="14" font-weight="800">BÉNIN TOURISME</text>
        <text x="68" y="48" fill="#64748B" font-family="Inter, sans-serif" font-size="10" font-weight="600">DESTINATION BÉNIN</text>
      </svg>
    `)}`,
    alt: 'Bénin Tourisme - Agence de Promotion',
    title: 'Bénin Tourisme',
  },
  {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 70" width="190" height="70">
        <rect width="190" height="70" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
        <circle cx="36" cy="35" r="22" fill="#0F172A"/>
        <text x="36" y="41" fill="#38BDF8" font-family="Inter, sans-serif" font-size="14" font-weight="900" text-anchor="middle">ATR</text>
        <text x="68" y="32" fill="#071322" font-family="Inter, sans-serif" font-size="14" font-weight="800">ATR FLEET</text>
        <text x="68" y="48" fill="#64748B" font-family="Inter, sans-serif" font-size="10" font-weight="600">REGIONAL AVIATION</text>
      </svg>
    `)}`,
    alt: 'ATR Aircraft Regional Support',
    title: 'ATR Aircraft',
  },
  {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 70" width="200" height="70">
        <rect width="200" height="70" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
        <circle cx="36" cy="35" r="22" fill="#081A2F" stroke="#C69214" stroke-width="2"/>
        <path d="M26 40 L36 24 L46 40 Z" fill="none" stroke="#C69214" stroke-width="2"/>
        <text x="68" y="32" fill="#071322" font-family="Inter, sans-serif" font-size="14" font-weight="800">FALCON JETS</text>
        <text x="68" y="48" fill="#64748B" font-family="Inter, sans-serif" font-size="10" font-weight="600">VIP JET SERVICE</text>
      </svg>
    `)}`,
    alt: 'Falcon Dassault Aviation VIP Service',
    title: 'Falcon VIP',
  },
  {
    src: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 210 70" width="210" height="70">
        <rect width="210" height="70" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
        <rect x="20" y="24" width="7" height="22" fill="#008751" rx="2"/>
        <rect x="29" y="24" width="7" height="10" fill="#FCD116" rx="1"/>
        <rect x="29" y="36" width="7" height="10" fill="#E8112D" rx="1"/>
        <text x="46" y="33" fill="#0A4D80" font-family="Inter, sans-serif" font-size="12" font-weight="800">RÉPUBLIQUE DU BÉNIN</text>
        <text x="46" y="48" fill="#64748B" font-family="Inter, sans-serif" font-size="10" font-weight="600">MINISTÈRE DES TRANSPORTS</text>
      </svg>
    `)}`,
    alt: 'Ministère des Transports - République du Bénin',
    title: 'République du Bénin',
  },
];

const PARTNER_DETAILS = [
  {
    name: 'ANAC Bénin',
    role: 'Autorité de Régulation & Sécurité',
    desc: 'Certification des appareils, agrément d\'exploitation et respect rigoureux des normes aéronautiques.',
    icon: ShieldCheck,
  },
  {
    name: 'Aéroports de Cotonou & Tourou',
    role: 'Gestion Aérogare & Assistance Sol',
    desc: 'Guichets d\'enregistrement réservés, salon d\'honneur VIP et priorité de traitement bagages.',
    icon: Building2,
  },
  {
    name: 'ASECNA',
    role: 'Navigation & Contrôle Aérien',
    desc: 'Surveillance radar permanente et guidage de précision pour des vols 100% sécurisés.',
    icon: Award,
  },
];

export default function Partners() {
  return (
    <section id="partenaires" className="py-20 bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand-blue/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C69214]" />
            <span>Réseau Institutionnel & Aéronautique</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark tracking-tight">
            Nos Partenaires & Alliances Stratégiques
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-normal">
            Amazone Airlines opère en synergie avec l’Aviation Civile, les gestionnaires d’aéroports et les leaders de la maintenance aérienne pour vous garantir confort et sécurité sans compromis.
          </p>
        </div>

        {/* Continuous Infinite Logo Marquee (LogoLoop from React Bits) */}
        <div className="my-8 py-4">
          <LogoLoop
            logos={PARTNER_LOGOS}
            speed={65}
            direction="left"
            logoHeight={60}
            gap={36}
            hoverSpeed={0}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#F8FAFC"
            ariaLabel="Partenaires officiels Amazone Airlines"
          />
        </div>

        {/* Bottom Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {PARTNER_DETAILS.map((partner) => {
            const IconComp = partner.icon;
            return (
              <div
                key={partner.name}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center shrink-0 border border-blue-100">
                  <IconComp className="w-6 h-6 text-[#0A4D80]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900 text-base tracking-tight">
                    {partner.name}
                  </h3>
                  <span className="text-xs font-semibold text-[#C69214] block">
                    {partner.role}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal pt-1">
                    {partner.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
