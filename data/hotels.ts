export interface IHotel {
  id: string;
  name: string;
  stars: number;
  price: number;
  description: string;
  amenities: string[];
  image: string;
}

export const hotels: IHotel[] = [
  {
    id: "grand-plaza",
    name: "Grand Plaza Hotel",
    stars: 5,
    price: 250,
    description: "Luxury hotel in the heart of the city with stunning views.",
    amenities: ["wifi", "restaurant", "gym"],
    image: "/images/hotels/grand-plaza.jpg",
  },
  {
    id: "seaside-inn",
    name: "Seaside Inn",
    stars: 4,
    price: 180,
    description: "Charming beachfront hotel with direct access to the shore.",
    amenities: ["wifi", "restaurant"],
    image: "/images/hotels/seaside-inn.jpg",
  },
  {
    id: "urban-oasis",
    name: "Urban Oasis",
    stars: 4,
    price: 200,
    description: "Modern hotel with a rooftop pool and bar.",
    amenities: ["wifi", "restaurant", "gym"],
    image: "/images/hotels/urban-oasis.jpg",
  },
  {
    id: "cozy-retreat",
    name: "Cozy Retreat",
    stars: 3,
    price: 120,
    description: "Comfortable and affordable option in a quiet neighborhood.",
    amenities: ["wifi"],
    image: "/images/hotels/cozy-retreat.jpg",
  },
  {
    id: "business-suites",
    name: "Business Suites",
    stars: 4,
    price: 220,
    description: "Perfect for business travelers with in-room workspaces.",
    amenities: ["wifi", "restaurant", "gym"],
    image: "/images/hotels/business-suites.jpg",
  },
];

// -----------------------------------

interface IHotelListParams {
  cityCode: string;
  radius?: number;
  radiusUnit?: 'KM' | 'MILE';
  hotelSource?: 'ALL' | 'AMADEUS' | 'BOOKING';
	chainCodes?: string[];
	ratings?: string[];
}

interface IHotelOfferParams {
  hotelIds: string[];
}

interface IHotel2 {
  chainCode: string;
  iataCode: string;
  dupeId: number;
  name: string;
  hotelId: string;
  geoCode: {
    latitude: number;
    longitude: number;
  };
  address: {
    countryCode: string;
  };
  distance: {
    value: number;
    unit: string;
  };
  lastUpdate: string;
}

const API_URL = 'http://localhost:3001';

export async function listHotels(params: IHotelListParams): Promise<IHotel2[]> {
  try {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          queryParams.append(`${key}[]`, value.join(','));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    }

    const response = await fetch(`${API_URL}/api/hotels/list?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch hotels');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error;
  }
}

export async function getHotelOffers(params: IHotelOfferParams): Promise<IHotelOffer[]> {
  try {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          queryParams.append(`${key}[]`, value.join(','));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    }

    const response = await fetch(`${API_URL}/api/hotels/details?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch hotel offers');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotel offers:', error);
    throw error;
  }
}

export interface IHotelOffer {
  type: string;
  hotel: {
    hotelId: string;
    name: string;
    chainCode: string;
    cityCode: string;
    latitude: number;
    longitude: number;
  };
  available: boolean;
  offers: {
    id: string;
    room: {
      description: {
        text: string;
      };
    };
    price: {
      currency: string;
      total: string;
    };
  }[];
}