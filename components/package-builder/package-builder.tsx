"use client";

import { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Check,
  Building2,
  Car,
  Plane,
  Stethoscope,
  CalendarIcon,
  Star,
  Wifi,
  Coffee,
  Utensils,
  Dumbbell,
} from "lucide-react";
import { useDoctor } from "@/context/doctor-context";
import Link from "next/link";
import { FlightsSection } from "./steps/flights";
import { flightOptions, IFlight } from "@/data/flights";
import { AccommodationSection } from "./steps/accommodation";
import { LocalTransportSection } from "./steps/local-transport";
import { ReviewSection } from "./steps/review";
import { treatments } from "@/data/treatments";
import { hotels, IHotel } from "@/data/hotels";
import FlightsSection2 from "./steps/flights2";

const steps = [
  {
    id: "treatment",
    title: "Treatment",
    description: "Select your procedure",
    icon: Stethoscope,
  },
  {
    id: "flights",
    title: "Flights",
    description: "Book your travel",
    icon: Plane,
  },
  {
    id: "accommodation",
    title: "Accommodation",
    description: "Choose your stay",
    icon: Building2,
  },
  {
    id: "localTransport",
    title: "Local Transport",
    description: "Plan local travel",
    icon: Car,
  },
  {
    id: "review",
    title: "Review",
    description: "Confirm details",
    icon: Check,
  },
];

export default function PackageBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [departureDate, setDepartureDate] = useState<Date>(new Date(2024, 10, 1));
  const [returnDate, setReturnDate] = useState<Date>(new Date(2024, 10, 5));
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState<IFlight | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<IFlight | null>(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState<IHotel | null>(null);
  const [accommodationNights, setAccommodationNights] = useState(1);
  const [includeAirportTransfer, setIncludeAirportTransfer] = useState(false);
  const [includeClinicTransfer, setIncludeClinicTransfer] = useState(false);
  const [skipFlights, setSkipFlights] = useState(false);
  const [flightType, setFlightType] = useState<"oneWay" | "roundTrip" | undefined>("roundTrip");
  const { selectedPrice } = useDoctor();

  useEffect(() => {
    if (departureDate) {
      setReturnDate(addDays(departureDate, 5));
    }
  }, [departureDate]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 1 && skipFlights) {
        setCurrentStep(currentStep + 2); // Skip to accommodation step
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      if (currentStep === 3 && skipFlights) {
        setCurrentStep(currentStep - 2); // Go back to treatment step
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case "treatment":
        return (
          <RadioGroup value={selectedTreatment || ""} onValueChange={setSelectedTreatment}>
            {treatments.map((treatment) => (
              <div key={treatment.id} className="flex items-center space-x-2">
                <RadioGroupItem value={treatment.id} id={treatment.id} />
                <Label htmlFor={treatment.id}>
                  {treatment.name} - ${treatment.price}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "flights":
        return (
          // <FlightsSection
          //   departureDate={departureDate}
          //   setDepartureDate={setDepartureDate}
          //   returnDate={returnDate}
          //   setReturnDate={setReturnDate}
          //   selectedDepartureFlight={selectedDepartureFlight}
          //   setSelectedDepartureFlight={setSelectedDepartureFlight}
          //   selectedReturnFlight={selectedReturnFlight}
          //   setSelectedReturnFlight={setSelectedReturnFlight}
          //   skipFlights={skipFlights}
          //   setSkipFlights={setSkipFlights}
          //   flightType={flightType}
          //   setFlightType={setFlightType}
          //   handleNext={handleNext}
          // />
          <FlightsSection2 />
        );
      case "accommodation":
        return (
          <AccommodationSection
            selectedAccommodation={selectedAccommodation}
            setSelectedAccommodation={setSelectedAccommodation}
            accommodationNights={accommodationNights}
            setAccommodationNights={setAccommodationNights}
            handleNext={handleNext}
          />
        );
      case "localTransport":
        return (
          <LocalTransportSection
            includeAirportTransfer={includeAirportTransfer}
            setIncludeAirportTransfer={setIncludeAirportTransfer}
            includeClinicTransfer={includeClinicTransfer}
            setIncludeClinicTransfer={setIncludeClinicTransfer}
            handleNext={handleNext}
          />
        );
      case "review":
        return (
          <ReviewSection
            selectedPrice={selectedPrice!}
            skipFlights={skipFlights}
            selectedDepartureFlight={selectedDepartureFlight}
            selectedReturnFlight={selectedReturnFlight}
            flightType={flightType}
            selectedAccommodation={selectedAccommodation}
            accommodationNights={accommodationNights}
            includeAirportTransfer={includeAirportTransfer}
            includeClinicTransfer={includeClinicTransfer}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <div className="relative">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
                      ${
                        index < currentStep
                          ? "bg-primary border-primary text-primary-foreground"
                          : index === currentStep
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-background border-muted-foreground text-muted-foreground"
                      }`}
                  >
                    {index < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <StepIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${
                        index <= currentStep ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
        <CardFooter className="flex justify-between">
          {currentStep !== 0 && steps[currentStep].id !== "flights" && (
            <Button onClick={handleBack}>Back</Button>
          )}
          {currentStep === steps.length - 1 ? (
            <Link href="/checkout">
              <Button>Checkout</Button>
            </Link>
          ) : (
            <Button onClick={handleNext} className="ml-auto">
              {currentStep === steps.length - 2 ? "Review" : "Next"}
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card className="w-full max-w-4xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>Package Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            Total: $
            {calculateTotalCost(
              selectedPrice!,
              skipFlights,
              selectedDepartureFlight,
              selectedReturnFlight,
              flightType,
              selectedAccommodation,
              accommodationNights,
              includeAirportTransfer,
              includeClinicTransfer,
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export const calculateTotalCost = (
  treatmentPrice: number,
  skipFlights: boolean,
  selectedDepartureFlight: IFlight | null,
  selectedReturnFlight: IFlight | null,
  flightType: "oneWay" | "roundTrip" | undefined,
  selectedAccommodation: IHotel | null,
  accommodationNights: number,
  includeAirportTransfer: boolean,
  includeClinicTransfer: boolean,
) => {
  let total = 0;
  total += treatmentPrice;
  if (!skipFlights) {
    if (selectedDepartureFlight) {
      const departureFlight = flightOptions.find(
        (f) => f.id === selectedDepartureFlight.id && f.class === selectedDepartureFlight.class,
      );
      if (departureFlight) {
        total += departureFlight.price;
      }
    }
    if (flightType === "roundTrip" && selectedReturnFlight) {
      const returnFlight = flightOptions.find(
        (f) => f.id === selectedReturnFlight.id && f.class === selectedReturnFlight.class,
      );
      if (returnFlight) {
        total += returnFlight.price;
      }
    }
  }
  if (selectedAccommodation) {
    total += (selectedAccommodation.price || 0) * accommodationNights;
  }
  if (includeAirportTransfer) {
    total += 100; // $100 for airport transfer
  }
  if (includeClinicTransfer) {
    total += 50; // $50 for clinic transfer
  }
  return total;
};
