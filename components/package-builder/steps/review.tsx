import { IFlight, flightOptions } from "@/data/flights";
import { hotels, IHotel } from "@/data/hotels";
import { calculateTotalCost } from "../package-builder";
import { Building, Plane, Stethoscope } from "lucide-react";

interface IProps {
  selectedPrice: number;
  skipFlights: boolean;
  selectedDepartureFlight: IFlight | null;
  selectedReturnFlight: IFlight | null;
  flightType: "oneWay" | "roundTrip" | undefined;
  selectedAccommodation: IHotel | null;
  accommodationNights: number;
  includeAirportTransfer: boolean;
  includeClinicTransfer: boolean;
}

export function ReviewSection({
  selectedPrice,
  skipFlights,
  selectedDepartureFlight,
  selectedReturnFlight,
  flightType,
  selectedAccommodation,
  accommodationNights,
  includeAirportTransfer,
  includeClinicTransfer,
}: IProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Package Summary</h3>

      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="mt-1">
            <Stethoscope className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Medical Treatment</h3>
            <p className="text-sm text-muted-foreground">Medical procedure cost</p>
          </div>
        </div>
        <p className="font-medium">${selectedPrice ?? 0}</p>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="mt-1">
            <Plane className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Flights</h3>
            <p className="text-sm text-muted-foreground">
              {selectedDepartureFlight?.airline} -{" "}
              <span className="capitalize">{selectedDepartureFlight?.class}</span>
            </p>
            {flightType === "roundTrip" && (
              <p className="text-sm text-muted-foreground">Return flight included</p>
            )}
          </div>
        </div>
        <p className="font-medium">
          $
          {(
            (selectedDepartureFlight?.price ?? 0) + (selectedReturnFlight?.price ?? 0)
          ).toLocaleString()}
        </p>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="mt-1">
            <Building className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">{selectedAccommodation?.name}</h3>
            <p className="text-sm text-muted-foreground">
              {accommodationNights} nights at ${selectedAccommodation?.price}/night
            </p>
          </div>
        </div>
        <p className="font-medium">${(selectedAccommodation?.price || 0) * accommodationNights}</p>
      </div>

      {/* {!skipFlights && (
        <>
          {selectedDepartureFlight && (
            <p>Departure Flight: {flightOptions.find(f => 
              f.id === selectedDepartureFlight.id && 
              f.class === selectedDepartureFlight.class
            )?.airline} - 
              ${flightOptions.find(f => 
                f.id === selectedDepartureFlight.id && 
                f.class === selectedDepartureFlight.class
              )?.price} ({selectedDepartureFlight.class === 'firstClass' ? 'First Class' : selectedDepartureFlight.class.charAt(0).toUpperCase() + selectedDepartureFlight.class.slice(1)})
            </p>
          )}
          {flightType === 'roundTrip' && selectedReturnFlight && (
            <p>Return Flight: {flightOptions.find(f => 
              f.id === selectedReturnFlight.id && 
              f.class === selectedReturnFlight.class
            )?.airline} - 
              ${flightOptions.find(f => 
                f.id === selectedReturnFlight.id && 
                f.class === selectedReturnFlight.class
              )?.price} ({selectedReturnFlight.class === 'firstClass' ? 'First Class' : selectedReturnFlight.class.charAt(0).toUpperCase() + selectedReturnFlight.class.slice(1)})
            </p>
          )}
        </>
      )} */}
      {selectedAccommodation && (
        <p>
          Accommodation: {selectedAccommodation.name} - $
          {(selectedAccommodation.price || 0) * accommodationNights} (${selectedAccommodation.price}
          /night for {accommodationNights} nights)
        </p>
      )}
      {(includeAirportTransfer || includeClinicTransfer) && (
        <p>
          Local Transport:
          {includeAirportTransfer && " Airport Transfer: $100"}
          {includeAirportTransfer && includeClinicTransfer && ","}
          {includeClinicTransfer && " Clinic Transfer: $50"}
        </p>
      )}
      <p className="font-bold">
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
    </div>
  );
}
