"use client";

import { useState } from "react";
import {
  CalendarClock,
  Plane,
  MapPin,
  Car,
  Hospital,
  Hotel,
  AlertCircle,
  Stethoscope,
  Pill,
  LuggageIcon as Suitcase,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const stages = [
  { id: "pre-departure", name: "Pre-Departure" },
  { id: "arrival", name: "Arrival" },
  { id: "pre-treatment", name: "Pre-Treatment" },
  { id: "treatment", name: "Treatment" },
  { id: "post-treatment", name: "Post-Treatment" },
  { id: "departure", name: "Departure" },
];

export default function PostCheckout() {
  const [currentStage, setCurrentStage] = useState("pre-departure");

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Your Medical Journey</CardTitle>
              <CardDescription>Booking confirmed for March 14-16, 2024</CardDescription>
            </div>
            <Badge variant="default" className="text-sm">
              Confirmed
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress
            value={((stages.findIndex((s) => s.id === currentStage) + 1) / stages.length) * 100}
            className="h-2 mt-2"
          />
          <div className="flex justify-between mt-2">
            {stages.map((stage, index) => (
              <button
                key={stage.id}
                className={`flex flex-col items-center border-0 bg-transparent ${
                  currentStage === stage.id ? "text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setCurrentStage(stage.id)}
                aria-label={`Go to ${stage.name} stage`}
                aria-current={currentStage === stage.id ? "step" : undefined}
              >
                <div
                  className={`w-3 h-3 rounded-full mb-1 ${
                    currentStage === stage.id ? "bg-primary" : "bg-secondary"
                  }`}
                  aria-hidden="true"
                />
                <span className="text-xs">{stage.name}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Digital Itinerary</CardTitle>
            <CardDescription>Your step-by-step guide for a smooth medical journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={currentStage} onValueChange={setCurrentStage}>
              <TabsList className="grid grid-cols-3 md:grid-cols-6">
                {stages.map((stage) => (
                  <TabsTrigger key={stage.id} value={stage.id} className="text-xs">
                    {stage.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="pre-departure" className="mt-4 space-y-4">
                <div className="flex items-start space-x-4">
                  <Plane className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Flight Details</h4>
                    <p className="text-sm text-muted-foreground">
                      AirMed 123 - Departing at 10:00 AM, March 14
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Gate: B12 - Boarding starts at 9:15 AM
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <AlertCircle className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Pre-Flight Checklist</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      <li>Passport and visa (if required)</li>
                      <li>Printed medical documents</li>
                      <li>Comfortable clothing for travel</li>
                      <li>Any prescribed medications</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="arrival" className="mt-4 space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Arrival Information</h4>
                    <p className="text-sm text-muted-foreground">
                      Destination: International Airport, Terminal 2
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Expected arrival: 2:00 PM, March 14
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Car className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Transportation to Hotel</h4>
                    <p className="text-sm text-muted-foreground">
                      A driver will be waiting for you at the arrival hall
                    </p>
                    <p className="text-sm text-muted-foreground">Driver's name: John Smith</p>
                    <p className="text-sm text-muted-foreground">Contact: +1 234 567 8900</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="pre-treatment" className="mt-4 space-y-4">
                <div className="flex items-start space-x-4">
                  <Hotel className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Accommodation Details</h4>
                    <p className="text-sm text-muted-foreground">Urban Oasis Hotel</p>
                    <p className="text-sm text-muted-foreground">
                      Address: 123 Healing Street, Medical District
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Check-in time: 3:00 PM, March 14
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Hospital className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Pre-Treatment Instructions</h4>
                    <p className="text-sm text-muted-foreground">
                      Fasting required 8 hours before the procedure
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Avoid certain medications (see detailed list)
                    </p>
                    <p className="text-sm text-muted-foreground">Get a good night's sleep</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="treatment" className="mt-4 space-y-4">
                <div className="flex items-start space-x-4">
                  <Stethoscope className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Treatment Details</h4>
                    <p className="text-sm text-muted-foreground">
                      Procedure: Specialized Medical Treatment
                    </p>
                    <p className="text-sm text-muted-foreground">Date: March 15, 2024</p>
                    <p className="text-sm text-muted-foreground">Time: 9:00 AM</p>
                    <p className="text-sm text-muted-foreground">
                      Location: Global Health Center, 4th Floor
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <AlertCircle className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Important Notes</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      <li>Arrive 1 hour before the scheduled time</li>
                      <li>Bring all relevant medical records</li>
                      <li>Wear comfortable, loose-fitting clothing</li>
                      <li>A family member or friend can accompany you</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="post-treatment" className="mt-4 space-y-4">
                <div className="flex items-start space-x-4">
                  <Pill className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Recovery Instructions</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      <li>Rest for at least 24 hours post-treatment</li>
                      <li>Take prescribed medications as directed</li>
                      <li>Avoid strenuous activities for 48 hours</li>
                      <li>Stay hydrated and eat light, nutritious meals</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CalendarClock className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Follow-up Appointment</h4>
                    <p className="text-sm text-muted-foreground">Date: March 16, 2024</p>
                    <p className="text-sm text-muted-foreground">Time: 2:00 PM</p>
                    <p className="text-sm text-muted-foreground">
                      Location: Global Health Center, 2nd Floor
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="departure" className="mt-4 space-y-4">
                <div className="flex items-start space-x-4">
                  <Plane className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Return Flight Details</h4>
                    <p className="text-sm text-muted-foreground">
                      AirMed 456 - Departing at 8:00 PM, March 16
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Gate: C24 - Boarding starts at 7:15 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Suitcase className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Departure Checklist</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      <li>Pack all personal belongings</li>
                      <li>Collect all medical documents and prescriptions</li>
                      <li>Check out from the hotel by 12:00 PM</li>
                      <li>Arrive at the airport 3 hours before departure</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Car className="w-5 h-5 mt-0.5 text-primary" />
                  <div>
                    <h4 className="font-semibold">Airport Transfer</h4>
                    <p className="text-sm text-muted-foreground">
                      A driver will pick you up from the hotel at 4:30 PM
                    </p>
                    <p className="text-sm text-muted-foreground">Driver's name: Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Contact: +1 234 567 8901</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold">Treatment</h4>
              <p className="text-sm text-muted-foreground">Medical Procedure: $1,500</p>
            </div>
            <div>
              <h4 className="font-semibold">Flights</h4>
              <p className="text-sm text-muted-foreground">Departure (Business): $1,000</p>
              <p className="text-sm text-muted-foreground">Return (Business): $1,000</p>
            </div>
            <div>
              <h4 className="font-semibold">Accommodation</h4>
              <p className="text-sm text-muted-foreground">Urban Oasis (1 night): $200</p>
            </div>
            <div>
              <h4 className="font-semibold">Local Transport</h4>
              <p className="text-sm text-muted-foreground">Airport Transfer: $100</p>
              <p className="text-sm text-muted-foreground">Clinic Transfer: $50</p>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="font-semibold">$3,850</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
