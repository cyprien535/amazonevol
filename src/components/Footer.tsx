import React, { useState } from 'react';
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const quickLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Nos Avantages', href: '#avantages' },
    { name: 'Notre Flotte', href: '#flotte' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Expérience VIP', href: '#vip' },
  ];

  const legalLinks = [
    { name: "Conditions de Vente & Transport", href: "#" },
    { name: "Règles de Confidentialité", href: "#" },
    { name: "Mentions Légales", href: "#" },
    { name: "Droits des Passagers", href: "#" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-white/5 pt-20 pb-8 relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full filter blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Upper footer: Brand, Links, Contacts, and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand & Bio (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-2.5 rounded-2xl inline-block shadow-inner">
              <img
                src="https://flyamazoneair.bj/upload/images/654030974894001768899700.png"
                alt="Amazone Airlines Logo"
                referrerPolicy="no-referrer"
                className="h-9 w-auto object-contain"
              />
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Première compagnie aérienne haut de gamme du Bénin, nous réinventons le transport régional en combinant ponctualité rigoureuse, sécurité certifiée et art de vivre béninois.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              {[
                { Icon: Facebook, href: '#', name: 'Facebook' },
                { Icon: Twitter, href: '#', name: 'Twitter' },
                { Icon: Instagram, href: '#', name: 'Instagram' },
                { Icon: Linkedin, href: '#', name: 'LinkedIn' },
              ].map((social) => {
                const IconComp = social.Icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-yellow hover:bg-brand-blue hover:border-brand-blue transition-all duration-300 transform hover:-translate-y-1"
                    title={social.name}
                  >
                    <IconComp className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links (2 columns) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-brand-yellow hover:underline underline-offset-4 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Support info (3 columns) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">
              Aérogares & Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-yellow shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block text-xs uppercase mb-0.5">Siège Social & Agence</span>
                  <span className="text-slate-400">Zone Résidentielle, Boulevard de la Marina, Cotonou, Bénin.</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-yellow shrink-0" />
                <div>
                  <span className="font-bold text-white block text-xs uppercase mb-0.5">Assistance client</span>
                  <span className="text-slate-400 font-mono">+229 21 97 97 97</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-yellow shrink-0" />
                <div>
                  <span className="font-bold text-white block text-xs uppercase mb-0.5">Email Support</span>
                  <span className="text-slate-400 font-mono">contact@amazoneairlines.bj</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Box (3 columns) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">
              Newsletter Amazone
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Inscrivez-vous pour recevoir en avant-première nos offres exclusives de vols et l'ouverture de nos nouvelles destinations.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="votre.email@domaine.bj"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white focus:border-brand-yellow focus:outline-none focus:ring-1 focus:ring-brand-yellow"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-brand-yellow hover:text-white p-2 transition-colors"
                  title="S'inscrire"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {subscribed && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs p-2.5 rounded-lg flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inscription prise en compte avec succès !</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Lower footer: Legal bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>
            <p>© {new Date().getFullYear()} Amazone Airlines BJ. Tous droits réservés.</p>
            <p className="text-[10px] mt-1 text-slate-600">
              Agrément de transporteur aérien civil n° BJ-2026-AMZ. Opéré en stricte conformité avec l'ANAC Bénin.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {legalLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-brand-yellow transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
