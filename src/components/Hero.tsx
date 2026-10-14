import React, { useRef, useEffect, useState } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import { motion } from 'motion/react';
import { BookingState } from '../types';
import { IMAGES } from '../data';

interface HeroProps {
  onSearch: (searchData: BookingState) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Video autoplay prevented:', err);
        });
      }
    }
  }, []);

  const handleBookNow = () => {
    onSearch({
      departure: 'Cotonou',
      destination: 'Parakou',
      date: new Date().toISOString().split('T')[0],
      passengers: 1,
      tripType: 'one-way',
    });
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background with direct instant playback and zero display delay */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 block"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
          type="video/mp4"
        />
      </video>

      {/* Content wrapper */}
      <div className="relative h-full flex flex-col z-10">
        {/* Top Header inside Hero: Logo + Start, Story, Rates, Benefits, FAQ */}
        <header className="w-full">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between">
            {/* Amazone Airlines Floating Logo (Sans arrière-plan) */}
            <motion.a
              href="#hero"
              animate={{ y: [-3, 3, -3] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="flex items-center gap-2 group p-0 transition-transform"
            >
              <img
                src={IMAGES.logo}
                alt="Amazone Airlines Logo"
                width={140}
                height={55}
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
                loading="eager"
                decoding="async"
              />
            </motion.a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#hero"
                className="text-slate-800 hover:text-brand-blue transition-colors font-medium text-sm drop-shadow-sm"
              >
                Start
              </a>
              <a
                href="#avantages"
                className="text-slate-800 hover:text-brand-blue transition-colors font-medium text-sm drop-shadow-sm"
              >
                Story
              </a>
              <a
                href="#destinations"
                className="text-slate-800 hover:text-brand-blue transition-colors font-medium text-sm drop-shadow-sm"
              >
                Rates
              </a>
              <a
                href="#flotte"
                className="text-slate-800 hover:text-brand-blue transition-colors font-medium text-sm drop-shadow-sm"
              >
                Benefits
              </a>
              <a
                href="#vip"
                className="text-slate-800 hover:text-brand-blue transition-colors font-medium text-sm drop-shadow-sm"
              >
                FAQ
              </a>
            </nav>

            {/* Mobile hamburger menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-slate-800 p-2 rounded-lg hover:bg-white/60 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mx-6 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80 flex flex-col gap-4 transition-colors">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-brand-blue font-medium transition-colors"
              >
                Start
              </a>
              <a
                href="#avantages"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-brand-blue font-medium transition-colors"
              >
                Story
              </a>
              <a
                href="#destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-brand-blue font-medium transition-colors"
              >
                Rates
              </a>
              <a
                href="#flotte"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-brand-blue font-medium transition-colors"
              >
                Benefits
              </a>
              <a
                href="#vip"
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-800 hover:text-brand-blue font-medium transition-colors"
              >
                FAQ
              </a>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="flex flex-col items-center text-center -mt-24 sm:-mt-44 md:-mt-80">
            {/* Large two-line heading with overlapping effect */}
            <div className="flex flex-col items-center select-none">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal text-slate-500 leading-none tracking-tighter drop-shadow-sm">
                Prestige.
              </h1>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-semibold leading-none tracking-tighter -mt-[12px] text-brand-dark drop-shadow-sm">
                Accessible<span className="text-brand-yellow">.</span>
              </h2>
            </div>

            {/* Subtitle in French matching Site Purpose */}
            <p className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl text-center mt-5 mb-8 font-normal leading-relaxed">
              Reliez <strong className="font-semibold text-brand-dark">Cotonou</strong> à <strong className="font-semibold text-brand-dark">Parakou</strong> en 1h15 de vol direct, ou profitez de nos vols privés sur mesure au Bénin et dans toute la sous-région.
            </p>

            {/* Two call-to-action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#flotte"
                className="px-6 py-2.5 rounded-full bg-white/95 hover:bg-white text-slate-800 font-medium text-sm shadow-sm hover:shadow border border-slate-200/90 transition-all duration-200"
              >
                Découvrir la flotte
              </a>
              <button
                onClick={handleBookNow}
                className="group relative overflow-hidden bg-gradient-to-r from-[#B8860B] via-[#C69214] to-[#D4A017] hover:from-[#C69214] hover:to-[#E5A81B] text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-md shadow-[#C69214]/25 border border-amber-200/40 transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Plane className="w-4 h-4 text-white -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span>Réserver un vol</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
