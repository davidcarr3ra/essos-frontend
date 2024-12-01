"use client";

import { useState } from "react";
import {
  CalendarIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  ClockIcon,
  HeartPulseIcon,
  DollarSignIcon,
  ListIcon,
  MapIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import CategoryMapView from "./map";
import { doctors } from "@/data/doctors";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useDoctor } from "@/context/doctor-context";

export default function DoctorSearch() {
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState(doctors);
  const [isMapView, setIsMapView] = useState(false);
  const { setSelectedPrice, setSelectedDoctor } = useDoctor();

  const handleSearch = () => {
    // In a real application, this would be an API call
    const filteredDoctors = doctors.filter(
      (doctor) =>
        doctor.location.toLowerCase().includes(location.toLowerCase()) &&
        (!date || doctor.availability === date.toISOString().split("T")[0]),
    );
    setSearchResults(filteredDoctors);
  };

  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-full pt-8">
        {/* <h1 className="text-4xl font-bold mb-8 text-center">Find Your Perfect Doctor</h1> */}
        <div className="container mx-auto">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="Enter city or country"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? date.toDateString() : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button className="mt-6" onClick={handleSearch}>
                  <SearchIcon className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Search Results</h2>
            <div className="flex items-center space-x-2">
              <ListIcon className={`h-5 w-5 ${!isMapView ? "text-primary" : "text-gray-400"}`} />
              <Switch
                checked={isMapView}
                onCheckedChange={setIsMapView}
                aria-label="Toggle map view"
              />
              <MapIcon className={`h-5 w-5 ${isMapView ? "text-primary" : "text-gray-400"}`} />
            </div>
          </div>
        </div>

        {isMapView ? (
          <div className="w-full h-full">
            <CategoryMapView />
          </div>
        ) : (
          <div className="container mx-auto">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={doctor.image} alt={doctor.name} />
                        <AvatarFallback>
                          {doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-semibold">{doctor.name}</h2>
                        <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400 mr-2" />
                        <span className="font-semibold">{doctor.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSignIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span className="font-semibold">${doctor.price}</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                        <span>{doctor.experience} years</span>
                      </div>
                      <div className="flex items-center">
                        <HeartPulseIcon className="h-5 w-5 text-red-500 mr-2" />
                        <span>{doctor.procedures}+ procedures</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold mb-2">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((lang) => (
                          <Badge key={lang} variant="secondary">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold mb-2">Education</h3>
                      <p className="text-sm text-muted-foreground">{doctor.education[0]}</p>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPinIcon className="h-4 w-4 mr-2" />
                      {doctor.location}
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold mb-2">Availability</h3>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">75% booked this month</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/doctor/${doctor.id}`}
                      className={`${buttonVariants({ variant: "default" })} w-full`}
                      onClick={() => {
                        setSelectedPrice(doctor.price);
                        setSelectedDoctor(doctor);
                      }}
                    >
                      Book Appointment
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
