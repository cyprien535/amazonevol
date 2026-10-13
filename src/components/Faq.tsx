import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    category: 'Vols & Horaires',
    question: 'Combien de temps dure le vol direct entre Cotonou et Parakou ?',
    answer:
      'Le vol direct dure exactement 1h15 de bloc à bloc à bord de nos avions régionaux ATR 42-500. C’est un gain de temps décisif de plus de 8 heures par rapport au trajet routier sur la RNIE 2, vous permettant de faire l’aller-retour dans la journée.',
  },
  {
    category: 'Bagages & Franchises',
    question: 'Quelle est la franchise de bagages incluse dans mon billet ?',
    answer:
      'Chaque passager bénéficie sans frais supplémentaires de 23 kg de bagages enregistrés en soute et de 7 kg de bagage en cabine. La restitution des bagages est prioritaire et s’effectue en moins de 15 minutes dès l’atterrissage.',
  },
  {
    category: 'Fréquence & Départs',
    question: 'Quelles sont les fréquences et les horaires des rotations ?',
    answer:
      'Amazone Airlines assure 3 rotations quotidiennes régulières 7 jours sur 7 : un vol matin (départ 07h15), un vol à la mi-journée (départ 12h00) et un vol en fin de journée (départ 16h30) entre Cotonou-Cadjehoun (COO) et Parakou-Tourou (PKO).',
  },
  {
    category: 'Aviation Privée & VIP',
    question: 'Comment réserver un vol VIP ou affréter un appareil complet ?',
    answer:
      'Pour les missions d’entreprises, délégations officielles ou déplacements urgents, notre flotte de jets Falcon 2000S VIP et charters est mobilisable sur devis personnalisé. Vous bénéficiez d’un accès exclusif aux salons d’honneur et d’horaires de vol sur mesure.',
  },
  {
    category: 'Enregistrement & Sécurité',
    question: 'À quelle heure dois-je me présenter à l’aéroport ?',
    answer:
      'Les comptoirs d’enregistrement ouvrent 1h30 avant le décollage et ferment 30 minutes avant l’heure de départ prévue. Un accueil fluide et personnalisé vous est réservé aux aérogares de Cotonou-Cadjehoun et de Parakou-Tourou.',
  },
];

interface FaqProps {
  onOpenContact?: () => void;
}

export default function Faq({ onOpenContact }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/3 right-[-10%] w-[500px] h-[500px] bg-brand-blue/5 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            <HelpCircle className="w-3.5 h-3.5 text-[#C69214]" />
            <span>Assistance & Informations Pratiques</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-brand-dark tracking-tight [text-wrap:balance]">
            Questions Fréquentes
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
            Retrouvez toutes les réponses essentielles pour préparer votre vol direct entre Cotonou et Parakou ou organiser vos déplacements VIP.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm transition-all duration-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-[#C69214] uppercase tracking-wider block font-mono">
                      {item.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 tracking-tight">
                      {item.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-300 text-slate-600 ${
                      isOpen ? 'rotate-180 bg-[#0A4D80] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-7 pb-6 pt-0 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4 font-normal">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact Help Banner */}
        <div className="mt-12 p-6 sm:p-8 bg-[#071322] text-white rounded-3xl border border-slate-700/80 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-semibold text-white tracking-tight">
              Une autre question concernant votre voyage ?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-normal">
              Notre équipe d’assistance client et notre service d’accueil restent à votre disposition 7j/7.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="bg-gradient-to-r from-[#B8860B] via-[#C69214] to-[#D4A017] hover:from-[#C69214] hover:to-[#E5A81B] text-white px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Nous contacter</span>
              </button>
            )}
            <a
              href="tel:+22921979797"
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm border border-white/15 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#C69214]" />
              <span>+229 21 97 97 97</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
