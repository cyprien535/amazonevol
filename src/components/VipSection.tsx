import React from 'react';
import { Award, Sparkles, Shield, Clock, HelpCircle, ArrowRight, GlassWater } from 'lucide-react';
import { motion } from 'motion/react';
import { IMAGES } from '../data';

interface VipSectionProps {
  onSelectVip: () => void;
}

export default function VipSection({ onSelectVip }: VipSectionProps) {
  const vipFeatures = [
    {
      title: 'Salons Privés d\'Exception',
      desc: 'Salons VIP exclusifs à Cotonou et Parakou avec rafraîchissements haut de gamme, Wi-Fi et discrétion absolue.',
      icon: Award,
    },
    {
      title: 'Service Gastronomique Local',
      desc: 'Menus d\'exception inspirés de la cuisine béninoise raffinée, élaborés à la demande par nos chefs partenaires.',
      icon: GlassWater,
    },
    {
      title: 'Flexibilité d\'Horaires Totale',
      desc: 'Votre temps est précieux : l\'appareil décolle selon vos impératifs professionnels et personnels.',
      icon: Clock,
    },
    {
      title: 'Sécurité & Escorte Diplomatique',
      desc: 'Accréditations gouvernementales et protocoles de haute sécurité assurés par nos équipes chevronnées.',
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
                <span>Aviation d'affaires & Salons Exclusifs</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-white [text-wrap:balance]">
                L'expérience VIP Amazone : discrétion et excellence
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed tracking-wide">
                Optez pour le summum de l'aviation privée au Bénin. Que ce soit pour une mission gouvernementale, un rendez-vous d'affaires urgent ou un déplacement familial exclusif, bénéficiez d'un accompagnement personnalisé d'exception.
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
                      <h4 className="font-bold text-white text-sm font-display">
                        {item.title}
                      </h4>
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
                className="bg-[#C69214] hover:bg-[#AF7F0E] text-white px-7 py-3.5 rounded-xl font-display font-extrabold text-base shadow-lg shadow-[#C69214]/20 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Demander une réservation VIP</span>
                <ArrowRight className="w-4 h-4 text-white" />
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
