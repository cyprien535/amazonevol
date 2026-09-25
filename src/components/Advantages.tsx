import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function Advantages() {
  const steps = [
    {
      number: '01',
      title: 'Gain de temps radical',
      description:
        'Reliez Cotonou à Parakou en seulement 1h15 de vol direct, contre 8 à 10 heures d’épreuve sur la route RNIE 2.',
    },
    {
      number: '02',
      title: 'Ponctualité garantie 98.7%',
      description:
        '3 rotations quotidiennes fixes entre Cotonou-Cadjehoun et Parakou-Tourou pour sécuriser vos réunions professionnelles sans retard.',
    },
    {
      number: '03',
      title: 'Sécurité certifiée OACI & ANAC',
      description:
        'Flotte sous maintenance certifiée Part-145, inspections systématiques et pilotes chevronnés formés sur simulateurs certifiés.',
    },
    {
      number: '04',
      title: 'Confort & Cabine pressurisée',
      description:
        'Sièges cuir inclinables, climatisation régulée et service d’accueil avec rafraîchissements locaux et eau Possotomé offerts.',
    },
    {
      number: '05',
      title: 'Bagages inclus sans supplément',
      description:
        'Franchise de 23 kg en soute et 7 kg en cabine incluse sur tous les billets. Récupération rapide en moins de 10 minutes au sol.',
    },
    {
      number: '06',
      title: 'Salons & Services VIP exclusifs',
      description:
        'Accès aux salons d’attente VIP, embarquement express en 15 minutes et flexibilité pour les délégations d’affaires et familles.',
    },
  ];

  const leftSteps = [steps[0], steps[2], steps[4]];
  const rightSteps = [steps[1], steps[3], steps[5]];

  return (
    <section id="avantages" className="py-24 bg-white relative overflow-hidden">
      {/* Background soft grid */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(#0A4D80_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#0A4D80]/10 text-[#0A4D80] text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#C69214]" />
            <span>Pourquoi choisir Amazone Airlines</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-brand-dark tracking-tight [text-wrap:balance]">
            Le transport aérien moderne au service de vos déplacements au Bénin
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Conçu pour les entrepreneurs, hauts cadres, délégations officielles et familles exigeantes souhaitant relier le Sud et le Nord du pays en toute sérénité.
          </p>
        </div>

        {/* Desktop Zig-Zag Staggered Layout with Connecting Curves */}
        <div className="relative">
          
          {/* Subtle SVG Dashed Connectors for Desktop */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 900"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Curve 1: Card 01 -> Card 02 */}
              <path
                d="M 460 140 C 510 140, 520 230, 560 230"
                stroke="#0A4D80"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeOpacity="0.25"
              />
              {/* Curve 2: Card 02 -> Card 03 */}
              <path
                d="M 560 330 C 510 330, 520 420, 460 420"
                stroke="#0A4D80"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeOpacity="0.25"
              />
              {/* Curve 3: Card 03 -> Card 04 */}
              <path
                d="M 460 520 C 510 520, 520 610, 560 610"
                stroke="#0A4D80"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeOpacity="0.25"
              />
              {/* Curve 4: Card 04 -> Card 05 */}
              <path
                d="M 560 710 C 510 710, 520 800, 460 800"
                stroke="#0A4D80"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeOpacity="0.25"
              />
            </svg>
          </div>

          {/* 2-Column Staggered Grid on Desktop, 1-Column on Mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10">
            
            {/* Left Column (01, 03, 05) */}
            <div className="space-y-12 lg:space-y-24">
              {leftSteps.map((item, idx) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="relative bg-[#F4F7FB] border border-[#D4E0EE] rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  {/* Top Pin matching the screenshot */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#0A4D80] border-2 border-white shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C69214]"></div>
                  </div>

                  {/* Giant Outlined Number */}
                  <div className="mb-2">
                    <span
                      className="text-4xl sm:text-5xl font-display font-black tracking-tight select-none block"
                      style={{
                        WebkitTextStroke: '2px #0A4D80',
                        color: 'transparent',
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-2 group-hover:text-[#0A4D80] transition-colors">
                    {item.title}
                  </h3>

                  {/* Body text */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Right Column (02, 04, 06) - Staggered down */}
            <div className="space-y-12 lg:space-y-24 lg:pt-24">
              {rightSteps.map((item, idx) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.15 + 0.1, duration: 0.5 }}
                  className="relative bg-[#F4F7FB] border border-[#D4E0EE] rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  {/* Top Pin matching the screenshot */}
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#0A4D80] border-2 border-white shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C69214]"></div>
                  </div>

                  {/* Giant Outlined Number */}
                  <div className="mb-2">
                    <span
                      className="text-4xl sm:text-5xl font-display font-black tracking-tight select-none block"
                      style={{
                        WebkitTextStroke: '2px #0A4D80',
                        color: 'transparent',
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-2 group-hover:text-[#0A4D80] transition-colors">
                    {item.title}
                  </h3>

                  {/* Body text */}
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}


