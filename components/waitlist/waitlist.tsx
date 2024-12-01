"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function WaitlistPage() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-[-180px]">
				<button className="text-lg px-8 py-3 backdrop-blur-sm !bg-background/20 text-white rounded-lg">
          Join Waitlist
        </button>
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
