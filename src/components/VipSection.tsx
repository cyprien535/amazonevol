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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center">
          
          {/* Visual Showcase (5 Columns) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-none overflow-hidden shadow-2xl shadow-slate-950/50 border border-white/10"
            >
              <img
                src={IMAGES.vipInterior}
                alt="Amazone Airlines VIP Cabin Luxury"
                className="w-full h-[450px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
              {/* Luxury dark gold overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              {/* Floating micro-badge */}
              <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur border border-brand-yellow/30 px-4 py-3 rounded-none flex items-center gap-3">
                <div className="w-8 h-8 rounded-none bg-brand-yellow text-slate-950 flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <p className="text-xs font-bold text-brand-yellow uppercase tracking-widest font-mono">
                    Service Elite
                  </p>
                  <p className="text-[10px] text-slate-300">
                    Disponible 24h/24 & 7j/7
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Description Text & Grid (7 Columns) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-brand-yellow font-mono font-bold text-xs uppercase tracking-widest bg-brand-yellow/10 border border-brand-yellow/20 px-3.5 py-1.5 rounded-none inline-block">
                L'excellence à la carte
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
                Expérience VIP Amazone
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Optez pour le summum de l'aviation d'affaires en Afrique. Nos formules de vols privés et charters sur mesure s'adaptent entièrement à vos besoins de mobilité pour vous offrir une sérénité totale.
              </p>
            </div>

            {/* Core features block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {vipFeatures.map((item) => {
                const IconComp = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 bg-white/5 border border-white/5 p-4 rounded-none">
                    <div className="w-10 h-10 rounded-none bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow flex items-center justify-center shrink-0 mt-1">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base font-display">
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Primary Action Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  onSelectVip();
                }}
                className="bg-brand-yellow hover:bg-amber-400 text-brand-dark px-8 py-4 rounded-none font-display font-extrabold text-lg shadow-lg hover:shadow-brand-yellow/10 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3 border border-brand-yellow hover:border-amber-400"
              >
                RÉSERVER UN VOL VIP
                <ArrowRight className="w-5 h-5 text-brand-dark" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
