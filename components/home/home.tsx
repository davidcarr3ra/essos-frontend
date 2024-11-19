"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button";
import { useDoctor } from "@/context/doctor-context";

const categories = [
  { name: "Hair Transplant", slug: "hair-transplant" },
  { name: "IVF", slug: "ivf" },
  { name: "Eye Lift", slug: "eye-lift" },
  { name: "Dental Implants", slug: "dental-implants" },
  { name: "Plastic Surgery", slug: "plastic-surgery" },
  { name: "Orthopedic Surgery", slug: "orthopedic-surgery" },
];

export default function HomePage() {
	const { setSelectedTreatment } = useDoctor();
  return (
    <div className="h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col items-center justify-center p-4">
		{/* <div className="bg-gradient-to-br from-primary-50 to-primary-100 flex flex-col items-center justify-center p-4">             */}
			<main className="text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-primary mb-8">
          Your Health, Your Journey
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 mb-12">
          Discover world-class medical treatments across the globe
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/doctor-search`} passHref>
              <Button
                variant="outline"
                className="w-full h-24 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setSelectedTreatment(category.name)}
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </div>
      </main>
      
      <footer className="absolute bottom-0 left-0 w-full p-4 text-center text-gray-600">
        © 2024 Essos. All rights reserved.
      </footer>
    </div>
  )
}