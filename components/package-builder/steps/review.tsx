import { IFlight, IFlightOffer } from "@/data/flights";
import { IHotel } from "@/data/hotels";
import { calculateTotalCost } from "../package-builder";
import { Building, Car, Plane, Stethoscope } from "lucide-react";

interface IProps {
  selectedPrice: number;
  skipFlights: boolean;
  selectedDepartureFlight: IFlightOffer | null;
  selectedReturnFlight: IFlightOffer | null;
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
              {selectedDepartureFlight?.itineraries[0].segments[0].carrier.name} -{" "}
              <span className="capitalize">{"Economy"}</span>
            </p>
            {flightType === "roundTrip" && (
              <p className="text-sm text-muted-foreground">Return flight included</p>
            )}
          </div>
        </div>
        <p className="font-medium">
          $
          {(
            (parseFloat(selectedDepartureFlight?.totalAmount ?? "0") +
              parseFloat(selectedReturnFlight?.totalAmount ?? "0"))
              .toLocaleString()
          )}
        </p>
      </div>

      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <div className="mt-1">
            <Building className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Accommodation</h3>
            <p className="text-sm text-muted-foreground">
              {accommodationNights} nights at ${selectedAccommodation?.price}/night
            </p>
          </div>
        </div>
        <p className="font-medium">${(selectedAccommodation?.price || 0) * accommodationNights}</p>
      </div>

			<div className="flex items-start justify-between">
				<div className="flex gap-3">
					<div className="mt-1">
						<Car className="h-5 w-5 text-primary" />
					</div>
					<div>
						<h3 className="font-medium">Local Transport</h3>
						<p className="text-sm text-muted-foreground">Airport and clinic transfers</p>
					</div>
				</div>
				<p className="font-medium">
					${((includeAirportTransfer ? 100 : 0) + (includeClinicTransfer ? 50 : 0)).toLocaleString()}
				</p>
			</div>
    </div>
  );
}
