import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IFlight, flightOptions } from "@/data/flights";

const renderFlightTable = (
  selectedFlight: IFlight | null,
  setSelectedFlight: React.Dispatch<React.SetStateAction<IFlight | null>>,
) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Airline</TableHead>
        <TableHead>Departure</TableHead>
        <TableHead>Arrival</TableHead>
        <TableHead>Duration</TableHead>
        <TableHead>Economy</TableHead>
        <TableHead>Business</TableHead>
        <TableHead>First Class</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {/* Group flights by ID to show different classes for the same flight */}
      {Array.from(new Set(flightOptions.map((f) => f.id))).map((flightId) => {
        const flightGroup = flightOptions.filter((f) => f.id === flightId);
        const baseFlight = flightGroup[0];

        return (
          <TableRow key={flightId}>
            <TableCell>{baseFlight.airline}</TableCell>
            <TableCell>{baseFlight.departure}</TableCell>
            <TableCell>{baseFlight.arrival}</TableCell>
            <TableCell>{baseFlight.duration}</TableCell>
            <TableCell>
              <RadioGroup
                value={
                  selectedFlight?.id === flightId && selectedFlight.class === "economy"
                    ? "selected"
                    : ""
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="selected"
                    id={`economy-${flightId}`}
                    onClick={() =>
                      setSelectedFlight(flightGroup.find((f) => f.class === "economy") || null)
                    }
                  />
                  <Label htmlFor={`economy-${flightId}`}>
                    ${flightGroup.find((f) => f.class === "economy")?.price}
                  </Label>
                </div>
              </RadioGroup>
            </TableCell>
            <TableCell>
              <RadioGroup
                value={
                  selectedFlight?.id === flightId && selectedFlight.class === "business"
                    ? "selected"
                    : ""
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="selected"
                    id={`business-${flightId}`}
                    onClick={() =>
                      setSelectedFlight(flightGroup.find((f) => f.class === "business") || null)
                    }
                  />
                  <Label htmlFor={`business-${flightId}`}>
                    ${flightGroup.find((f) => f.class === "business")?.price}
                  </Label>
                </div>
              </RadioGroup>
            </TableCell>
            <TableCell>
              <RadioGroup
                value={
                  selectedFlight?.id === flightId && selectedFlight.class === "firstClass"
                    ? "selected"
                    : ""
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="selected"
                    id={`firstClass-${flightId}`}
                    onClick={() =>
                      setSelectedFlight(flightGroup.find((f) => f.class === "firstClass") || null)
                    }
                  />
                  <Label htmlFor={`firstClass-${flightId}`}>
                    ${flightGroup.find((f) => f.class === "firstClass")?.price}
                  </Label>
                </div>
              </RadioGroup>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

interface IProps {
  departureDate: Date;
  setDepartureDate: (date: Date) => void;
  returnDate: Date;
  setReturnDate: (date: Date) => void;
  selectedDepartureFlight: IFlight | null;
  setSelectedDepartureFlight: React.Dispatch<React.SetStateAction<IFlight | null>>;
  selectedReturnFlight: IFlight | null;
  setSelectedReturnFlight: React.Dispatch<React.SetStateAction<IFlight | null>>;
  skipFlights: boolean;
  setSkipFlights: (skip: boolean) => void;
  flightType: "oneWay" | "roundTrip" | undefined;
  setFlightType: (type: "oneWay" | "roundTrip" | undefined) => void;
  handleNext: () => void;
}

export function FlightsSection({
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  selectedDepartureFlight,
  setSelectedDepartureFlight,
  selectedReturnFlight,
  setSelectedReturnFlight,
  skipFlights,
  setSkipFlights,
  flightType,
  setFlightType,
  handleNext,
}: IProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Flight Selection</h3>
        <Button
          variant="outline"
          onClick={() => {
            handleNext();
            setFlightType(undefined);
            if (!skipFlights) {
              setSelectedDepartureFlight(null);
              setSelectedReturnFlight(null);
            }
          }}
        >
          {skipFlights ? "Include Flights" : "Skip Flights"}
        </Button>
      </div>
      {!skipFlights && (
        <>
          <Tabs
            defaultValue="roundTrip"
            onValueChange={(value) => setFlightType(value as "oneWay" | "roundTrip")}
          >
            <TabsList>
              <TabsTrigger value="roundTrip">Round-trip</TabsTrigger>
              <TabsTrigger value="oneWay">One-way</TabsTrigger>
            </TabsList>
            <TabsContent value="oneWay">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="departureDate">Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !departureDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={departureDate}
                        onSelect={(date) => setDepartureDate(date as Date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Select Departure Flight</h4>
                  {renderFlightTable(selectedDepartureFlight, setSelectedDepartureFlight)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="roundTrip">
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Label htmlFor="departureDate">Departure Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !departureDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {departureDate ? format(departureDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={departureDate}
                          onSelect={(date) => setDepartureDate(date as Date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="returnDate">Return Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !returnDate && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={(date) => setReturnDate(date as Date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Select Departure Flight</h4>
                  {renderFlightTable(selectedDepartureFlight, setSelectedDepartureFlight)}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Select Return Flight</h4>
                  {renderFlightTable(selectedReturnFlight, setSelectedReturnFlight)}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
