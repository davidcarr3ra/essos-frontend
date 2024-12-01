export interface IFlight {
  id: number;
  airline: string;
  departure: string;
  arrival: string;
  duration: string;
  class: "economy" | "business" | "firstClass";
  price: number;
}

export const flightOptions: IFlight[] = [
  {
    id: 1,
    airline: "AirMed",
    departure: "08:00",
    arrival: "12:00",
    duration: "4h",
    class: "economy",
    price: 500,
  },
  {
    id: 1,
    airline: "AirMed",
    departure: "08:00",
    arrival: "12:00",
    duration: "4h",
    class: "business",
    price: 1000,
  },
  {
    id: 1,
    airline: "AirMed",
    departure: "08:00",
    arrival: "12:00",
    duration: "4h",
    class: "firstClass",
    price: 1500,
  },
  {
    id: 2,
    airline: "HealthJet",
    departure: "10:00",
    arrival: "14:30",
    duration: "4h 30m",
    class: "economy",
    price: 550,
  },
  {
    id: 2,
    airline: "HealthJet",
    departure: "10:00",
    arrival: "14:30",
    duration: "4h 30m",
    class: "business",
    price: 1100,
  },
  {
    id: 2,
    airline: "HealthJet",
    departure: "10:00",
    arrival: "14:30",
    duration: "4h 30m",
    class: "firstClass",
    price: 1600,
  },
  {
    id: 3,
    airline: "MediAir",
    departure: "13:00",
    arrival: "16:45",
    duration: "3h 45m",
    class: "economy",
    price: 600,
  },
  {
    id: 3,
    airline: "MediAir",
    departure: "13:00",
    arrival: "16:45",
    duration: "3h 45m",
    class: "business",
    price: 1200,
  },
  {
    id: 3,
    airline: "MediAir",
    departure: "13:00",
    arrival: "16:45",
    duration: "3h 45m",
    class: "firstClass",
    price: 1800,
  },
];



// ----- copied from backend flights.ts -----

export enum CabinClass {
  Economy = 'economy',
  PremiumEconomy = 'premium_economy',
  Business = 'business',
  First = 'first'
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: {
    to: string;
    from: string;
  };
  arrivalTime: {
    to: string;
    from: string;
  };
  returnDate?: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabinClass?: CabinClass;
}

export interface IFlightOffer {
  id: string;
  totalAmount: string;
  totalCurrency: string;
  itineraries: Array<{
    segments: Array<{
      origin: {
        code: string;
        name: string;
      };
      destination: {
        code: string;
        name: string;
      };
      departureTime: string;
      arrivalTime: string;
      carrier: {
        code: string;
        name: string;
      };
      flightNumber: string;
      duration: string;
    }>;
  }>;
}

// -----------------------------------

const API_URL = 'http://localhost:3001';

export async function searchFlights(params: FlightSearchParams): Promise<IFlightOffer[]> {
  try {
    const response = await fetch(`${API_URL}/api/flights/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch flights');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
}

export function formatFlightForDisplay(flight: IFlightOffer) {
  const outbound = flight.itineraries[0].segments[0];
  const departureTime = new Date(outbound.departureTime);
  const arrivalTime = new Date(outbound.arrivalTime);
	const duration = formatDuration(outbound.duration);

  return {
    id: flight.id,
    time: `${departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    airline: outbound.carrier.name,
    duration: duration,
    stops: flight.itineraries[0].segments.length > 1 ? `${flight.itineraries[0].segments.length - 1} stop(s)` : 'Nonstop',
    price: `$${parseFloat(flight.totalAmount)}`,
  };
}

const cityToAirportCode = {
  "New York": "JFK",
  "Los Angeles": "LAX",
  "London": "LHR",
  "Seoul": "ICN",
	"Barcelona": "BCN",
} as const;

export function getAirportCode(city: string): string {
  return cityToAirportCode[city as keyof typeof cityToAirportCode];
}

export const formatTimeForAPI = (hour: number) => {
  if (hour === 24) return '23:59';
  // Pad hours with leading zero and add minutes
  return `${hour.toString().padStart(2, '0')}:00`;
};

export function formatDuration(isoDuration: string): string {
  const matches = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!matches) return '';
  
  const [_, hours, minutes] = matches;
  const formattedHours = hours ? `${parseInt(hours)} hr` : '';
  const formattedMinutes = minutes ? `${parseInt(minutes)} min` : '';
  
  return [formattedHours, formattedMinutes].filter(Boolean).join(' ');
}

export interface TimeRange {
  departure: number[];
  arrival: number[];
}

// Sample connecting airports data
export const connectingAirports = [
  { code: "AUH", name: "Abu Dhabi" },
  { code: "ADD", name: "Addis Ababa" },
  { code: "AMS", name: "Amsterdam" },
  { code: "AYT", name: "Antalya" },
  { code: "ATH", name: "Athens" },
  { code: "ATL", name: "Atlanta" },
  { code: "BCN", name: "Barcelona" },
  { code: "BEG", name: "Belgrade" },
  { code: "BER", name: "Berlin" },
];