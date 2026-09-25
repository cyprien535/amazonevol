import React, { useState, useEffect } from 'react';
import { Plane, User, Phone, Compass, Info, Award, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenContact: () => void;
  onOpenLogin: () => void;
}

export default function Navbar({ onOpenBooking, onOpenContact, onOpenLogin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      // Toggle background opacity based on scroll
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Detect active section for dynamic adaptive highlights
      const sections = ['accueil', 'avantages', 'flotte', 'destinations', 'vip'];
      const scrollPosition = window.scrollY + 180;

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
    { id: 'accueil', name: 'Accueil', href: '#accueil', icon: Compass },
    { id: 'avantages', name: 'Avantages', href: '#avantages', icon: Award },
    { id: 'flotte', name: 'Flotte', href: '#flotte', icon: Plane },
    { id: 'destinations', name: 'Destinations', href: '#destinations', icon: Calendar },
    { id: 'vip', name: 'Expérience VIP', href: '#vip', icon: Info },
  ];

  return (
    <>
      <header
        className={`fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-3rem)] max-w-6xl z-50 transition-all duration-300 rounded-full ${
          isScrolled
            ? 'bg-white/75 backdrop-blur-xl shadow-xl shadow-brand-blue/10 border border-slate-900/10 py-2 px-5 sm:px-7'
            : 'bg-slate-950/25 backdrop-blur-md border border-white/20 shadow-lg py-2.5 px-5 sm:px-7'
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#accueil" className="flex items-center space-x-3 group">
              <img
                src="https://flyamazoneair.bj/upload/images/654030974894001768899700.png"
                alt="Amazone Airlines Logo"
                referrerPolicy="no-referrer"
                className="h-8 sm:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </a>

            {/* Desktop Navigation with Adaptive Colors & Rounded Pill Shapes */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                      isScrolled
                        ? isActive
                          ? 'text-brand-blue bg-brand-blue/10 font-bold'
                          : 'text-slate-800 hover:text-brand-blue hover:bg-slate-900/5'
                        : isActive
                          ? 'text-brand-yellow bg-white/20 font-bold'
                          : 'text-white/90 hover:text-brand-yellow hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Adaptive Rounded Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenContact}
                className={`hidden sm:flex text-xs sm:text-sm font-semibold transition-all px-3.5 py-1.5 items-center gap-1.5 cursor-pointer rounded-full ${
                  isScrolled
                    ? 'text-slate-700 hover:text-brand-blue hover:bg-slate-100 border border-slate-300/70'
                    : 'text-white/95 hover:text-brand-yellow hover:bg-white/10 border border-white/20'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                Contact
              </button>

              <button
                onClick={onOpenLogin}
                className={`hidden md:flex text-xs sm:text-sm font-semibold transition-all px-3.5 py-1.5 items-center gap-1.5 cursor-pointer rounded-full ${
                  isScrolled
                    ? 'text-slate-700 hover:text-brand-blue hover:bg-slate-100 border border-slate-300/70'
                    : 'text-white/95 hover:text-brand-yellow hover:bg-white/10 border border-white/20'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Club
              </button>
              
              <button
                onClick={onOpenBooking}
                className="bg-brand-yellow hover:bg-amber-400 text-brand-dark px-3.5 sm:px-4.5 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-sm hover:shadow transition-all duration-200 transform hover:-translate-y-0.5 flex items-center gap-1.5 border border-brand-yellow hover:border-amber-400 cursor-pointer"
              >
                <Plane className="w-3.5 h-3.5 transform -rotate-45" />
                Réserver
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
