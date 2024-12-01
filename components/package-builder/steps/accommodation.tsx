"use client";

import { useState } from "react";
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
import { Star, Wifi, Utensils, Dumbbell } from "lucide-react";
import { IHotel, hotels } from "@/data/hotels";

interface IProps {
  selectedAccommodation: IHotel | null;
  setSelectedAccommodation: (value: IHotel | null) => void;
  accommodationNights: number;
  setAccommodationNights: (value: number) => void;
  handleNext: () => void;
}

export function AccommodationSection({
  selectedAccommodation,
  setSelectedAccommodation,
  accommodationNights,
  setAccommodationNights,
  handleNext,
}: IProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [starFilter, setStarFilter] = useState<number | null>(null);

  const filteredHotels = hotels.filter(
    (hotel: IHotel) =>
      hotel.price >= priceRange[0] &&
      hotel.price <= priceRange[1] &&
      (starFilter === null || hotel.stars === starFilter),
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredHotels.map((hotel) => (
          <Card
            key={hotel.id}
            className={`overflow-hidden ${selectedAccommodation?.id === hotel.id ? "ring-2 ring-primary" : ""}`}
          >
            <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover" />
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{hotel.name}</span>
                <span className="text-2xl font-bold">${hotel.price}</span>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center gap-1 mb-2">{renderStars(hotel.stars)}</div>
                {hotel.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">{renderAmenities(hotel.amenities)}</div>
                <RadioGroup
                  value={selectedAccommodation?.id || ""}
                  onValueChange={(value) =>
                    setSelectedAccommodation(hotels.find((h) => h.id === value) || null)
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
            <p className="font-medium">{selectedAccommodation.name}</p>
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
    </div>
  );
}
