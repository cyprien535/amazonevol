import React from 'react';
import LogoLoop, { LogoItem } from './LogoLoop';

// Real partner logos from public/assets/partenaires/
const PARTNER_LOGOS: LogoItem[] = [
  { src: '/assets/partenaires/169230032698001776066025.png', alt: 'Partenaire' },
  { src: '/assets/partenaires/260390105055001769127000.png', alt: 'Partenaire' },
  { src: '/assets/partenaires/267530505092001770145372.png', alt: 'Partenaire' },
  { src: '/assets/partenaires/310780668928001775583586.png', alt: 'Partenaire' },
  { src: '/assets/partenaires/586100378098001774130588.png', alt: 'Partenaire' },
  { src: '/assets/partenaires/691730851595001774130745.png', alt: 'Partenaire' },
  { src: '/assets/partenaires/905720299863001774130543.png', alt: 'Partenaire' },
  { src: '/assets/partenaires/945800486670001769126953.png', alt: 'Partenaire' },
];

export default function Partners() {
  return (
    <section id="partenaires" className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Clean minimal section header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-brand-blue font-semibold text-xs uppercase tracking-wider bg-brand-blue/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Ils nous font confiance
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-brand-dark tracking-tight">
            Nos Partenaires
          </h2>
        </div>

        {/* Pure logo carousel: no cards, no text, direct logo imagery */}
        <div className="py-4">
          <LogoLoop
            logos={PARTNER_LOGOS}
            speed={55}
            direction="left"
            logoHeight={52}
            gap={64}
            hoverSpeed={0}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#ffffff"
            ariaLabel="Logos de nos partenaires"
          />
        </div>

      </div>
    </section>
  );
}
