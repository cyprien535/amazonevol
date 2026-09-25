export interface Flight {
  id: string;
  flightNumber: string;
  departure: string;
  departureCode: string;
  destination: string;
  destinationCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  priceEconomy: number;
  priceBusiness: number;
  priceVIP: number;
  days: string[];
}

export interface BookingState {
  departure: string;
  destination: string;
  date: string;
  passengers: number;
  tripType: 'one-way' | 'round-trip';
}

export interface Passenger {
  firstName: string;
  lastName: string;
  passportNumber: string;
  email: string;
  phone: string;
  mealPreference: string;
  extraLuggage: boolean;
}

export interface Seat {
  id: string;
  row: number;
  letter: 'A' | 'B' | 'C' | 'D';
  class: 'economy' | 'business' | 'vip';
  isBooked: boolean;
  price: number;
}
