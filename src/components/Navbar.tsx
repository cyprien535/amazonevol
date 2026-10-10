import React, { useState, useEffect } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../data';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenContact?: () => void;
  onOpenLogin?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('accueil');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolledPastHero(scrollY > 300);

      const sections = ['hero', 'avantages', 'flotte', 'destinations', 'vip'];
      const scrollPosition = scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', name: 'Accueil', href: '#hero' },
    { id: 'avantages', name: 'Avantages', href: '#avantages' },
    { id: 'flotte', name: 'Flotte', href: '#flotte' },
    { id: 'destinations', name: 'Destinations', href: '#destinations' },
  ];

  if (!scrolledPastHero) {
    return null;
  }

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-5xl z-50">
        {/* Capsule flottante style capture d'écran */}
        <div className="bg-white/95 backdrop-blur-xl border border-amber-200/50 shadow-lg shadow-black/5 rounded-full px-4 sm:px-8 py-2 sm:py-2.5 transition-all">
          <div className="flex items-center justify-between gap-4">
            
            {/* 1. Logo à gauche */}
            <a href="#accueil" className="flex items-center shrink-0 group">
              <img
                src={IMAGES.logo}
                alt="Amazone Airlines Logo"
                width={120}
                height={53}
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                loading="eager"
                decoding="async"
              />
            </a>

            {/* 2. Les 3 liens vers les sections */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-10" aria-label="Navigation principale">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`text-sm tracking-wide transition-all duration-200 relative py-1 ${
                      isActive
                        ? 'text-[#C69214] font-bold after:content-[""] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2.5px] after:bg-[#C69214] after:rounded-full'
                        : 'text-slate-700 hover:text-slate-900 font-medium'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* 3. Bouton Réserver un vol avec éclat lumineux au toucher */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenBooking}
                className="group relative overflow-hidden bg-gradient-to-r from-[#B8860B] via-[#C69214] to-[#D4A017] hover:from-[#C69214] hover:to-[#E5A81B] text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2.5 rounded-full shadow-md shadow-[#C69214]/25 hover:shadow-[0_0_24px_rgba(198,146,20,0.65)] border border-amber-200/40 transition-all duration-300 cursor-pointer active:scale-95 whitespace-nowrap flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                {/* Rayon lumineux qui traverse et fait briller le bouton au survol / toucher */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full group-active:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                {/* Icône avion en vol avec impulsion */}
                <Plane className="w-3.5 h-3.5 text-white -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0" />
                <span className="tracking-wide relative z-10">Réserver un vol</span>
              </button>

              {/* Toggle mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded-full text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Tiroir Mobile épuré pour les 3 liens */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 bg-white/95 backdrop-blur-xl border border-amber-200/50 rounded-3xl p-4 shadow-xl space-y-2 text-center"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2.5 text-sm font-semibold rounded-xl transition-all ${
                      isActive
                        ? 'text-[#C69214] bg-amber-50 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

