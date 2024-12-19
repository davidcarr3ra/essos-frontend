"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns"
import { Star, Wifi, Utensils, Dumbbell, Plus, Minus, Calendar, CalendarIcon } from "lucide-react";
import { IHotel, IHotelOffer, getHotelOffers, hotels } from "@/data/hotels";
import { Button } from "@/components/ui/button";
// import { listHotels } from "@/data/hotels-api";
import { listHotels } from "@/data/hotels";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface IProps {
  selectedAccommodation: IHotel | null;
  setSelectedAccommodation: (value: IHotel | null) => void;
  accommodationNights: number;
  setAccommodationNights: (value: number) => void;
  handleNext: () => void;
}

// Add this helper function before the component
const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export function AccommodationSection({
  selectedAccommodation,
  setSelectedAccommodation,
  accommodationNights,
  setAccommodationNights,
  handleNext,
}: IProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [starFilter, setStarFilter] = useState<number | null>(null);
  const [hotelOffers, setHotelOffers] = useState<IHotelOffer[]>([]);

	const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(1)

  const filteredHotels = hotels.filter(
    (hotel: IHotel) =>
      hotel.price >= priceRange[0] &&
      hotel.price <= priceRange[1] &&
      (starFilter === null || hotel.stars === starFilter),
  );

  const filteredHotels2 = useMemo(() => 
    hotelOffers.map((hotelOffer) => ({
      id: hotelOffer.hotel.hotelId,
      name: hotelOffer.hotel.name,
      stars: 5,
      price: parseFloat(hotelOffer.offers[0]?.price.total || "0"),
      description: hotelOffer.offers[0]?.room.description.text || "",
      amenities: ["wifi"],
      image: "/images/hotels/grand-plaza.jpg",
    })), [hotelOffers]
  );

  const renderStars = (count: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < count ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  const renderAmenities = (amenities: string[]) => {
    const amenityIcons = {
      wifi: <Wifi className="w-4 h-4" />,
      restaurant: <Utensils className="w-4 h-4" />,
      gym: <Dumbbell className="w-4 h-4" />,
    };
    return amenities.map((amenity) => (
      <div
        key={amenity}
        className="flex items-center gap-1"
        title={amenity.charAt(0).toUpperCase() + amenity.slice(1)}
      >
        {amenityIcons[amenity as keyof typeof amenityIcons]}
      </div>
    ));
  };

	const handleSearchHotels = async () => {
		const ratings = starFilter ? [starFilter.toString()] : ["5"];
		const hotels = await listHotels({ 
			cityCode: "LON",
			radius: 5,
			chainCodes: ["EM","EH"],
			ratings
		});
		const hotelIds = hotels.map((h) => h.hotelId);
		const offers = await getHotelOffers({ hotelIds });
		setHotelOffers(offers);
	};

  return (
    <div className="space-y-6">
      {/* <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => {
            setSelectedAccommodation(null);
            setAccommodationNights(1);
            handleNext();
          }}
        >
          Skip Accommodation
        </Button>
      </div> */}

      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="priceRange">Price Range</Label>
          <Select
            onValueChange={(value) =>
              setPriceRange(value.split(",").map(Number) as [number, number])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0,300">All Prices</SelectItem>
              <SelectItem value="0,150">$0 - $150</SelectItem>
              <SelectItem value="151,250">$151 - $250</SelectItem>
              <SelectItem value="251,300">$251+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label htmlFor="starRating">Star Rating</Label>
          <Select onValueChange={(value) => setStarFilter(value === "all" ? null : Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select star rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

				{/* <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Check-in</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Check-out</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Number of Guests</label>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                disabled={guests <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium min-w-[2ch] text-center">
                {guests}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setGuests(prev => prev + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div> */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHotels2.map((hotel) => (
          <Card
            key={hotel.id}
            className={`overflow-hidden ${selectedAccommodation?.id === hotel.id ? "ring-2 ring-primary" : ""}`}
          >
            <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover" />
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{toTitleCase(hotel.name)}</span>
                <span className="text-xl font-bold">${hotel.price}</span>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center gap-1 mb-2">{renderStars(starFilter || 5)}</div>
                {hotel.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">{renderAmenities(hotel.amenities)}</div>
                <RadioGroup
                  value={selectedAccommodation?.id || ""}
                  onValueChange={(value) =>
                    setSelectedAccommodation(filteredHotels2.find((h) => h.id === value) || null)
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={hotel.id} id={hotel.id} />
                    <Label htmlFor={hotel.id}>Select</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedAccommodation && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Accommodation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">{toTitleCase(selectedAccommodation.name)}</p>
            <div className="flex justify-between items-center">
              <Label htmlFor="nights">Number of Nights</Label>
              <Input
                id="nights"
                type="number"
                value={accommodationNights}
                onChange={(e) => setAccommodationNights(Number(e.target.value))}
                min={1}
                className="w-20"
              />
            </div>
            <p className="text-right font-bold">
              Total: ${(selectedAccommodation.price || 0) * accommodationNights}
            </p>
          </CardContent>
        </Card>
      )}

			<Button onClick={handleSearchHotels}>Test hotels api</Button>
    </div>
  );
}
