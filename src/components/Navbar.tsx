import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenContact?: () => void;
  onOpenLogin?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('accueil');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['accueil', 'flotte', 'destinations'];
      const scrollPosition = window.scrollY + 200;

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
    { id: 'accueil', name: 'Accueil', href: '#accueil' },
    { id: 'flotte', name: 'Flotte', href: '#flotte' },
    { id: 'destinations', name: 'Destinations', href: '#destinations' },
  ];

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-5xl z-50">
        {/* Capsule flottante style capture d'écran */}
        <div className="bg-white/95 backdrop-blur-xl border border-amber-200/50 shadow-lg shadow-black/5 rounded-full px-4 sm:px-8 py-2 sm:py-2.5 transition-all">
          <div className="flex items-center justify-between gap-4">
            
            {/* 1. Logo à gauche */}
            <a href="#accueil" className="flex items-center shrink-0 group">
              <img
                src="https://flyamazoneair.bj/upload/images/654030974894001768899700.png"
                alt="Amazone Airlines Logo"
                referrerPolicy="no-referrer"
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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

            {/* 3. Bouton Réserver un vol */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenBooking}
                className="bg-[#C69214] hover:bg-[#B5820E] text-white font-bold text-xs sm:text-sm px-5 sm:px-7 py-2.5 rounded-full shadow-sm hover:shadow transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                Réserver un vol
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

