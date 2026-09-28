import { Flight, Seat } from './types';
import heroImg from './assets/images/hero_plane_flight_1782837395527.jpg';
import atr42Img from './assets/images/atr42_regional_1782837409116.jpg';
import vipJetImg from './assets/images/vip_private_jet_1782837424812.jpg';
import vipInteriorImg from './assets/images/private_jet_interior_1782837441727.jpg';
import charterImg from './assets/images/regenerated_image_1790344564397.png';

// Image assets bundled by Vite for production and development
export const IMAGES = {
  hero: heroImg,
  atr42: atr42Img,
  vipJet: vipJetImg,
  vipInterior: vipInteriorImg,
  charter: charterImg,
};

export const FLIGHTS_COTO_PARA: Flight[] = [
  {
    id: 'coto-para-1',
    flightNumber: 'AMZ-101',
    departure: 'Cotonou',
    departureCode: 'COO',
    destination: 'Parakou',
    destinationCode: 'PKO',
    departureTime: '07:15',
    arrivalTime: '08:30',
    duration: '1h 15m',
    priceEconomy: 65000,
    priceBusiness: 120000,
    priceVIP: 250000,
    days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  },
  {
    id: 'coto-para-2',
    flightNumber: 'AMZ-103',
    departure: 'Cotonou',
    departureCode: 'COO',
    destination: 'Parakou',
    destinationCode: 'PKO',
    departureTime: '11:45',
    arrivalTime: '13:00',
    duration: '1h 15m',
    priceEconomy: 65000,
    priceBusiness: 120000,
    priceVIP: 250000,
    days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  },
  {
    id: 'coto-para-3',
    flightNumber: 'AMZ-105',
    departure: 'Cotonou',
    departureCode: 'COO',
    destination: 'Parakou',
    destinationCode: 'PKO',
    departureTime: '16:30',
    arrivalTime: '17:45',
    duration: '1h 15m',
    priceEconomy: 70000,
    priceBusiness: 130000,
    priceVIP: 270000,
    days: ['MON', 'WED', 'FRI', 'SUN'],
  },
];

export const FLIGHTS_PARA_COTO: Flight[] = [
  {
    id: 'para-coto-1',
    flightNumber: 'AMZ-102',
    departure: 'Parakou',
    departureCode: 'PKO',
    destination: 'Cotonou',
    destinationCode: 'COO',
    departureTime: '09:30',
    arrivalTime: '10:45',
    duration: '1h 15m',
    priceEconomy: 65000,
    priceBusiness: 120000,
    priceVIP: 250000,
    days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  },
  {
    id: 'para-coto-2',
    flightNumber: 'AMZ-104',
    departure: 'Parakou',
    departureCode: 'PKO',
    destination: 'Cotonou',
    destinationCode: 'COO',
    departureTime: '14:00',
    arrivalTime: '15:15',
    duration: '1h 15m',
    priceEconomy: 65000,
    priceBusiness: 120000,
    priceVIP: 250000,
    days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
  },
  {
    id: 'para-coto-3',
    flightNumber: 'AMZ-106',
    departure: 'Parakou',
    departureCode: 'PKO',
    destination: 'Cotonou',
    destinationCode: 'COO',
    departureTime: '18:30',
    arrivalTime: '19:45',
    duration: '1h 15m',
    priceEconomy: 70000,
    priceBusiness: 130000,
    priceVIP: 270000,
    days: ['MON', 'WED', 'FRI', 'SUN'],
  },
];

export const FLEET = [
  {
    name: 'ATR 42-500',
    category: 'Ligne Régulière Domestique',
    capacity: '48 Passagers',
    speed: '550 km/h',
    description: 'Liaison directe Cotonou – Parakou en 1h15. Économique, fiable et parfaitement adapté aux pistes régionales béninoises.',
    image: IMAGES.atr42,
    features: ['Cabine pressurisée & climatisée', '23 kg de bagages en soute inclus', 'Service d\'accueil à bord', 'Maintenance agréée ANAC'],
  },
  {
    name: 'Falcon 2000S VIP',
    category: 'Aviation d\'Affaires & Privée',
    capacity: '10 Passagers',
    speed: '850 km/h',
    description: 'Déplacements d\'affaires, missions officielles ou urgences. Confort supérieur et départ immédiat selon votre planning.',
    image: IMAGES.vipJet,
    features: ['Salon d\'affaires cuir & boiseries', 'Service en vol sur mesure', 'Wi-Fi haut débit disponible', 'Accès direct salon d\'honneur'],
  },
  {
    name: 'Charter Privé Amazone',
    category: 'Vols Sur Mesure & Groupes',
    capacity: 'Sur demande',
    speed: 'Sur mesure',
    description: 'Affrètement complet pour délégations, entreprises, équipes sportives et voyages de groupe personnalisés.',
    image: IMAGES.charter,
    features: ['Itinéraire et horaires sur mesure', 'Enregistrement dédié', 'Discrétion et sécurité renforcée', 'Prise en charge intégrale'],
  },
];

export const DESTINATIONS = [
  {
    name: 'Cotonou ↔ Parakou',
    status: 'active',
    description: 'Notre liaison quotidienne directe. 3 vols par jour pour relier la capitale économique au Nord du pays en 1h15.',
    code: 'COO ↔ PKO',
    time: '1h 15m',
    image: 'https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Cotonou ↔ Lagos',
    status: 'bientôt',
    description: 'Liaison directe vers le Nigéria en 45 minutes de vol. Facilitez vos affaires sans passer par la route transfrontalière.',
    code: 'COO ↔ LOS',
    time: '45m',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc1f4767?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Cotonou ↔ Abidjan',
    status: 'bientôt',
    description: 'Connexion aérienne directe avec la Côte d\'Ivoire pour stimuler les partenariats régionaux et la mobilité commerciale.',
    code: 'COO ↔ ABJ',
    time: '1h 40m',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=600',
  },
  {
    name: 'Cotonou ↔ Dakar',
    status: 'bientôt',
    description: 'Ouverture vers le Sénégal en vol direct pour connecter les deux grandes métropoles ouest-africaines.',
    code: 'COO ↔ DKR',
    time: '3h 30m',
    image: 'https://images.unsplash.com/photo-1509840144519-8d8e5f29d28c?auto=format&fit=crop&q=80&w=600',
  },
];

export const ADVANTAGES = [
  {
    id: 'adv-1',
    title: '1h15 seulement',
    description: 'Gagnez une journée entière de travail en évitant les 8 à 10 heures de route sur la RNIE 2.',
    icon: 'Zap',
  },
  {
    id: 'adv-2',
    title: 'Sécurité et conformité',
    description: 'Opérations certifiées par l\'ANAC Bénin. Maintenance technique rigoureuse et équipages expérimentés.',
    icon: 'ShieldCheck',
  },
  {
    id: 'adv-3',
    title: 'Confort en cabine',
    description: 'Sièges spacieux, environnement climatisé et rafraîchissements locaux servis à bord par notre personnel.',
    icon: 'Sparkles',
  },
  {
    id: 'adv-4',
    title: 'Régularité opérationnelle',
    description: '3 rotations quotidiennes programmées pour assurer la continuité de vos engagements professionnels.',
    icon: 'Clock',
  },
];

export const generateSeats = (flightClass: 'economy' | 'business' | 'vip'): Seat[] => {
  const seats: Seat[] = [];
  const rows = flightClass === 'vip' ? 4 : flightClass === 'business' ? 6 : 10;
  
  for (let r = 1; r <= rows; r++) {
    const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
    letters.forEach((l) => {
      // randomly book some seats for realism
      const isBooked = Math.random() < 0.35;
      const basePrice = flightClass === 'vip' ? 250000 : flightClass === 'business' ? 120000 : 65000;
      seats.push({
        id: `${r}${l}`,
        row: r,
        letter: l,
        class: flightClass,
        isBooked,
        price: basePrice + (r <= 2 ? 5000 : 0), // Row 1-2 extra spacing premium
      });
    });
  }
  return seats;
};
