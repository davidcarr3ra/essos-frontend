import { IFlight, flightOptions } from "@/data/flights";
import { hotels } from "@/data/hotels";

interface IProps {
  selectedPrice: number;
  skipFlights: boolean;
  selectedDepartureFlight: IFlight | null;
  selectedReturnFlight: IFlight | null;
  flightType: 'oneWay' | 'roundTrip';
  selectedAccommodation: string | null;
  accommodationNights: number;
  includeAirportTransfer: boolean;
  includeClinicTransfer: boolean;
	calculateTotalCost: (
		treatmentPrice: number, 
		skipFlights: boolean, 
		selectedDepartureFlight: IFlight | null, 
		selectedReturnFlight: IFlight | null, 
		flightType: 'oneWay' | 'roundTrip', 
		selectedAccommodation: string | null, 
		accommodationNights: number, 
		includeAirportTransfer: boolean, 
		includeClinicTransfer: boolean
	) => number;
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
  calculateTotalCost
}: IProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Package Summary</h3>
      <p>Treatment Cost: ${selectedPrice}</p>
      {!skipFlights && (
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
      )}
      {selectedAccommodation && (
        <p>Accommodation: {hotels.find(h => h.id === selectedAccommodation)?.name} - 
          ${(hotels.find(h => h.id === selectedAccommodation)?.price || 0) * accommodationNights} (${hotels.find(h => h.id === selectedAccommodation)?.price}/night for {accommodationNights} nights)
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
      <p className="font-bold">Total: ${calculateTotalCost(selectedPrice!, skipFlights, selectedDepartureFlight, selectedReturnFlight, flightType, selectedAccommodation, accommodationNights, includeAirportTransfer, includeClinicTransfer)}</p>
    </div>
  )
}