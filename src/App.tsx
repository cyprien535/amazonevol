import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingFlow from './components/BookingFlow';
import Advantages from './components/Advantages';
import Fleet from './components/Fleet';
import Destinations from './components/Destinations';
import VipSection from './components/VipSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import LoginModal from './components/LoginModal';
import { BookingState } from './types';
import { X } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState<BookingState | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // High-fidelity handlers to sync component actions
  const handleHeroSearch = (searchData: BookingState) => {
    setSearchQuery(searchData);
  };

  const handleSelectRoute = (dep: string, dest: string) => {
    setSearchQuery({
      departure: dep,
      destination: dest,
      date: new Date().toISOString().split('T')[0],
      passengers: 1,
      tripType: 'one-way',
    });
  };

  const handleSelectAircraft = (planeCategory: string) => {
    if (planeCategory.includes('VIP') || planeCategory.includes('Charter')) {
      handleSelectVip();
    } else {
      setSearchQuery({
        departure: 'Cotonou',
        destination: 'Parakou',
        date: new Date().toISOString().split('T')[0],
        passengers: 1,
        tripType: 'one-way',
      });
    }
  };

  const handleSelectVip = () => {
    setSearchQuery({
      departure: 'Cotonou',
      destination: 'Parakou',
      date: new Date().toISOString().split('T')[0],
      passengers: 1,
      tripType: 'one-way',
    });
  };

  const handleResetSearch = () => {
    setSearchQuery(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-brand-blue selection:text-brand-yellow">
      
      {/* Sticky Premium Navbar */}
      <Navbar
        onOpenBooking={() => {
          handleSelectRoute('Cotonou', 'Parakou');
        }}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />

      {/* Main Single Page Sections */}
      <main>
        {/* 1. Hero Section & Flight Search Console */}
        <Hero onSearch={handleHeroSearch} />

        {/* 2. Core Brand Advantages Grid */}
        <Advantages />

        {/* 3. Domestic Flight Fleet Specs */}
        <Fleet onSelectAircraft={handleSelectAircraft} />

        {/* 4. Destination Map Grid (Flagship route & Regional extensions) */}
        <Destinations onSelectRoute={handleSelectRoute} />

        {/* 5. High-end Dark VIP Experience showcase */}
        <VipSection onSelectVip={handleSelectVip} />
      </main>

      {/* 6. Footer section */}
      <Footer />

      {/* MODALS / OVERLAYS */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      
      {/* Booking Flow Modal */}
      <AnimatePresence>
        {searchQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-hidden">
            <div className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-2xl border border-slate-300 shadow-2xl flex flex-col overflow-hidden">
              {/* Header Bar */}
              <div className="bg-brand-dark px-6 py-4 flex items-center justify-between border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="text-brand-yellow font-display font-bold uppercase tracking-wider text-sm">
                    Réservation de Vol
                  </span>
                  <span className="text-white/40 text-xs font-mono">|</span>
                  <span className="text-slate-300 text-xs font-mono">
                    {searchQuery.departure} → {searchQuery.destination}
                  </span>
                </div>
                <button
                  onClick={() => setSearchQuery(null)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title="Fermer la réservation"
                  aria-label="Fermer la réservation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Flow */}
              <div className="overflow-y-auto flex-1 p-2 sm:p-6 bg-slate-50">
                <BookingFlow
                  searchQuery={searchQuery}
                  onResetSearch={handleResetSearch}
                />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
