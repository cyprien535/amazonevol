import React, { useRef, useEffect, useState } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import { motion } from 'motion/react';
import { BookingState } from '../types';
import { IMAGES } from '../data';
import MagneticButton from './MagneticButton';
import TextLoop from './TextLoop';

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

        {/* Main Content Area: Centered layout with balanced vertical placement */}
        <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
          {/* Centered Typography and CTAs: descended gracefully */}
          <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto -mt-6 sm:-mt-10 md:-mt-14">
            {/* Motion 2: Staggered reveal for Hero typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center select-none"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal text-slate-500 leading-none tracking-tighter drop-shadow-sm select-none">
                Prestige.
              </h1>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-semibold leading-none tracking-tighter -mt-[12px] text-brand-dark drop-shadow-sm select-none">
                Accessible<span className="text-brand-yellow">.</span>
              </h2>
            </motion.div>

            {/* Motion 2: Staggered Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-slate-700 max-w-2xl text-center mt-5 mb-7 font-normal leading-relaxed"
            >
              Reliez <strong className="font-semibold text-brand-dark">Cotonou</strong> à <strong className="font-semibold text-brand-dark">Parakou</strong> en 1h15 de vol direct, ou profitez de nos vols privés sur mesure au Bénin et dans toute la sous-région.
            </motion.p>

            {/* Motion 2 & 3: Staggered CTA buttons with MagneticButton and Shimmer sweep */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="#flotte"
                className="px-6 py-2.5 rounded-full bg-white/95 hover:bg-white text-slate-800 font-medium text-sm shadow-sm hover:shadow border border-slate-200/90 transition-all duration-200"
              >
                Découvrir la flotte
              </a>
              <MagneticButton
                onClick={handleBookNow}
                className="bg-gradient-to-r from-[#B8860B] via-[#C69214] to-[#D4A017] hover:from-[#C69214] hover:to-[#E5A81B] text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-md shadow-[#C69214]/25 border border-amber-200/40 transition-all duration-300 flex items-center gap-2"
              >
                <Plane className="w-4 h-4 text-white -rotate-45" />
                <span>Réserver un vol</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Dynamic Looping Text: Sleek, compact snake wave with fine boarding pass ticket zigzag cut */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full mt-8 sm:mt-11 md:mt-14 pointer-events-auto select-none overflow-hidden"
          >
            <TextLoop
              text="AMAZONE AIRLINES ✦ VOL DIRECT COTONOU – PARAKOU EN 1H15 ✦ L'AVIATION DE PRESTIGE AU BÉNIN ✦ JETS PRIVÉS & CHARTERS VIP ✦ EXCELLENCE & SÉCURITÉ GARANTIES"
              shape="wave"
              speed={65}
              direction="forward"
              separator="✦"
              curviness={16}
              fontSize={15}
              fontWeight={700}
              letterSpacing={2}
              uppercase
              color="#FFFFFF"
              ribbon
              ribbonColor="gold"
              ribbonWidth={42}
              ticketCut={true}
              pauseOnHover
              viewWidth={1600}
              viewHeight={90}
              className="w-full drop-shadow-md"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
