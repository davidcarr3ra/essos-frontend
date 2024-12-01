"use client";

import { useState } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";
import { doctors } from "@/data/doctors";
import { useDoctor } from "@/context/doctor-context";

// First, add this CSS either in your global CSS file or as a styled-jsx block at the top of your component
const mapStyles = `
  .mapboxgl-popup-content {
    background: none !important;
    border: none !important;
    padding: 0 !important;
    box-shadow: none !important;
    animation: popupFade 0.2s ease-out;
  }
  
  .mapboxgl-popup-tip {
    display: none !important;
  }

  @keyframes popupFade {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export default function CategoryMapView() {
  const { selectedDoctor, setSelectedDoctor, setSelectedPrice } = useDoctor();
  const [viewState, setViewState] = useState({
    latitude: 20,
    longitude: 0,
    zoom: 1.5,
  });

  return (
    // <div className="flex flex-col h-screen">
    <div className="flex flex-col h-full">
      <style jsx global>
        {mapStyles}
      </style>
      <div className="flex-grow relative">
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/light-v10"
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          onClick={() => setSelectedDoctor(null)}
        >
          {doctors.map((doctor) => (
            <Marker
              key={doctor.id}
              latitude={doctor.coordinates[1]}
              longitude={doctor.coordinates[0]}
            >
              <button
                className="bg-primary text-white rounded-full p-2 font-bold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setSelectedPrice(doctor.price);
									setSelectedDoctor(doctor);
                }}
              >
                ${doctor.price}
              </button>
            </Marker>
          ))}

          {selectedDoctor && (
            <Popup
              latitude={selectedDoctor.coordinates[1]}
              longitude={selectedDoctor.coordinates[0]}
              onClose={() => setSelectedDoctor(null)}
              closeOnClick={false}
              closeButton={false}
              anchor="bottom"
              offset={[-32, -25]}
            >
              <Card className="w-[300px]">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src={selectedDoctor.image} alt={selectedDoctor.name} />
                    <AvatarFallback>
                      {selectedDoctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{selectedDoctor.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{selectedDoctor.location}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-sm mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{selectedDoctor.rating}</span>
                    <span className="text-muted-foreground">
                      ({selectedDoctor.reviews} reviews)
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-primary font-semibold mb-2">
                    ${selectedDoctor.price}
                  </Badge>
                  <Link href={`/doctor/${selectedDoctor.id}`} className="block">
                    <Button className="w-full">Book Appointment</Button>
                  </Link>
                </CardContent>
              </Card>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
}
