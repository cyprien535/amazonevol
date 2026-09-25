import React, { useState } from 'react';
import { X, User, LogIn, Award, MapPin, Plane, HelpCircle, CheckCircle2, QrCode, CreditCard, Sparkles, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [miles, setMiles] = useState(12450);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoggedIn(true);
    }, 1500);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPhone('');
  };

  const pastFlights = [
    {
      ref: 'AMZ9102',
      date: '14 Mai 2026',
      route: 'Cotonou (COO) → Parakou (PKO)',
      seat: '04A',
      class: 'Économie Premium',
      status: 'Effectué',
    },
    {
      ref: 'AMZ4829',
      date: '18 Mars 2026',
      route: 'Parakou (PKO) → Cotonou (COO)',
      seat: '02C',
      class: 'Classe Affaires',
      status: 'Effectué',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-none w-full max-w-lg shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto border border-slate-200"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-none hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isLoggedIn ? (
              /* LOGIN STATE */
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-none bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto">
                    <LogIn className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-extrabold text-brand-dark">
                    Club Amazone Airlines
                  </h3>
                  <p className="text-slate-500 text-sm">
                    Connectez-vous à votre espace fidélité pour gérer vos réservations et cumuler des Miles gratuits.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      Numéro de Membre ou Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-slate-200 rounded-none px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
                      placeholder="Ex: koffi.soglo@gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      Code Secret ou Téléphone mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-slate-200 rounded-none px-4 py-2.5 text-sm focus:border-brand-blue focus:outline-none"
                      placeholder="Ex: +229 97 00 00 00"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3 rounded-none transition-all shadow-md flex items-center justify-center gap-2 text-sm"
                  >
                    {isLoggingIn ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Vérification...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-4 h-4 text-brand-yellow" />
                        Se connecter à mon compte
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-400">
                    Pas encore membre ?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoggingIn(true);
                        setTimeout(() => {
                          setIsLoggingIn(false);
                          setIsLoggedIn(true);
                          setMiles(1000); // 1000 miles welcome bonus!
                        }, 1000);
                      }}
                      className="text-brand-blue font-bold hover:underline"
                    >
                      Inscrivez-vous gratuitement (Obtenez 1 000 Miles)
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              /* LOGGED IN MEMBER DASHBOARD */
              <div className="space-y-6">
                {/* Header Profile */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-blue text-brand-yellow flex items-center justify-center font-bold text-sm">
                      KS
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-base leading-tight font-display">
                        Koffi Soglo
                      </h4>
                      <p className="text-slate-400 text-xs">koffi.soglo@gmail.com</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-bold text-rose-500 hover:underline"
                  >
                    Déconnexion
                  </button>
                </div>

                {/* Platinum Member Loyalty Card */}
                <div className="bg-gradient-to-br from-brand-blue via-[#005c94] to-brand-dark text-white rounded-2xl p-5 relative overflow-hidden shadow-lg border border-white/10">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/10 rounded-full blur-xl pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-brand-yellow font-bold block">
                        STATUT MEMBRE
                      </span>
                      <span className="text-lg font-display font-extrabold flex items-center gap-1.5 text-brand-yellow">
                        <Sparkles className="w-4 h-4 text-brand-yellow animate-pulse" />
                        Club Amazone Gold
                      </span>
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 border border-white/20">
                      <Plane className="w-4 h-4 text-brand-yellow transform -rotate-45" />
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-slate-300 block">
                        MILES ACCUMULÉS
                      </span>
                      <span className="text-3xl font-mono font-bold text-white tracking-tight">
                        {miles.toLocaleString('fr-FR')} <span className="text-xs uppercase text-brand-yellow font-sans">Miles</span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] uppercase tracking-wider text-slate-300 block">
                        N° MEMBRE
                      </span>
                      <span className="text-xs font-mono font-bold text-brand-yellow">
                        AMZ-229-912
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress simulator metric */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-600">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-brand-blue" />
                      Prochain palier : VIP Platinum
                    </span>
                    <span className="font-mono">12 450 / 15 000 Miles</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-brand-blue h-full" style={{ width: '83%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">
                    Gagnez encore 2 550 Miles pour bénéficier de l'accès illimité et gratuit aux salons d'aéroport VIP à vie !
                  </p>
                </div>

                {/* Past booking list */}
                <div className="space-y-3">
                  <h5 className="font-display font-bold text-brand-dark text-sm uppercase tracking-wider">
                    Historique de vols récents
                  </h5>

                  <div className="space-y-2">
                    {pastFlights.map((flight) => (
                      <div
                        key={flight.ref}
                        className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">{flight.route}</p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {flight.date} • Siège : {flight.seat} • {flight.class}
                          </p>
                        </div>
                        <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded text-[10px]">
                          {flight.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Loyalty action */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMiles(miles + 500);
                    }}
                    className="w-full border border-dashed border-brand-blue text-brand-blue hover:bg-brand-blue/5 text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-yellow animate-spin" />
                    Simuler un vol régulier (+500 Miles gratuits)
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
