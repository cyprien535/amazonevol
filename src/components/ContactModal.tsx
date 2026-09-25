import React, { useState } from 'react';
import { X, Phone, Mail, MapPin, Send, HelpCircle, CheckCircle2, ChevronDown, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  const faqs = [
    {
      q: 'Quelles sont les franchises bagages autorisées ?',
      a: 'Pour la classe Économie Premium, vous bénéficiez de 23 kg en soute et de 8 kg en cabine. Pour la classe Affaires et VIP Elite, vous bénéficiez de 32 kg en soute et 10 kg en cabine. Les bagages supplémentaires peuvent être souscrits en ligne pour 15 000 FCFA.',
    },
    {
      q: 'Est-il possible de modifier ou annuler mon billet ?',
      a: "Oui, tous nos billets sont modifiables sans frais jusqu'à 24h avant le départ (seule la différence tarifaire éventuelle s'applique). Les annulations sont remboursées sous forme d'avoir valable 1 an pour les billets Éco, et remboursées intégralement sur Mobile Money pour les classes Affaires et VIP.",
    },
    {
      q: 'Quelles sont les garanties en cas de retard de vol ?',
      a: "Amazone Airlines garantit une ponctualité rigoureuse (98.7% d'indice de régularité). En cas de retard de plus de 45 minutes imputable à la compagnie, un bon de réduction de 20 000 FCFA vous est offert sur votre prochain vol, ainsi que des collations gratuites au salon d'aéroport.",
    },
    {
      q: 'Comment s\'effectue l\'enregistrement à l\'aéroport ?',
      a: "L'enregistrement physique à l'aéroport de Cotonou ou de Parakou ouvre 2 heures avant le vol et ferme 30 minutes avant le départ. Munissez-vous simplement de votre carte d'identité béninoise (CIP/CNI) ou de votre passeport ainsi que de la carte d'embarquement reçue par e-mail.",
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-none w-full max-w-4xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] border border-slate-200"
          >
            {/* Left side: Contacts & FAQ (7 Columns on desktop) */}
            <div className="md:col-span-7 p-6 sm:p-8 overflow-y-auto max-h-[45vh] md:max-h-none border-b md:border-b-0 md:border-r border-slate-100 space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-display font-extrabold text-brand-dark">
                  Support & Foire Aux Questions
                </h3>
                <p className="text-slate-500 text-sm">
                  Notre équipe est disponible 24h/24 pour répondre à toutes vos interrogations.
                </p>
              </div>

              {/* Direct Contacts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 bg-slate-50 rounded-none border border-slate-100 flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-dark block text-xs uppercase mb-0.5">Téléphone client</span>
                    <a href="tel:+22921979797" className="text-brand-blue font-semibold font-mono hover:underline">
                      +229 21 97 97 97
                    </a>
                    <span className="text-slate-400 text-[10px] block mt-0.5">Appel non surtaxé</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-none border border-slate-100 flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-brand-dark block text-xs uppercase mb-0.5">Email Support</span>
                    <a href="mailto:contact@amazoneairlines.bj" className="text-brand-blue font-semibold font-mono hover:underline">
                      contact@amazoneairlines.bj
                    </a>
                    <span className="text-slate-400 text-[10px] block mt-0.5">Réponse en moins d'1h</span>
                  </div>
                </div>
              </div>

              {/* FAQ Accordions */}
              <div className="space-y-3">
                <h4 className="font-display font-bold text-brand-dark text-base uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-brand-blue" />
                  Questions fréquentes
                </h4>

                <div className="space-y-2">
                  {faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-100 rounded-none overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full bg-slate-50 hover:bg-slate-100/75 p-4 flex justify-between items-center text-left text-sm font-semibold text-slate-800 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform ${
                            activeFaq === idx ? 'rotate-180 text-brand-blue' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {activeFaq === idx && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden bg-white"
                          >
                            <p className="p-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/20">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Send Message (5 Columns on desktop) */}
            <div className="md:col-span-5 p-6 sm:p-8 bg-slate-50 flex flex-col justify-between max-h-[45vh] md:max-h-none overflow-y-auto relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-none hover:bg-slate-200 text-slate-400 hover:text-slate-700 transition-colors"
                title="Fermer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-dark">
                    Contactez-nous
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Laissez-nous un message et notre service client béninois vous rappellera rapidement.
                  </p>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500/10 border border-emerald-500/20 rounded-none p-6 text-center space-y-3"
                  >
                    <div className="w-12 h-12 rounded-none bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-emerald-700 text-sm">Message envoyé !</h4>
                    <p className="text-slate-600 text-xs">
                      Merci pour votre intérêt. Notre équipe d'assistance de Cotonou s'occupe de traiter votre requête sous 30 minutes.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                        Nom Complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-slate-200 bg-white rounded-none px-4 py-2.5 text-xs sm:text-sm focus:border-brand-blue focus:outline-none"
                        placeholder="Ex: Koffi Soglo"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                        Adresse Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-slate-200 bg-white rounded-none px-4 py-2.5 text-xs sm:text-sm focus:border-brand-blue focus:outline-none"
                        placeholder="koffi@domaine.bj"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                        Votre Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border border-slate-200 bg-white rounded-none px-4 py-2.5 text-xs sm:text-sm focus:border-brand-blue focus:outline-none"
                        placeholder="Comment pouvons-nous vous aider aujourd'hui ?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3 rounded-none transition-all shadow flex items-center justify-center gap-2 text-sm"
                    >
                      <Send className="w-4 h-4 text-brand-yellow" />
                      Envoyer le message
                    </button>
                  </form>
                )}
              </div>

              <div className="pt-6 border-t border-slate-200 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>Temps de réponse estimé : ~15 minutes</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
