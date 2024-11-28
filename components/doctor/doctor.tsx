"use client";

import { useState, useEffect } from "react";
import { format, getDay } from "date-fns";
import { CalendarIcon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useDoctor } from "@/context/doctor-context";
import { IDoctor } from "@/data/doctors";
import { useRouter, useSearchParams, usePathname, useParams } from "next/navigation";

interface IProps {
  doctor: IDoctor;
}

export default function DoctorPage({ doctor }: IProps) {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  const renderStars = (rating: number) => {
    return (
      <span className="flex">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={index < rating ? "text-yellow-400" : "text-muted-foreground"}
          >
            ★
          </span>
        ))}
      </span>
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", content: newMessage.trim() }]);
      setNewMessage("");
      // Simulate doctor's response after a short delay
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: doctor.name,
            content: "Thank you for your message. How can I assist you today?",
          },
        ]);
      }, 1000);
    }
  };

  const generateTimeSlots = (date: Date) => {
    const day = getDay(date);
    let slots: string[] = [];

    // Weekdays
    if (day >= 1 && day <= 5) {
      slots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];
    }
    // Saturday
    else if (day === 6) {
      slots = ["10:00 AM", "11:00 AM", "12:00 PM"];
    }
    // Sunday
    else {
      slots = [];
    }

    // Simulate some slots being unavailable
    return slots.filter(() => Math.random() > 0.3);
  };

  useEffect(() => {
    if (selectedDate) {
      setAvailableTimeSlots(generateTimeSlots(selectedDate));
      setSelectedTime(null);
    }
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback>
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <CardTitle className="text-3xl mb-2">{doctor.name}</CardTitle>
                  <CardDescription className="text-lg mb-2">{doctor.specialty}</CardDescription>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2">
                    <Badge variant="secondary">{doctor.location}</Badge>
                    <Badge variant="secondary">{doctor.experience} Years Experience</Badge>
                    <Badge variant="secondary">
                      {doctor.rating} ★ ({doctor.reviews} reviews)
                    </Badge>
                    <Badge variant="secondary">${doctor.price} per procedure</Badge>
                  </div>
                  <div className="mt-4 space-x-2">
                    <Button variant="outline" onClick={() => setIsMessageOpen(true)}>
                      Message Doctor
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h2 className="text-2xl font-semibold mb-4">
                  About Dr. {doctor.name.split(" ")[1]}
                </h2>
                <p className="mb-4">{doctor.about}</p>
                <h3 className="text-xl font-semibold mb-2">Education & Training</h3>
                <ul className="list-disc list-inside mb-4">
                  {doctor.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Before & After</CardTitle>
                <CardDescription>Results from previous patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {doctor.beforeAfterImages.map((images, index) => (
                    <div key={index} className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <img
                          src={images.before}
                          alt={`Before ${index + 1}`}
                          className="w-full h-auto rounded"
                        />
                        <img
                          src={images.after}
                          alt={`After ${index + 1}`}
                          className="w-full h-auto rounded"
                        />
                      </div>
                      <p className="text-center text-sm text-muted-foreground">Case {index + 1}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Patient Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctor.patientReviews.map((review) => (
                    <div key={review.id} className="pb-4 border-b last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{review.name}</span>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarIcon className="mr-2" />
                  Availability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setSelectedTime(null);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                {availableTimeSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableTimeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-sm text-muted-foreground">
                    No available time slots for the selected date.
                  </p>
                )}

                {selectedDate && selectedTime && (
                  <p className="text-center text-sm text-muted-foreground">
                    Selected: {format(selectedDate, "PPP")} at {selectedTime}
                  </p>
                )}

                <Button className="w-full" disabled={!selectedDate || !selectedTime}>
                  <Link href="/package-builder">Book Appointment</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={isMessageOpen} onOpenChange={setIsMessageOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Message Dr. {doctor.name.split(" ")[1]}</DialogTitle>
            <DialogDescription>
              Start a conversation with Dr. {doctor.name.split(" ")[1]}. They typically respond
              within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col h-[400px]">
            <ScrollArea className="flex-grow mb-4 p-4 border rounded-md">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 ${msg.sender === "You" ? "text-right" : "text-left"}`}
                >
                  <span className="font-semibold">{msg.sender}: </span>
                  <span>{msg.content}</span>
                </div>
              ))}
            </ScrollArea>
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                className="flex-grow"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
