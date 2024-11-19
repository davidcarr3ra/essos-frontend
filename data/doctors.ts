export interface IDoctor {
	id: number;
	name: string;
	specialty: string;
	location: string;
	coordinates: [number, number];
	experience: number;
	rating: number;
	reviews: number;
	image: string;
	about: string;
	education: string[];
	beforeAfterImages: { before: string; after: string }[];
	patientReviews: { id: number; name: string; rating: number; comment: string }[];
	price: number;
	availability: string;
	procedures: number;
	languages: string[];
}

export const doctors: IDoctor[] = [
	{
		id: 1,
		name: "Dr. Sarah Johnson",
		specialty: "Hair Transplant",
		location: "New York, USA",
		coordinates: [-74.006, 40.7128],
		experience: 15,
		rating: 4.8,
		reviews: 127,
		image: "/placeholder.svg?height=400&width=400",
		about: "Dr. Sarah Johnson is a board-certified dermatologist specializing in hair restoration. With over 15 years of experience, she has helped thousands of patients regain their confidence through advanced hair transplant techniques.",
		education: [
			"MD from Harvard Medical School",
			"Residency in Dermatology at Johns Hopkins Hospital",
			"Fellowship in Hair Restoration at NYU Langone Health"
		],
		beforeAfterImages: [
			{ before: "/placeholder.svg?height=300&width=300", after: "/placeholder.svg?height=300&width=300" },
			{ before: "/placeholder.svg?height=300&width=300", after: "/placeholder.svg?height=300&width=300" },
			{ before: "/placeholder.svg?height=300&width=300", after: "/placeholder.svg?height=300&width=300" },
		],
		patientReviews: [
			{ id: 1, name: "John D.", rating: 5, comment: "Dr. Johnson is amazing! My results exceeded my expectations." },
			{ id: 2, name: "Emily S.", rating: 4, comment: "Very professional and knowledgeable. Highly recommend." },
			{ id: 3, name: "Michael R.", rating: 5, comment: "Life-changing experience. Dr. Johnson is truly skilled." },
		],
		price: 1500,
		availability: "Monday-Friday",
		procedures: 100,
		languages: ["English", "Spanish"]
	},
	{
		id: 2,
		name: "Dr. Michael Lee",
		specialty: "Hair Transplant",
		location: "Seoul, South Korea",
		coordinates: [126.9780, 37.5665],
		experience: 12,
		rating: 4.9,
		reviews: 208,
		image: "/placeholder.svg?height=400&width=400",
		about: "Dr. Michael Lee is a renowned hair transplant specialist with extensive experience in the latest restoration techniques. His clinic in Seoul is known for combining innovative technology with artistic precision.",
		education: [
			"MD from Seoul National University",
			"Residency in Plastic Surgery at Severance Hospital",
			"Fellowship in Hair Restoration at Samsung Medical Center"
		],
		beforeAfterImages: [
			{ before: "/placeholder.svg?height=300&width=300", after: "/placeholder.svg?height=300&width=300" },
			{ before: "/placeholder.svg?height=300&width=300", after: "/placeholder.svg?height=300&width=300" },
		],
		patientReviews: [
			{ id: 1, name: "James K.", rating: 5, comment: "Traveled from the US for the procedure. Best decision ever!" },
			{ id: 2, name: "David L.", rating: 5, comment: "Exceptional results and very professional staff." },
			{ id: 3, name: "Sarah M.", rating: 4.5, comment: "Great experience overall. Very satisfied with the results." },
		],
		price: 2000,
		availability: "Monday-Friday",
		procedures: 150,
		languages: ["English", "Korean"]
	},
	{
		id: 3,
		name: "Dr. Emma Garcia",
		specialty: "Hair Transplant",
		location: "Barcelona, Spain",
		coordinates: [2.1734, 41.3851],
		experience: 10,
		rating: 4.7,
		reviews: 95,
		image: "/placeholder.svg?height=400&width=400",
		about: "Dr. Emma Garcia brings a unique artistic approach to hair restoration, combining traditional techniques with modern innovations. Her clinic in Barcelona is known for natural-looking results.",
		education: [
			"MD from University of Barcelona",
			"Residency in Dermatology at Hospital Clinic de Barcelona",
			"Advanced Training in Hair Restoration, Madrid"
		],
		beforeAfterImages: [
			{ before: "/placeholder.svg?height=300&width=300", after: "/placeholder.svg?height=300&width=300" },
			{ before: "/placeholder.svg?height=300&width=300", after: "/placeholder.svg?height=300&width=300" },
		],
		patientReviews: [
			{ id: 1, name: "Carlos R.", rating: 5, comment: "Excellent results and very caring approach." },
			{ id: 2, name: "Maria P.", rating: 4, comment: "Professional team and great attention to detail." },
		],
		price: 1800,
		availability: "Monday-Friday",
		procedures: 120,
		languages: ["English", "Spanish"]
	}
];

export function getDoctorById(id: string): IDoctor | undefined {
	return doctors.find(doctor => doctor.id === parseInt(id));
}