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
    id: 'grand-plaza', 
    name: 'Grand Plaza Hotel', 
    stars: 5, 
    price: 250, 
    description: 'Luxury hotel in the heart of the city with stunning views.',
    amenities: ['wifi', 'restaurant', 'gym'],
    image: '/images/hotels/grand-plaza.jpg'
  },
  { 
    id: 'seaside-inn', 
    name: 'Seaside Inn', 
    stars: 4, 
    price: 180, 
    description: 'Charming beachfront hotel with direct access to the shore.',
    amenities: ['wifi', 'restaurant'],
    image: '/images/hotels/seaside-inn.jpg'
  },
  { 
    id: 'urban-oasis', 
    name: 'Urban Oasis', 
    stars: 4, 
    price: 200, 
    description: 'Modern hotel with a rooftop pool and bar.',
    amenities: ['wifi', 'restaurant', 'gym'],
    image: '/images/hotels/urban-oasis.jpg'
  },
  { 
    id: 'cozy-retreat', 
    name: 'Cozy Retreat', 
    stars: 3, 
    price: 120, 
    description: 'Comfortable and affordable option in a quiet neighborhood.',
    amenities: ['wifi'],
    image: '/images/hotels/cozy-retreat.jpg'
  },
  { 
    id: 'business-suites', 
    name: 'Business Suites', 
    stars: 4, 
    price: 220, 
    description: 'Perfect for business travelers with in-room workspaces.',
    amenities: ['wifi', 'restaurant', 'gym'],
    image: '/images/hotels/business-suites.jpg'
  },
]