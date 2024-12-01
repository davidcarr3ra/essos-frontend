"use client";

import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, Plane, PlaneLanding, PlaneTakeoff, RefreshCcw } from 'lucide-react';
import * as React from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommandList } from "cmdk";

import { CabinClass, connectingAirports, IFlightOffer, formatFlightForDisplay, formatTimeForAPI, getAirportCode, searchFlights, TimeRange } from "@/data/flights";
import { useCallback } from "react";
import { useDoctor } from "@/context/doctor-context";

interface IProps {
	setFlightSearchResults: (flights: IFlightOffer[]) => void;
	flightSearchResults: IFlightOffer[];
	setSelectedDepartureFlight: (flight: IFlightOffer) => void;
}

export default function FlightsSection({
	setFlightSearchResults,
	flightSearchResults,
	setSelectedDepartureFlight,
}: IProps) {
  const [isRoundTrip, setIsRoundTrip] = React.useState(true);
  const [fromCity, setFromCity] = React.useState("");
  const [departureDate, setDepartureDate] = React.useState<Date>();
  const [returnDate, setReturnDate] = React.useState<Date>();
  const [outboundTimes, setOutboundTimes] = React.useState<TimeRange>({
    departure: [0, 24],
    arrival: [0, 24],
  });
  const [returnTimes, setReturnTimes] = React.useState<TimeRange>({
    departure: [0, 24],
    arrival: [0, 24],
  });
  const [priceRange, setPriceRange] = React.useState(13000);
  const [duration, setDuration] = React.useState(48);
  const [layoverDuration, setLayoverDuration] = React.useState(24);
  const [selectedAirports, setSelectedAirports] = React.useState<string[]>([]);
  const [allConnectingAirports, setAllConnectingAirports] = React.useState(true);
  const [selectedFlight, setSelectedFlight] = React.useState<string | null>(null);

	const { selectedDoctor } = useDoctor();

	const handleSearchFlights = useCallback(async () => {
		if (!selectedDoctor) return;
		try {
			const destination = selectedDoctor.location.split(',')[0].trim();

			const searchParams = {
				origin: fromCity.split('(')[1].split(')')[0], // Extract airport code
				destination: getAirportCode(destination),
				departureDate: departureDate ? format(departureDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : '',
				departureTime: {
					from: formatTimeForAPI(outboundTimes.departure[0]),
					to: formatTimeForAPI(outboundTimes.departure[1])
				},
				arrivalTime: {
					from: formatTimeForAPI(outboundTimes.arrival[0]),
					to: formatTimeForAPI(outboundTimes.arrival[1])
				},
				returnDate: isRoundTrip && returnDate ? format(returnDate, "yyyy-MM-dd'T'HH:mm:ss'Z'") : undefined,
				passengers: {
					adults: 1,
					children: 0,
					infants: 0,
				},
				cabinClass: CabinClass.Economy,
			};
			const flights = await searchFlights(searchParams);
			setFlightSearchResults(flights);
			
		} catch (error) {
			console.error("Error fetching flights:", error);
			setFlightSearchResults([]);
		}
	}, [fromCity, selectedDoctor?.location, departureDate, outboundTimes, returnDate, isRoundTrip]);


  const formatTime = (hour: number) => {
    if (hour === 0 || hour === 24) return "12:00 AM";
    if (hour === 12) return "12:00 PM";
    return hour < 12 ? `${hour}:00 AM` : `${hour - 12}:00 PM`;
  };

  const getTimeRangeText = (times: TimeRange) => {
    if (
      times.departure[0] === 0 &&
      times.departure[1] === 24 &&
      times.arrival[0] === 0 &&
      times.arrival[1] === 24
    ) {
      return "Any time";
    }
    return "Time range set";
  };

  const handleResetTimes = () => {
    setOutboundTimes({
      departure: [0, 24],
      arrival: [0, 24],
    });
    setReturnTimes({
      departure: [0, 24],
      arrival: [0, 24],
    });
  };

  const handleResetPrice = () => {
    setPriceRange(13000);
  };

  const handleResetDuration = () => {
    setDuration(48);
  };

  const handleResetConnecting = () => {
    setLayoverDuration(24);
    setSelectedAirports([]);
    setAllConnectingAirports(true);
  };

  const toggleAirport = (code: string) => {
    setSelectedAirports((current) =>
      current.includes(code) ? current.filter((x) => x !== code) : [...current, code],
    );
  };

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto p-4 space-y-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch checked={isRoundTrip} onCheckedChange={setIsRoundTrip} />
              <Label>Round trip</Label>
            </div>
            <Select defaultValue="1">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Passengers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 passenger</SelectItem>
                <SelectItem value="2">2 passengers</SelectItem>
                <SelectItem value="3">3 passengers</SelectItem>
                <SelectItem value="4">4 passengers</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="economy">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={CabinClass.Economy}>Economy</SelectItem>
                <SelectItem value={CabinClass.PremiumEconomy}>Premium Economy</SelectItem>
                <SelectItem value={CabinClass.Business}>Business</SelectItem>
                <SelectItem value={CabinClass.First}>First Class</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSearchFlights}>Search Flights</Button>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[250px] justify-start text-left font-normal">
                  <PlaneTakeoff className="mr-2 h-4 w-4" />
                  {fromCity || "From"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search airports..." />
                  <CommandList>
                    <CommandEmpty>No airports found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem onSelect={() => {
                        setFromCity("New York (JFK)");
                      }}>
                        New York (JFK)
                      </CommandItem>
                      <CommandItem onSelect={() => {
                        setFromCity("Los Angeles (LAX)");
                      }}>
                        Los Angeles (LAX)
                      </CommandItem>
                      <CommandItem onSelect={() => {
                        setFromCity("London (LHR)");
                      }}>
                        London (LHR)
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button variant="outline" className="w-[250px] justify-start text-left font-normal">
              <PlaneLanding className="mr-2 h-4 w-4" />
              {selectedDoctor?.location || "No location"}
            </Button>
          </div>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departureDate ? format(departureDate, "MM/dd/yyyy") : "Departure"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={departureDate}
                  onSelect={setDepartureDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {isRoundTrip && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[150px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "MM/dd/yyyy") : "Return"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={setReturnDate}
                    disabled={(date) => date < (departureDate || new Date())}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Stops" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="nonstop">Nonstop</SelectItem>
              <SelectItem value="1-stop">1 stop</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Airlines" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any airline</SelectItem>
              <SelectItem value="airmed">AirMed</SelectItem>
              <SelectItem value="healthjet">HealthJet</SelectItem>
            </SelectContent>
          </Select>

          {/* Time Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                <Clock className="mr-2 h-4 w-4" />
                {getTimeRangeText(outboundTimes)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Tabs defaultValue="outbound" className="w-full">
                <div className="border-b px-3">
                  <TabsList className="bg-transparent border-b-0 p-0 h-12">
                    <TabsTrigger
                      value="outbound"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
                    >
                      Outbound
                    </TabsTrigger>
                    <TabsTrigger
                      value="return"
                      className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4"
                    >
                      Return
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-4 pb-2 text-sm text-muted-foreground">
                  {fromCity || "From"} to {selectedDoctor?.location || "To"}
                </div>

                <TabsContent value="outbound" className="mt-0 p-4">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Departure</Label>
                          <span className="text-sm text-muted-foreground">
                            {formatTime(outboundTimes.departure[0])} -{" "}
                            {formatTime(outboundTimes.departure[1])}
                          </span>
                        </div>
                        <Slider
                          min={0}
                          max={24}
                          step={1}
                          value={outboundTimes.departure}
                          onValueChange={(value) =>
                            setOutboundTimes({
                              ...outboundTimes,
                              departure: value as [number, number],
                            })
                          }
                          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Arrival</Label>
                          <span className="text-sm text-muted-foreground">
                            {formatTime(outboundTimes.arrival[0])} -{" "}
                            {formatTime(outboundTimes.arrival[1])}
                          </span>
                        </div>
                        <Slider
                          min={0}
                          max={24}
                          step={1}
                          value={outboundTimes.arrival}
                          onValueChange={(value) =>
                            setOutboundTimes({
                              ...outboundTimes,
                              arrival: value as [number, number],
                            })
                          }
                          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="return" className="mt-0 p-4">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Departure</Label>
                          <span className="text-sm text-muted-foreground">
                            {formatTime(returnTimes.departure[0])} -{" "}
                            {formatTime(returnTimes.departure[1])}
                          </span>
                        </div>
                        <Slider
                          min={0}
                          max={24}
                          step={1}
                          value={returnTimes.departure}
                          onValueChange={(value) =>
                            setReturnTimes({ ...returnTimes, departure: value as [number, number] })
                          }
                          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Arrival</Label>
                          <span className="text-sm text-muted-foreground">
                            {formatTime(returnTimes.arrival[0])} -{" "}
                            {formatTime(returnTimes.arrival[1])}
                          </span>
                        </div>
                        <Slider
                          min={0}
                          max={24}
                          step={1}
                          value={returnTimes.arrival}
                          onValueChange={(value) =>
                            setReturnTimes({ ...returnTimes, arrival: value as [number, number] })
                          }
                          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <div className="flex items-center justify-end gap-2 p-4 border-t">
                  <Button variant="ghost" size="sm" onClick={handleResetTimes}>
                    Clear
                  </Button>
                </div>
              </Tabs>
            </PopoverContent>
          </Popover>

          {/* Price Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                <span className="mr-2">$</span>
                {priceRange === 13000 ? "All prices" : `Up to $${priceRange.toLocaleString()}`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Price</Label>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {priceRange === 13000 ? "All prices" : `up to $${priceRange.toLocaleString()}`}
                  </div>
                  <div className="relative">
                    <Slider
                      min={0}
                      max={13000}
                      step={100}
                      value={[priceRange]}
                      onValueChange={(value) => setPriceRange(value[0])}
                      className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                    />
                    {priceRange < 13000 && (
                      <div className="absolute -top-8 left-[calc(100%*0.95)] transform -translate-x-1/2 bg-primary/10 text-primary rounded-full px-2 py-1 text-sm">
                        ${priceRange.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={handleResetPrice}>
                    Clear
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Duration Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                <Clock className="mr-2 h-4 w-4" />
                {`Under ${duration} hr`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Flight duration</Label>
                    <span className="text-sm text-muted-foreground">Under {duration} hr</span>
                  </div>
                  <Slider
                    min={1}
                    max={48}
                    step={1}
                    value={[duration]}
                    onValueChange={(value) => setDuration(value[0])}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                  />
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={handleResetDuration}>
                    Clear
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Connecting Airports Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[180px] justify-start text-left font-normal px-4 whitespace-nowrap"
              >
                <PlaneLanding className="mr-3 h-4 w-4" />
                <span className="truncate">Layovers</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Layover duration</Label>
                    <span className="text-sm text-muted-foreground">
                      Under {layoverDuration} hr
                    </span>
                  </div>
                  <Slider
                    min={1}
                    max={24}
                    step={1}
                    value={[layoverDuration]}
                    onValueChange={(value) => setLayoverDuration(value[0])}
                    className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>All connecting airports</Label>
                    <Switch
                      checked={allConnectingAirports}
                      onCheckedChange={setAllConnectingAirports}
                    />
                  </div>
                  {!allConnectingAirports && (
                    <ScrollArea className="h-[200px] pr-4">
                      <div className="space-y-2">
                        {connectingAirports.map((airport) => (
                          <div key={airport.code} className="flex items-center space-x-2">
                            <Checkbox
                              id={airport.code}
                              checked={selectedAirports.includes(airport.code)}
                              onCheckedChange={() => toggleAirport(airport.code)}
                            />
                            <label
                              htmlFor={airport.code}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {airport.name} ({airport.code})
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
                <div className="flex justify-end">
                  <Button variant="ghost" size="sm" onClick={handleResetConnecting}>
                    Clear
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Flight Results */}
				{flightSearchResults.length > 0 && (
					<ScrollArea className="h-[600px] pr-4">
						<div className="space-y-4">
							{/* Best Price Section */}
							<div className="flex items-center justify-between">
								<div className="text-lg font-semibold">Best departing flights</div>
								<div className="flex items-center gap-2">
									<span className="text-sm text-muted-foreground">Sort by:</span>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="outline" size="sm">
												Price
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>Price</DropdownMenuItem>
											<DropdownMenuItem>Duration</DropdownMenuItem>
											<DropdownMenuItem>Departure time</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>

							{/* Flight Cards */}
							{flightSearchResults.length > 0 ? (
								flightSearchResults.map((flight) => {
									const displayFlight = formatFlightForDisplay(flight);
									return (
										<Card
											key={flight.id}
											className={cn(
												"transition-colors cursor-pointer",
												selectedFlight === flight.id && "border-primary bg-primary/5"
											)}
											role="button"
											tabIndex={0}
											aria-selected={selectedFlight === flight.id}
											onClick={() => {
												setSelectedFlight(flight.id);
												setSelectedDepartureFlight(flight);
											}}
											onKeyDown={(e) => { // todo: potentially remove
												if (e.key === "Enter" || e.key === " ") {
													e.preventDefault();
													setSelectedFlight(flight.id);
													setSelectedDepartureFlight(flight);
												}
											}}
										>
											<CardContent className="p-6">
												<div className="flex items-center justify-between">
													<div className="flex items-center gap-4">
														<div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
															<Plane className="h-4 w-4" />
														</div>
														<div>
															<div className="font-semibold">{displayFlight.time}</div>
															<div className="text-sm text-muted-foreground">{displayFlight.airline}</div>
														</div>
													</div>
													<div className="text-center">
														<div className="font-semibold">{displayFlight.duration}</div>
														<div className="text-sm text-muted-foreground">
															{displayFlight.stops}
														</div>
													</div>
													<div>
														<div className="font-semibold">{displayFlight.price}</div>
														<div className="text-sm text-muted-foreground">round trip</div>
													</div>
												</div>
											</CardContent>
										</Card>
									);
								})
							) : (
								<div className="text-center py-8 text-muted-foreground">
									No flights found. Please try different search criteria.
								</div>
							)}
						</div>
					</ScrollArea>
				)}
      </div>
    </div>
  );
}