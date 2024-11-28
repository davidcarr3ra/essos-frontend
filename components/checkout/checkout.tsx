"use client";

import { useState } from "react";
import { Calendar, CreditCard, Lock, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function Component() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      router.push("/itinerary");
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Payment Form */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Secure Payment
            </CardTitle>
            <CardDescription>Enter your payment details to complete your booking</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input id="name" placeholder="Name as shown on card" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="number">Card Number</Label>
                  <Input id="number" placeholder="1234 5678 9012 3456" required />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="month">Expiry Month</Label>
                    <Select>
                      <SelectTrigger id="month">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => {
                          const month = (i + 1).toString().padStart(2, "0");
                          return (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="year">Expiry Year</Label>
                    <Select>
                      <SelectTrigger id="year">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = (new Date().getFullYear() + i).toString();
                          return (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required maxLength={4} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg border p-4">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-sm text-muted-foreground">
                  Your payment is secured with SSL encryption
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? <>Processing...</> : <>Pay $3,850</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Booking Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
            <CardDescription>Review your medical tourism package</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Treatment Details */}
            <div className="space-y-2">
              <h3 className="font-semibold">Treatment</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Medical Procedure</span>
                <span>$1,500</span>
              </div>
            </div>
            <Separator />
            {/* Flight Details */}
            <div className="space-y-2">
              <h3 className="font-semibold">Flights</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Departure (Business)</span>
                  <span>$1,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Return (Business)</span>
                  <span>$1,000</span>
                </div>
              </div>
            </div>
            <Separator />
            {/* Accommodation Details */}
            <div className="space-y-2">
              <h3 className="font-semibold">Accommodation</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Urban Oasis (1 night)</span>
                <span>$200</span>
              </div>
            </div>
            <Separator />
            {/* Transport Details */}
            <div className="space-y-2">
              <h3 className="font-semibold">Local Transport</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Airport Transfer</span>
                  <span>$100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Clinic Transfer</span>
                  <span>$50</span>
                </div>
              </div>
            </div>
            <Separator />
            {/* Important Dates */}
            <div className="space-y-2">
              <h3 className="font-semibold">Important Dates</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Treatment Date: March 15, 2024
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Check-in: March 14, 2024
                </div>
              </div>
            </div>
            {/* Total */}
            <div className="rounded-lg bg-muted p-4">
              <div className="flex justify-between">
                <span className="font-semibold">Total Amount</span>
                <span className="font-semibold">$3,850</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                All prices are in USD and include applicable taxes
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              Your booking is secure and your data is protected
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
