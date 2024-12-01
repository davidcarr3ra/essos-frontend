"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WaitlistPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('https://formspree.io/f/xvgovyzl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setOpen(false);
      setName("");
      setEmail("");
    } catch (err) {
      setError("Failed to join waitlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[-180px]">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="text-lg px-8 py-3 backdrop-blur-sm !bg-background/20 text-white rounded-lg">
              Join Waitlist
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Join our Waitlist</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full mt-4">
                Sign Up
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="absolute z-10 top-4 right-4">
        <button 
          className="text-base px-6 py-2 backdrop-blur-sm !bg-background/20 text-white rounded-lg"
          onClick={() => router.push("/home")}
        >
          Launch Beta
        </button>
      </div>
      <Image
        src="/images/brand/recovery.jpg"
        alt="Background"
        fill
        className="object-cover"
        priority
        draggable={false}
      />
    </div>
  );
}
