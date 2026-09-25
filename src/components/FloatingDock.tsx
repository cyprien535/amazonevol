import React, { useState, useEffect } from 'react';
import { Plane, Phone, ArrowUp, Sparkles, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingDockProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
  onOpenLogin: () => void;
}

export default function FloatingDock({
  onOpenBooking,
  onOpenContact,
  onOpenLogin,
}: FloatingDockProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal dock once user has scrolled past top hero section
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', damping: 25, stiffness: 260 }}
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-full px-3"
        >
          {/* Floating Dock Capsule with Rounded Pill Shape */}
          <div className="bg-slate-950/60 backdrop-blur-2xl border border-white/20 shadow-2xl text-white px-3 sm:px-5 py-2 flex items-center gap-2 sm:gap-3 rounded-full">
            
            {/* Quick Route Status */}
            <div className="hidden lg:flex items-center gap-2 border-r border-white/10 pr-3.5 font-mono text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">Liaison :</span>
              <span className="font-bold text-brand-yellow">COO ↔ PKO</span>
            </div>

            {/* Quick CTA: Book a flight */}
            <button
              onClick={onOpenBooking}
              className="bg-brand-yellow hover:bg-amber-400 text-brand-dark px-3.5 sm:px-4 py-1.5 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all duration-200 active:scale-95 cursor-pointer rounded-full"
            >
              <Plane className="w-4 h-4 transform -rotate-45" />
              <span>Réserver un vol</span>
            </button>

            {/* VIP section quick jump */}
            <a
              href="#vip"
              className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-brand-yellow hover:bg-white/10 rounded-full transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
              <span className="hidden sm:inline">VIP</span>
            </a>

            {/* Quick Contact Modal */}
            <button
              onClick={onOpenContact}
              className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-brand-yellow hover:bg-white/10 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
              title="Assistance 24h/24"
            >
              <Phone className="w-3.5 h-3.5 text-brand-yellow" />
              <span className="hidden sm:inline">Support</span>
            </button>

            {/* Club Login */}
            <button
              onClick={onOpenLogin}
              className="px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-brand-yellow hover:bg-white/10 rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
              title="Espace Fidélité Club"
            >
              <User className="w-3.5 h-3.5 text-brand-yellow" />
              <span className="hidden md:inline">Club</span>
            </button>

            {/* Divider */}
            <div className="w-px h-6 bg-white/10 mx-0.5"></div>

            {/* Scroll to Top */}
            <button
              onClick={scrollToTop}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Retour en haut"
              aria-label="Retour en haut"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
