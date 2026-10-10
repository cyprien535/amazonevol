import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BookingState } from '../types';

interface HeroProps {
  onSearch: (searchData: BookingState) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <section id="hero" className="relative h-screen overflow-hidden bg-gray-50">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
          type="video/mp4"
        />
      </video>

      {/* Content wrapper */}
      <div className="relative h-full flex flex-col z-10">
        {/* Navigation Bar */}
        <header className="w-full">
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            {/* Brand Name */}
            <div className="text-2xl font-semibold text-gray-900 tracking-tight">
              SkyElite
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#hero"
                className="text-gray-900 hover:text-gray-700 transition-colors font-medium text-sm"
              >
                Start
              </a>
              <a
                href="#avantages"
                className="text-gray-900 hover:text-gray-700 transition-colors font-medium text-sm"
              >
                Story
              </a>
              <a
                href="#destinations"
                className="text-gray-900 hover:text-gray-700 transition-colors font-medium text-sm"
              >
                Rates
              </a>
              <a
                href="#flotte"
                className="text-gray-900 hover:text-gray-700 transition-colors font-medium text-sm"
              >
                Benefits
              </a>
              <a
                href="#vip"
                className="text-gray-900 hover:text-gray-700 transition-colors font-medium text-sm"
              >
                FAQ
              </a>
            </nav>

            {/* Mobile hamburger menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-900 p-2 rounded-lg hover:text-gray-700 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mx-6 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-4 transition-colors">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
              >
                Start
              </a>
              <a
                href="#avantages"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
              >
                Story
              </a>
              <a
                href="#destinations"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
              >
                Rates
              </a>
              <a
                href="#flotte"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
              >
                Benefits
              </a>
              <a
                href="#vip"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
              >
                FAQ
              </a>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="flex flex-col items-center text-center -mt-24 sm:-mt-48 md:-mt-80">
            {/* Small uppercase label */}
            <span className="text-sm font-semibold text-gray-600 tracking-wider mb-4 uppercase">
              PRIVATE JETS
            </span>

            {/* Large two-line heading with overlapping effect */}
            <div className="flex flex-col items-center select-none">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-normal text-gray-500 leading-none tracking-tighter">
                Premium.
              </h1>
              <h2
                className="text-6xl md:text-7xl lg:text-8xl font-normal leading-none tracking-tighter -mt-[12px]"
                style={{ color: '#202A36' }}
              >
                Accessible.
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl text-center mt-3">
              Your dedication deserves recognition.
            </p>

            {/* Two call-to-action buttons */}
            <div className="flex items-center justify-center gap-4">
              <a
                href="#avantages"
                className="px-4 py-2 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-colors"
              >
                Discover
              </a>
              <button
                onClick={handleBookNow}
                className="px-4 py-2 rounded-full text-white font-medium transition-colors cursor-pointer"
                style={{ backgroundColor: '#202A36' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1a2229')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#202A36')}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
