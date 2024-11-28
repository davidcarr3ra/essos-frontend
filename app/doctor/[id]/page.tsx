import Doctor from "@/components/doctor/doctor";
import { notFound } from "next/navigation";
import { getDoctorById } from "@/data/doctors";

interface PageProps {
  params: {
    id: string;
  };
}

export default function DoctorPage({ params }: PageProps) {
  console.log("PARAMS", params);
  const doctor = getDoctorById(params.id);

  if (!doctor) {
    notFound();
  }

  return <Doctor doctor={doctor} />;
}
