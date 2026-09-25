import React from 'react';
import { Zap, ShieldCheck, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ADVANTAGES } from '../data';

export default function Advantages() {
  const iconMap: Record<string, React.ComponentType<any>> = {
    Zap: Zap,
    ShieldCheck: ShieldCheck,
    Sparkles: Sparkles,
    Clock: Clock,
  };

  return (
    <section id="avantages" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative vector grid backdrop */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#0065A1_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-brand-blue font-mono font-bold text-xs uppercase tracking-widest bg-brand-blue/10 px-3.5 py-1.5 rounded-full inline-block">
            Pourquoi voyager avec nous ?
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-brand-dark tracking-tight">
            Redéfinir le voyage domestique au Bénin
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
            Nous avons conçu Amazone Airlines pour répondre aux exigences de confort, de rapidité et de sécurité de la nouvelle génération béninoise.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ADVANTAGES.map((adv, index) => {
            const IconComponent = iconMap[adv.icon] || Sparkles;
            return (
              <motion.div
                key={adv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative bg-slate-50 hover:bg-white rounded-none p-8 border border-slate-200/80 hover:border-brand-blue/30 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Glowing subtle square decoration behind icon */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-brand-blue/5 rounded-none group-hover:bg-brand-blue/10 group-hover:scale-125 transition-all duration-300"></div>

                <div className="space-y-6">
                  {/* Icon wrap with accent coloring */}
                  <div className="w-14 h-14 rounded-none bg-brand-blue text-brand-yellow flex items-center justify-center shadow-md shadow-brand-blue/10 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-bold text-brand-dark group-hover:text-brand-blue transition-colors">
                      {adv.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs font-bold text-brand-blue group-hover:text-brand-yellow transition-colors">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
