import React from 'react';
import { Award, Sparkles, Shield, Clock, HelpCircle, ArrowRight, GlassWater, Plane } from 'lucide-react';
import { motion } from 'motion/react';
import { IMAGES } from '../data';

interface VipSectionProps {
  onSelectVip: () => void;
}

export default function VipSection({ onSelectVip }: VipSectionProps) {
  const vipFeatures = [
    {
      title: 'Salons d\'attente dédiés',
      desc: 'Espaces calmes et connectés à Cotonou et Parakou avant votre embarquement.',
      icon: Award,
    },
    {
      title: 'Service de bord personnalisé',
      desc: 'Collations raffinées, rafraîchissements locaux et boissons adaptées à vos préférences de vol.',
      icon: GlassWater,
    },
    {
      title: 'Horaires à votre convenance',
      desc: 'Votre agenda dicte le départ : ajustement en fonction de vos réunions et correspondances.',
      icon: Clock,
    },
    {
      title: 'Confidentialité et sécurité',
      desc: 'Accompagnement protocolaire, discrétion absolue et formalités d\'embarquement prioritaires.',
      icon: Shield,
    },
  ];

  return (
    <section id="vip" className="py-24 bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative gradient backdrops */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/10 rounded-full filter blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full filter blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 lg:items-center">
          
          {/* Visual Showcase (5 Columns) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-950/80 border border-white/10"
            >
              <img
                src={IMAGES.vipInterior}
                alt="Intérieur cabine de luxe VIP Amazone Airlines"
                width={800}
                height={500}
                loading="lazy"
                decoding="async"
                className="w-full h-[420px] sm:h-[460px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {/* Luxury dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

              {/* Floating micro-badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md border border-brand-yellow/30 p-4 rounded-xl flex items-center justify-between shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-yellow text-slate-950 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-yellow uppercase tracking-wider font-mono">
                      Service Conciergerie VIP
                    </p>
                    <p className="text-[11px] text-slate-300">
                      Disponibilité 24h/24 & 7j/7 au Bénin
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Description Text & Grid (7 Columns) */}
          <div className="lg:col-span-7 space-y-7">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow font-mono font-bold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                <Award className="w-3.5 h-3.5" />
                <span>Aviation d'affaires</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white [text-wrap:balance]">
                Vols privés et affrètement sur mesure
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed tracking-wide">
                Pour vos déplacements d'urgence, missions officielles, délégations d'entreprise ou voyages en famille, affrétez un appareil selon vos horaires et vos contraintes.
              </p>
            </div>

            {/* Core features block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vipFeatures.map((item) => {
                const IconComp = item.icon;
                return (
                  <div key={item.title} className="flex gap-3.5 bg-white/5 border border-white/10 p-4 rounded-xl">
                    <div className="w-9 h-9 rounded-lg bg-brand-yellow/15 border border-brand-yellow/30 text-brand-yellow flex items-center justify-center shrink-0 mt-0.5">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm font-display">
                        {item.title}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  onSelectVip();
                }}
                className="group relative overflow-hidden bg-gradient-to-r from-[#B8860B] via-[#C69214] to-[#D4A017] hover:from-[#C69214] hover:to-[#E5A81B] text-white px-7 py-3.5 rounded-xl font-display font-extrabold text-base shadow-lg shadow-[#C69214]/25 hover:shadow-[0_0_30px_rgba(198,146,20,0.6)] border border-amber-200/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                {/* Rayon de brillance au toucher/survol */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full group-active:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />

                <Plane className="w-4 h-4 text-white -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span className="relative z-10">Demander un devis de vol privé</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform relative z-10" />
              </button>

              <span className="text-xs text-slate-400 text-center sm:text-left font-mono">
                Ou par téléphone direct : <strong className="text-white">+229 21 97 97 97</strong>
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
