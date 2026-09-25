import React, { useState, useEffect } from 'react';
import { Plane, Calendar, Users, ArrowRight, Check, CreditCard, ChevronRight, User, ShieldCheck, Ticket, RotateCcw, AlertCircle, ShoppingBag, Coffee, Armchair, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Flight, BookingState, Passenger, Seat } from '../types';
import { FLIGHTS_COTO_PARA, FLIGHTS_PARA_COTO, generateSeats } from '../data';

interface BookingFlowProps {
  searchQuery: BookingState | null;
  onResetSearch: () => void;
}

type Step = 'flight-select' | 'seat-select' | 'passenger-info' | 'payment' | 'ticket';

export default function BookingFlow({ searchQuery, onResetSearch }: BookingFlowProps) {
  const [step, setStep] = useState<Step>('flight-select');
  const [activeQuery, setActiveQuery] = useState<BookingState>({
    departure: 'Cotonou',
    destination: 'Parakou',
    date: new Date().toISOString().split('T')[0],
    passengers: 1,
    tripType: 'one-way',
  });

  const [availableFlights, setAvailableFlights] = useState<Flight[]>(FLIGHTS_COTO_PARA);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedClass, setSelectedClass] = useState<'economy' | 'business' | 'vip'>('economy');
  const [cabinSeats, setCabinSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([
    {
      firstName: '',
      lastName: '',
      passportNumber: '',
      email: '',
      phone: '',
      mealPreference: 'Béninois Premium (Amiwo & Poulet braisé)',
      extraLuggage: false,
    },
  ]);
  const [paymentMethod, setPaymentMethod] = useState<'mtn' | 'moov' | 'card'>('mtn');
  const [paymentPhone, setPaymentPhone] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [bookingReference, setBookingReference] = useState('');

  // Synchronize when search query changes
  useEffect(() => {
    if (searchQuery) {
      setActiveQuery(searchQuery);
      setStep('flight-select');
      setSelectedFlight(null);
      setSelectedSeats([]);
      
      const flights = searchQuery.departure === 'Cotonou' ? FLIGHTS_COTO_PARA : FLIGHTS_PARA_COTO;
      setAvailableFlights(flights);
      
      // Initialize passenger forms based on search count
      const forms = Array.from({ length: searchQuery.passengers }, () => ({
        firstName: '',
        lastName: '',
        passportNumber: '',
        email: '',
        phone: '',
        mealPreference: 'Béninois Premium (Amiwo & Poulet braisé)',
        extraLuggage: false,
      }));
      setPassengers(forms);
    }
  }, [searchQuery]);

  // Handle local query modifications
  const handleQueryChange = (key: keyof BookingState, value: any) => {
    const updated = { ...activeQuery, [key]: value };
    
    // Auto flip route if duplicates
    if (key === 'departure' && value === updated.destination) {
      updated.destination = value === 'Cotonou' ? 'Parakou' : 'Cotonou';
    } else if (key === 'destination' && value === updated.departure) {
      updated.departure = value === 'Cotonou' ? 'Parakou' : 'Cotonou';
    }

    setActiveQuery(updated);
    const flights = updated.departure === 'Cotonou' ? FLIGHTS_COTO_PARA : FLIGHTS_PARA_COTO;
    setAvailableFlights(flights);
    setSelectedFlight(null);
  };

  // Setup seats once flight is selected
  const handleSelectFlight = (flight: Flight, fareClass: 'economy' | 'business' | 'vip') => {
    setSelectedFlight(flight);
    setSelectedClass(fareClass);
    setCabinSeats(generateSeats(fareClass));
    setSelectedSeats([]);
    setStep('seat-select');
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.isBooked) return;

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat.id));
    } else {
      // Limit to number of passengers
      if (selectedSeats.length < activeQuery.passengers) {
        setSelectedSeats([...selectedSeats, seat.id]);
      } else {
        // Replace first
        setSelectedSeats([...selectedSeats.slice(1), seat.id]);
      }
    }
  };

  const handlePassengersSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePassengerFormChange = (index: number, key: keyof Passenger, value: any) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [key]: value };
    setPassengers(updated);
  };

  const handlePayment = () => {
    setIsProcessingPayment(true);
    // Simulate transaction delay
    setTimeout(() => {
      setIsProcessingPayment(false);
      // Generate a random Benin flight reference
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let ref = 'AMZ';
      for (let i = 0; i < 4; i++) {
        ref += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setBookingReference(ref);
      setStep('ticket');
    }, 2500);
  };

  // Calculate prices
  const getTicketPrice = () => {
    if (!selectedFlight) return 0;
    if (selectedClass === 'economy') return selectedFlight.priceEconomy;
    if (selectedClass === 'business') return selectedFlight.priceBusiness;
    return selectedFlight.priceVIP;
  };

  const getExtraLuggagePrice = () => {
    return passengers.filter((p) => p.extraLuggage).length * 15000;
  };

  const getTotalPrice = () => {
    return (getTicketPrice() * activeQuery.passengers) + getExtraLuggagePrice();
  };

  return (
    <section id="reservation" className="py-4 sm:py-6 bg-slate-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-8 overflow-x-auto py-2 no-scrollbar">
          {[
            { id: 'flight-select', label: '1. Vols disponibles' },
            { id: 'seat-select', label: '2. Sièges' },
            { id: 'passenger-info', label: '3. Passagers' },
            { id: 'payment', label: '4. Paiement' },
            { id: 'ticket', label: '5. Billet' },
          ].map((item) => (
            <div key={item.id} className="flex items-center space-x-2 shrink-0">
              <span
                className={`text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full transition-all ${
                  step === item.id
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'bg-white text-slate-500 border border-slate-200'
                }`}
              >
                {item.label}
              </span>
              {item.id !== 'ticket' && <ChevronRight className="w-4 h-4 text-slate-300" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Area */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200/80">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: FLIGHT SELECT */}
              {step === 'flight-select' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-brand-dark">
                        Sélectionnez votre vol
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">
                        Vols domestiques réguliers au Bénin opérés par Amazone Airlines.
                      </p>
                    </div>

                    {/* Simple search switcher */}
                    <div className="flex items-center bg-slate-100 p-1.5 rounded-none self-start">
                      <button
                        onClick={() => handleQueryChange('departure', 'Cotonou')}
                        className={`px-3 py-1.5 rounded-none text-xs font-bold transition-all ${
                          activeQuery.departure === 'Cotonou'
                            ? 'bg-brand-blue text-white shadow'
                            : 'text-slate-600'
                        }`}
                      >
                        Cotonou → Parakou
                      </button>
                      <button
                        onClick={() => handleQueryChange('departure', 'Parakou')}
                        className={`px-3 py-1.5 rounded-none text-xs font-bold transition-all ${
                          activeQuery.departure === 'Parakou'
                            ? 'bg-brand-blue text-white shadow'
                            : 'text-slate-600'
                        }`}
                      >
                        Parakou → Cotonou
                      </button>
                    </div>
                  </div>

                  {/* Flight Info Header */}
                  <div className="bg-slate-50 rounded-none p-4 flex flex-wrap gap-4 items-center justify-between text-sm text-slate-600 border border-slate-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-blue" />
                      <span className="font-semibold">Date :</span>
                      <span>
                        {new Date(activeQuery.date).toLocaleDateString('fr-FR', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-brand-blue" />
                      <span className="font-semibold">Voyageurs :</span>
                      <span>
                        {activeQuery.passengers} {activeQuery.passengers > 1 ? 'Passagers' : 'Passager'}
                      </span>
                    </div>
                  </div>

                  {/* Flights List */}
                  <div className="space-y-4">
                    {availableFlights.map((flight) => (
                      <div
                        key={flight.id}
                        className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-brand-blue/40 hover:shadow-md transition-all duration-200"
                      >
                        {/* Upper row: Schedule & Route */}
                        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-50/50 to-white">
                          <div className="flex items-center gap-4">
                            <span className="bg-brand-blue/10 text-brand-blue text-xs font-mono font-bold px-2.5 py-1.5 rounded-lg">
                              {flight.flightNumber}
                            </span>
                            <span className="text-xs text-slate-500 font-medium">
                              ATR 42-500 Pressurisé
                            </span>
                          </div>

                          <div className="flex items-center gap-6 sm:gap-10">
                            <div className="text-center sm:text-left">
                              <p className="text-xl font-bold text-slate-800">{flight.departureTime}</p>
                              <p className="text-sm font-semibold text-slate-600 font-display">
                                {flight.departure} ({flight.departureCode})
                              </p>
                            </div>

                            <div className="flex flex-col items-center justify-center min-w-[80px] sm:min-w-[120px]">
                              <p className="text-[11px] font-mono font-medium text-slate-400">
                                {flight.duration}
                              </p>
                              <div className="relative w-full flex items-center justify-center my-1.5">
                                <div className="absolute h-[2px] w-full bg-slate-200"></div>
                                <div className="absolute right-0 w-1.5 h-1.5 rounded-none bg-slate-400"></div>
                                <div className="absolute left-0 w-1.5 h-1.5 rounded-none bg-slate-400"></div>
                                <Plane className="w-4 h-4 text-brand-blue transform rotate-45 z-10 bg-white px-0.5" />
                              </div>
                              <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold">
                                Vol Direct
                              </p>
                            </div>

                            <div className="text-center sm:text-right">
                              <p className="text-xl font-bold text-slate-800">{flight.arrivalTime}</p>
                              <p className="text-sm font-semibold text-slate-600 font-display">
                                {flight.destination} ({flight.destinationCode})
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-slate-400 text-xs block">À partir de</span>
                            <span className="text-2xl font-display font-extrabold text-brand-blue font-mono">
                              {flight.priceEconomy.toLocaleString('fr-FR')} <span className="text-xs">FCFA</span>
                            </span>
                          </div>
                        </div>

                        {/* Lower section: Tariffs options */}
                        <div className="border-t border-slate-100 bg-slate-50/50 p-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {/* Eco Premium card */}
                          <div className="bg-white rounded-none p-4 border border-slate-200 hover:border-brand-blue/30 flex flex-col justify-between transition-all">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-700 uppercase">Éco Premium</span>
                                <Check className="w-3.5 h-3.5 text-brand-blue" />
                              </div>
                              <p className="text-slate-400 text-[11px] mb-3 leading-relaxed">
                                Le voyage régulier intelligent. Franchise 23kg incluse.
                              </p>
                            </div>
                            <div>
                              <p className="text-base font-bold text-slate-800 font-mono mb-2">
                                {flight.priceEconomy.toLocaleString('fr-FR')} FCFA
                              </p>
                              <button
                                onClick={() => handleSelectFlight(flight, 'economy')}
                                className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold py-2 px-3 rounded-none transition-all"
                              >
                                Choisir Éco
                              </button>
                            </div>
                          </div>

                          {/* Business class card */}
                          <div className="bg-white rounded-none p-4 border border-brand-blue/20 shadow-sm flex flex-col justify-between hover:border-brand-blue/40 transition-all">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-none bg-brand-yellow animate-pulse"></span>
                                  Classe Affaires
                                </span>
                                <Check className="w-3.5 h-3.5 text-brand-yellow" />
                              </div>
                              <p className="text-slate-500 text-[11px] mb-3 leading-relaxed">
                                Accès Salon, coupe-file aéroport, franchise bagages 32kg.
                              </p>
                            </div>
                            <div>
                              <p className="text-base font-bold text-slate-800 font-mono mb-2">
                                {flight.priceBusiness.toLocaleString('fr-FR')} FCFA
                              </p>
                              <button
                                onClick={() => handleSelectFlight(flight, 'business')}
                                className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white text-xs font-bold py-2 px-3 rounded-none transition-all"
                              >
                                Choisir Affaires
                              </button>
                            </div>
                          </div>

                          {/* VIP Elite Class */}
                          <div className="bg-slate-900 rounded-none p-4 border border-brand-yellow/30 flex flex-col justify-between text-white shadow-md transition-all">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest">
                                  Salon VIP Elite
                                </span>
                                <Award className="w-4 h-4 text-brand-yellow" />
                              </div>
                              <p className="text-slate-400 text-[10px] mb-3 leading-relaxed">
                                Chauffeur privé, champagne à bord, intimité absolue et embarquement prioritaire.
                              </p>
                            </div>
                            <div>
                              <p className="text-base font-bold text-brand-yellow font-mono mb-2">
                                {flight.priceVIP.toLocaleString('fr-FR')} FCFA
                              </p>
                              <button
                                onClick={() => handleSelectFlight(flight, 'vip')}
                                className="w-full bg-brand-yellow hover:bg-yellow-400 text-slate-950 text-xs font-bold py-2 px-3 rounded-none transition-all"
                              >
                                Choisir VIP Elite
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: SEAT SELECTION */}
              {step === 'seat-select' && selectedFlight && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="border-b border-slate-100 pb-5">
                    <h3 className="text-2xl font-display font-bold text-brand-dark flex items-center gap-2">
                      <Armchair className="w-6 h-6 text-brand-blue" />
                      Sélectionnez votre siège
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                      Choisissez {activeQuery.passengers} siège{activeQuery.passengers > 1 ? 's' : ''} pour votre vol{' '}
                      <span className="font-bold text-brand-blue">{selectedFlight.flightNumber}</span> en cabine{' '}
                      <span className="font-bold uppercase text-slate-700">
                        {selectedClass === 'vip' ? 'VIP Elite' : selectedClass === 'business' ? 'Affaires' : 'Éco Premium'}
                      </span>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Cabin Selector visualization */}
                    <div className="bg-slate-100 rounded-3xl p-6 flex flex-col items-center">
                      <div className="w-full max-w-[260px] bg-white rounded-t-full border-t-8 border-x-4 border-slate-300 shadow-inner px-4 pt-12 pb-6 relative">
                        {/* Nose and Cockpit visual */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-300 rounded-b-full flex items-center justify-center">
                          <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                            COCKPIT
                          </span>
                        </div>

                        {/* Front Galley */}
                        <div className="border-b-2 border-dashed border-slate-200 pb-4 mb-6 text-center">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Entrée & Toilettes
                          </p>
                        </div>

                        {/* Seat Matrix Grid */}
                        <div className="space-y-3">
                          {Array.from({ length: selectedClass === 'vip' ? 4 : selectedClass === 'business' ? 6 : 10 }).map((_, rIndex) => {
                            const rowNum = rIndex + 1;
                            const seatRow = cabinSeats.filter((s) => s.row === rowNum);
                            return (
                              <div key={rowNum} className="flex items-center justify-between">
                                {/* Left Seats (A & B) */}
                                <div className="flex gap-2.5">
                                  {['A', 'B'].map((letter) => {
                                    const seat = seatRow.find((s) => s.letter === letter);
                                    if (!seat) return null;
                                    const isSelected = selectedSeats.includes(seat.id);
                                    return (
                                      <button
                                        key={letter}
                                        onClick={() => handleSeatClick(seat)}
                                        disabled={seat.isBooked}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all ${
                                          seat.isBooked
                                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed line-through'
                                            : isSelected
                                            ? 'bg-brand-yellow text-slate-900 ring-2 ring-brand-blue ring-offset-1 scale-105'
                                            : selectedClass === 'vip'
                                            ? 'bg-slate-900 text-brand-yellow hover:bg-slate-800'
                                            : selectedClass === 'business'
                                            ? 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                        title={`${seat.id} - ${seat.class.toUpperCase()} - ${seat.price.toLocaleString('fr-FR')} FCFA`}
                                      >
                                        {seat.id}
                                      </button>
                                    );
                                  })}
                                </div>

                                {/* Row indicator */}
                                <span className="text-[10px] font-mono font-bold text-slate-300 w-4 text-center">
                                  {rowNum}
                                </span>

                                {/* Right Seats (C & D) */}
                                <div className="flex gap-2.5">
                                  {['C', 'D'].map((letter) => {
                                    const seat = seatRow.find((s) => s.letter === letter);
                                    if (!seat) return null;
                                    const isSelected = selectedSeats.includes(seat.id);
                                    return (
                                      <button
                                        key={letter}
                                        onClick={() => handleSeatClick(seat)}
                                        disabled={seat.isBooked}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all ${
                                          seat.isBooked
                                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed line-through'
                                            : isSelected
                                            ? 'bg-brand-yellow text-slate-900 ring-2 ring-brand-blue ring-offset-1 scale-105'
                                            : selectedClass === 'vip'
                                            ? 'bg-slate-900 text-brand-yellow hover:bg-slate-800'
                                            : selectedClass === 'business'
                                            ? 'bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/20'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                        title={`${seat.id} - ${seat.class.toUpperCase()} - ${seat.price.toLocaleString('fr-FR')} FCFA`}
                                      >
                                        {seat.id}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Back Cabin limit */}
                        <div className="border-t-2 border-dashed border-slate-200 mt-6 pt-4 text-center">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Bagages & Service
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Seat selection legend and status */}
                    <div className="flex flex-col justify-between space-y-6">
                      <div className="space-y-4 bg-slate-50 rounded-none p-6 border border-slate-200">
                        <h4 className="font-bold text-brand-dark text-sm uppercase tracking-wider">
                          LÉGENDE CABINE
                        </h4>
                        <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-none bg-slate-100 border border-slate-200 inline-block"></span>
                            <span>Siège Libre</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-none bg-slate-200 border border-slate-300 line-through inline-block"></span>
                            <span>Déjà réservé</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-none bg-brand-yellow inline-block"></span>
                            <span>Votre Sélection</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-none bg-brand-blue/20 inline-block"></span>
                            <span>Premium Lounge Class</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-none p-5">
                          <p className="text-slate-700 text-sm font-semibold">Sièges choisis :</p>
                          {selectedSeats.length > 0 ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedSeats.map((s) => (
                                <span
                                  key={s}
                                  className="bg-brand-blue text-white text-xs font-mono font-bold px-3 py-1 rounded-none shadow-sm"
                                >
                                  Siège {s}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-amber-600 text-xs mt-1 italic flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              Aucun siège sélectionné. Veuillez cliquer sur la carte.
                            </p>
                          )}
                          <p className="text-slate-500 text-xs mt-3">
                            Obligation de sélectionner exactement{' '}
                            <span className="font-bold text-brand-blue">{activeQuery.passengers} siège(s)</span>.
                          </p>
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex gap-4">
                          <button
                            onClick={() => setStep('flight-select')}
                            className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3 rounded-none transition-all"
                          >
                            Retour aux vols
                          </button>
                          <button
                            onClick={() => setStep('passenger-info')}
                            disabled={selectedSeats.length !== activeQuery.passengers}
                            className={`flex-1 font-bold py-3 rounded-none transition-all shadow flex items-center justify-center gap-1 ${
                              selectedSeats.length === activeQuery.passengers
                                ? 'bg-brand-blue hover:bg-brand-blue/90 text-white'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            Étape suivante
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PASSENGER INFO */}
              {step === 'passenger-info' && selectedFlight && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="border-b border-slate-100 pb-5">
                    <h3 className="text-2xl font-display font-bold text-brand-dark flex items-center gap-2">
                      <User className="w-6 h-6 text-brand-blue" />
                      Informations sur les voyageurs
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                      Veuillez renseigner les informations d'identité officielles pour l'enregistrement de votre billet.
                    </p>
                  </div>

                  <form onSubmit={handlePassengersSubmit} className="space-y-8">
                    {passengers.map((passenger, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 rounded-none p-5 sm:p-6 border border-slate-200 space-y-4 relative"
                      >
                        <div className="absolute top-4 right-4 bg-brand-blue text-white text-xs font-bold px-2.5 py-1 rounded-none shadow-sm">
                          Voyageur {index + 1} - Siège {selectedSeats[index] || 'N/A'}
                        </div>

                        <h4 className="text-base font-bold text-slate-800 font-display">
                          Identité du passager
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              Prénom *
                            </label>
                            <input
                              type="text"
                              required
                              value={passenger.firstName}
                              onChange={(e) =>
                                handlePassengerFormChange(index, 'firstName', e.target.value)
                              }
                              className="w-full border border-slate-200 rounded-none px-4 py-2.5 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                              placeholder="Ex: Koffi"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              Nom de Famille *
                            </label>
                            <input
                              type="text"
                              required
                              value={passenger.lastName}
                              onChange={(e) =>
                                handlePassengerFormChange(index, 'lastName', e.target.value)
                              }
                              className="w-full border border-slate-200 rounded-none px-4 py-2.5 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                              placeholder="Ex: Soglo"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              N° de Carte d'identité ou Passeport *
                            </label>
                            <input
                              type="text"
                              required
                              value={passenger.passportNumber}
                              onChange={(e) =>
                                handlePassengerFormChange(index, 'passportNumber', e.target.value)
                              }
                              className="w-full border border-slate-200 rounded-none px-4 py-2.5 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                              placeholder="Ex: RF923812739"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              Préférence de Restauration locale
                            </label>
                            <select
                              value={passenger.mealPreference}
                              onChange={(e) =>
                                handlePassengerFormChange(index, 'mealPreference', e.target.value)
                              }
                              className="w-full border border-slate-200 bg-white rounded-none px-3 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
                            >
                              <option value="Béninois Premium (Amiwo & Poulet braisé)">
                                Béninois Premium (Amiwo & Poulet braisé)
                              </option>
                              <option value="Saveurs de Parakou (Mouton grillé & Igname pilée)">
                                Saveurs de Parakou (Mouton grillé & Igname pilée)
                              </option>
                              <option value="Végétarien (Mélange de légumes et plantain)">
                                Végétarien (Mélange de légumes et plantain)
                              </option>
                              <option value="Continental classique">Continental classique</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              Adresse Email *
                            </label>
                            <input
                              type="email"
                              required
                              value={passenger.email}
                              onChange={(e) =>
                                handlePassengerFormChange(index, 'email', e.target.value)
                              }
                              className="w-full border border-slate-200 rounded-none px-4 py-2.5 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                              placeholder="koffi.soglo@gmail.com"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              Numéro de Téléphone *
                            </label>
                            <input
                              type="tel"
                              required
                              value={passenger.phone}
                              onChange={(e) =>
                                handlePassengerFormChange(index, 'phone', e.target.value)
                              }
                              className="w-full border border-slate-200 rounded-none px-4 py-2.5 text-sm focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:outline-none"
                              placeholder="+229 97 00 00 00"
                            />
                          </div>
                        </div>

                        {/* Options */}
                        <div className="pt-2">
                          <label className="inline-flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={passenger.extraLuggage}
                              onChange={(e) =>
                                handlePassengerFormChange(index, 'extraLuggage', e.target.checked)
                              }
                              className="rounded-none border-slate-300 text-brand-blue focus:ring-brand-blue w-4 h-4"
                            />
                            <span className="text-sm text-slate-700 font-medium">
                              Ajouter un bagage en soute supplémentaire (+15 000 FCFA)
                            </span>
                          </label>
                        </div>
                      </div>
                    ))}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep('seat-select')}
                        className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3.5 rounded-none transition-all"
                      >
                        Retour aux sièges
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3.5 rounded-none transition-all shadow-md flex items-center justify-center gap-1"
                      >
                        Procéder au paiement
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 4: PAYMENT SIMULATION */}
              {step === 'payment' && selectedFlight && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <div className="border-b border-slate-100 pb-5">
                    <h3 className="text-2xl font-display font-bold text-brand-dark flex items-center gap-2">
                      <CreditCard className="w-6 h-6 text-brand-blue" />
                      Paiement sécurisé
                    </h3>
                    <p className="text-slate-500 text-sm mt-1">
                      Sélectionnez un moyen de paiement populaire au Bénin pour confirmer votre vol Amazone Airlines.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Payment methods choice */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* MTN Mobile Money */}
                      <button
                        onClick={() => setPaymentMethod('mtn')}
                        className={`border rounded-none p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                          paymentMethod === 'mtn'
                            ? 'border-brand-blue bg-blue-50/50 ring-2 ring-brand-blue'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-none bg-amber-400 flex items-center justify-center font-bold text-xs text-brand-dark shadow-sm">
                          MTN
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800">MoMo MTN</span>
                      </button>

                      {/* Moov Money */}
                      <button
                        onClick={() => setPaymentMethod('moov')}
                        className={`border rounded-none p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                          paymentMethod === 'moov'
                            ? 'border-brand-blue bg-blue-50/50 ring-2 ring-brand-blue'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-none bg-slate-950 text-brand-yellow flex items-center justify-center font-bold text-xs shadow-sm">
                          MOOV
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800">Moov Money</span>
                      </button>

                      {/* Carte de crédit */}
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`border rounded-none p-4 flex flex-col items-center justify-center gap-2 transition-all ${
                          paymentMethod === 'card'
                            ? 'border-brand-blue bg-blue-50/50 ring-2 ring-brand-blue'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-none bg-brand-blue text-white flex items-center justify-center shadow-sm">
                          <CreditCard className="w-5 h-5" />
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800">Visa / Card</span>
                      </button>
                    </div>

                    {/* Dynamic Fields */}
                    <div className="bg-slate-50 p-6 rounded-none border border-slate-200 space-y-4">
                      {paymentMethod !== 'card' ? (
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase mb-2">
                            Entrez votre numéro Mobile Money du Bénin *
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500 font-mono">
                              +229
                            </span>
                            <input
                              type="tel"
                              required
                              value={paymentPhone}
                              onChange={(e) => setPaymentPhone(e.target.value.replace(/\D/g, ''))}
                              placeholder="97 00 00 00"
                              className="w-full border border-slate-200 rounded-none pl-16 pr-4 py-3 text-sm focus:border-brand-blue focus:outline-none font-mono text-base tracking-wider"
                              maxLength={8}
                            />
                          </div>
                          <p className="text-slate-400 text-[11px] mt-2 leading-relaxed">
                            Une notification push sécurisée de validation de transaction sera envoyée immédiatement sur votre téléphone mobile pour authentification du paiement.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                              Numéro de Carte *
                            </label>
                            <input
                              type="text"
                              className="w-full border border-slate-200 rounded-none px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none font-mono"
                              placeholder="4000 1234 5678 9010"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                                Date d'expiration *
                              </label>
                              <input
                                type="text"
                                className="w-full border border-slate-200 rounded-none px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none font-mono"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                                Cryptogramme (CVC) *
                              </label>
                              <input
                                type="password"
                                className="w-full border border-slate-200 rounded-none px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none font-mono"
                                placeholder="***"
                                maxLength={3}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Total details visual list */}
                    <div className="border-t border-slate-100 pt-5 space-y-2 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>Aller simple : {selectedFlight.departure} → {selectedFlight.destination}</span>
                        <span className="font-mono">{getTicketPrice().toLocaleString('fr-FR')} FCFA x {activeQuery.passengers}</span>
                      </div>
                      {getExtraLuggagePrice() > 0 && (
                        <div className="flex justify-between">
                          <span>Bagages supplémentaires en soute</span>
                          <span className="font-mono text-amber-600">+{getExtraLuggagePrice().toLocaleString('fr-FR')} FCFA</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-brand-dark text-base border-t border-dashed border-slate-200 pt-3">
                        <span>Montant Total à payer</span>
                        <span className="font-mono text-brand-blue">{getTotalPrice().toLocaleString('fr-FR')} FCFA</span>
                      </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep('passenger-info')}
                        disabled={isProcessingPayment}
                        className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3.5 rounded-none transition-all"
                      >
                        Retour
                      </button>
                      <button
                        onClick={handlePayment}
                        disabled={isProcessingPayment || (paymentMethod !== 'card' && paymentPhone.length < 8)}
                        className={`flex-1 text-white font-bold py-3.5 rounded-none transition-all shadow-md flex items-center justify-center gap-2 ${
                          isProcessingPayment || (paymentMethod !== 'card' && paymentPhone.length < 8)
                            ? 'bg-slate-300 cursor-not-allowed'
                            : 'bg-brand-blue hover:bg-brand-blue/90'
                        }`}
                      >
                        {isProcessingPayment ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            Transaction en cours...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-5 h-5 text-brand-yellow" />
                            Confirmer & Payer {(getTotalPrice()).toLocaleString('fr-FR')} FCFA
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: TICKET BOARDING PASS */}
              {step === 'ticket' && selectedFlight && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-none bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-display font-extrabold text-slate-900">
                      Félicitations, vol réservé !
                    </h3>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                      Votre paiement a été approuvé avec succès. Voici votre carte d'embarquement officielle pour{' '}
                      <span className="font-bold text-brand-blue">Amazone Airlines</span>. Un e-mail contenant les détails a également été envoyé.
                    </p>
                  </div>

                  {/* Gorgeous Multi Boarding Pass Layout */}
                  <div className="space-y-6 max-h-[480px] overflow-y-auto pr-1">
                    {passengers.map((passenger, index) => (
                      <div
                        key={index}
                        className="border border-slate-200 rounded-none overflow-hidden shadow-lg bg-gradient-to-r from-brand-blue to-[#005282] text-white relative"
                      >
                        {/* Cut out dots on side */}
                        <div className="absolute left-0 top-[60%] -translate-y-1/2 w-3 h-6 bg-white z-10"></div>
                        <div className="absolute right-0 top-[60%] -translate-y-1/2 w-3 h-6 bg-white z-10"></div>

                        {/* Top banner */}
                        <div className="px-6 py-4 bg-slate-950/20 border-b border-white/10 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Plane className="w-4 h-4 transform -rotate-45 text-brand-yellow" />
                            <span className="font-display font-bold tracking-tight text-sm">
                              AMAZONE AIRLINES
                            </span>
                          </div>
                          <span className="text-xs font-mono font-bold text-brand-yellow bg-slate-900 px-2.5 py-1 rounded-none">
                            BOARDING PASS
                          </span>
                        </div>

                        {/* Core flight ticket info */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                          {/* Route column */}
                          <div className="flex items-center justify-between col-span-2">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-slate-300">Départ</p>
                              <p className="text-3xl font-display font-extrabold text-brand-yellow">
                                {selectedFlight.departureCode}
                              </p>
                              <p className="text-xs font-semibold">{selectedFlight.departure}</p>
                            </div>

                            <div className="flex flex-col items-center justify-center flex-1 mx-4">
                              <Plane className="w-5 h-5 text-brand-yellow transform rotate-45" />
                              <div className="w-full h-[1px] bg-dashed bg-white/30 my-2"></div>
                              <span className="text-[10px] font-mono">{selectedFlight.duration} Direct</span>
                            </div>

                            <div className="text-right">
                              <p className="text-[10px] uppercase tracking-widest text-slate-300">Destination</p>
                              <p className="text-3xl font-display font-extrabold text-brand-yellow">
                                {selectedFlight.destinationCode}
                              </p>
                              <p className="text-xs font-semibold">{selectedFlight.destination}</p>
                            </div>
                          </div>

                          {/* Ticket bar code mockup */}
                          <div className="bg-white p-3 rounded-none flex flex-col items-center justify-center text-slate-800 border border-slate-100 shadow-inner">
                            <div className="w-full flex items-center justify-center gap-1.5 h-12">
                              {/* Virtual barcode */}
                              {Array.from({ length: 24 }).map((_, i) => (
                                <div
                                  key={i}
                                  className="bg-brand-dark rounded-none"
                                  style={{
                                    width: i % 3 === 0 ? '1px' : i % 4 === 0 ? '3px' : '1.5px',
                                    height: '40px',
                                  }}
                                />
                              ))}
                            </div>
                            <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-slate-500 mt-1">
                              REF: {bookingReference}P{index + 1}
                            </span>
                          </div>
                        </div>

                        {/* Bottom ticket details */}
                        <div className="px-6 py-5 bg-slate-900/30 border-t border-dashed border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
                          <div>
                            <span className="text-slate-300 text-[10px] uppercase block">PASSAGER</span>
                            <span className="font-bold text-sm text-brand-yellow font-sans">
                              {passenger.lastName.toUpperCase()} {passenger.firstName}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-300 text-[10px] uppercase block">VOL NO</span>
                            <span className="font-bold text-sm text-white">{selectedFlight.flightNumber}</span>
                          </div>
                          <div>
                            <span className="text-slate-300 text-[10px] uppercase block">SIÈGE</span>
                            <span className="font-bold text-sm text-brand-yellow">{selectedSeats[index]}</span>
                          </div>
                          <div>
                            <span className="text-slate-300 text-[10px] uppercase block">EMBARQUEMENT</span>
                            <span className="font-bold text-sm text-white">
                              {/* 30 mins before flight */}
                              {(() => {
                                const [h, m] = selectedFlight.departureTime.split(':');
                                let targetM = parseInt(m) - 30;
                                let targetH = parseInt(h);
                                if (targetM < 0) {
                                  targetM += 60;
                                  targetH -= 1;
                                }
                                return `${String(targetH).padStart(2, '0')}:${String(targetM).padStart(2, '0')}`;
                              })()}
                            </span>
                          </div>
                        </div>

                        {/* Additional perks tag */}
                        <div className="bg-brand-yellow px-6 py-2.5 text-brand-dark flex items-center justify-between text-xs font-bold font-sans">
                          <span className="uppercase">
                            Classe : {selectedClass === 'vip' ? 'VIP Lounge Class' : selectedClass === 'business' ? 'Affaires' : 'Économie Premium'}
                          </span>
                          <span className="italic text-[11px] font-medium">
                            Menu : {passenger.mealPreference}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reset Actions */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="flex-1 bg-brand-dark hover:bg-slate-800 text-white font-bold py-3.5 rounded-none transition-all shadow flex items-center justify-center gap-2"
                    >
                      <Ticket className="w-5 h-5 text-brand-yellow" />
                      Imprimer mes billets (PDF)
                    </button>
                    <button
                      onClick={() => {
                        onResetSearch();
                        setStep('flight-select');
                      }}
                      className="flex-1 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold py-3.5 rounded-none transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Faire une nouvelle recherche
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Right Sidebar - Pricing & Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-brand-dark text-white rounded-none p-6 shadow-xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/10 rounded-none blur-2xl pointer-events-none"></div>

              <h4 className="text-lg font-display font-bold text-brand-yellow border-b border-white/10 pb-3 mb-4">
                Détails de la réservation
              </h4>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-white/5 flex items-center justify-center shrink-0">
                    <Plane className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs uppercase block">Itinéraire</span>
                    <span className="font-semibold text-slate-100">
                      {activeQuery.departure} → {activeQuery.destination}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-white/5 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs uppercase block">Date du voyage</span>
                    <span className="font-semibold text-slate-100">
                      {new Date(activeQuery.date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-none bg-white/5 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-brand-yellow" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs uppercase block">Voyageurs</span>
                    <span className="font-semibold text-slate-100">
                      {activeQuery.passengers} {activeQuery.passengers > 1 ? 'Passagers' : 'Passager'}
                    </span>
                  </div>
                </div>

                {selectedFlight && (
                  <div className="border-t border-white/10 pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-xs uppercase">Numéro de Vol :</span>
                      <span className="font-mono font-bold text-brand-yellow">{selectedFlight.flightNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-xs uppercase">Cabine :</span>
                      <span className="font-bold text-emerald-400 uppercase text-xs tracking-wider">
                        {selectedClass}
                      </span>
                    </div>
                  </div>
                )}

                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Prix unitaire billet :</span>
                    <span className="font-mono">{selectedFlight ? getTicketPrice().toLocaleString('fr-FR') : '65 000'} FCFA</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Taxe d'aéroport nationale :</span>
                    <span className="font-mono text-emerald-400">Gratuit (Inclus)</span>
                  </div>
                  {getExtraLuggagePrice() > 0 && (
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Bagages soute suppl :</span>
                      <span className="font-mono text-brand-yellow">+{getExtraLuggagePrice().toLocaleString('fr-FR')} FCFA</span>
                    </div>
                  )}

                  <div className="flex justify-between font-display font-bold text-lg text-white border-t border-dashed border-white/10 pt-3">
                    <span>Total Estimé</span>
                    <span className="font-mono text-brand-yellow">
                      {getTotalPrice().toLocaleString('fr-FR')} FCFA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Safety Trust Banner */}
            <div className="bg-slate-100 border border-slate-200 rounded-3xl p-6 space-y-3">
              <h5 className="font-bold text-slate-800 text-sm flex items-center gap-1.5 uppercase font-display">
                <ShieldCheck className="w-5 h-5 text-brand-blue" />
                SÉCURITÉ & PONCTUALITÉ
              </h5>
              <p className="text-slate-500 text-xs leading-relaxed">
                Tous nos vols domestiques entre Cotonou et Parakou font l'objet d'un contrôle de maintenance certifié par l'aviation civile béninoise selon les plus hauts standards internationaux.
              </p>
              <div className="text-[10px] text-slate-400 font-mono">
                Assistance téléphonique 24h/24 : +229 21 00 00 00
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
