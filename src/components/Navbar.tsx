import React, { useState, useEffect } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IMAGES } from '../data';
import MagneticButton from './MagneticButton';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenContact?: () => void;
  onOpenLogin?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('start');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolledPastHero(scrollY > 350);

      const sectionMap: { [key: string]: string } = {
        hero: 'start',
        avantages: 'story',
        destinations: 'rates',
        flotte: 'benefits',
        vip: 'faq',
      };

      const sectionIds = ['hero', 'avantages', 'destinations', 'flotte', 'vip'];
      const scrollPosition = scrollY + 220;

      for (const sectionId of sectionIds) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionMap[sectionId] || 'start');
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'start', name: 'Start', href: '#hero' },
    { id: 'story', name: 'Story', href: '#avantages' },
    { id: 'rates', name: 'Rates', href: '#destinations' },
    { id: 'benefits', name: 'Benefits', href: '#flotte' },
    { id: 'faq', name: 'FAQ', href: '#vip' },
  ];

  return (
    <AnimatePresence>
      {scrolledPastHero && (
        <motion.header
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-7xl z-50"
        >
          {/* Floating square-edged bar with Amazone Airlines logo and navigation */}
          <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/5 rounded-none px-5 sm:px-8 py-3 sm:py-3.5 transition-all duration-300">
            <div className="flex items-center justify-between gap-4">
              
              {/* Amazone Airlines Logo (sans arrière-plan) */}
              <a
                href="#hero"
                className="flex items-center gap-2 shrink-0 group transition-transform"
              >
                <img
                  src={IMAGES.logo}
                  alt="Amazone Airlines Logo"
                  width={140}
                  height={55}
                  className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
                  loading="eager"
                  decoding="async"
                />
              </a>

              {/* 5 Pro Desktop Navigation Links */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Menu principal">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`text-sm font-medium transition-colors relative py-1.5 ${
                        isActive
                          ? 'text-brand-blue font-semibold after:content-[""] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-brand-blue'
                          : 'text-gray-700 hover:text-gray-900'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </nav>

              {/* Right Action Button: Réserver un vol */}
              <div className="flex items-center gap-3 shrink-0">
                <MagneticButton
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 rounded-none text-white text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm bg-gradient-to-r from-[#B8860B] via-[#C69214] to-[#D4A017] hover:from-[#C69214] hover:to-[#E5A81B]"
                >
                  <Plane className="w-3.5 h-3.5 text-white -rotate-45" />
                  <span>Réserver un vol</span>
                </MagneticButton>

                {/* Mobile Hamburger Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-none text-gray-900 hover:bg-gray-100 transition-colors"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Drawer (Squared) */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="border border-slate-200/90 bg-white/95 backdrop-blur-xl px-6 py-4 shadow-2xl rounded-none space-y-2 mt-1"
              >
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-2.5 px-3 text-sm font-medium rounded-none transition-colors ${
                        isActive
                          ? 'text-brand-blue bg-blue-50/60 font-semibold border-l-2 border-brand-blue'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {link.name}
                    </a>
                  );
                })}

                <div className="pt-3 border-t border-gray-100">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenBooking();
                    }}
                    className="w-full py-2.5 rounded-none text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-[#B8860B] via-[#C69214] to-[#D4A017]"
                  >
                    <Plane className="w-4 h-4 text-white -rotate-45" />
                    <span>Réserver un vol</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
