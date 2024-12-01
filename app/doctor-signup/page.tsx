import DoctorSignUp from "@/components/doctor-signup/doctor-signup";

// Add this line to force dynamic rendering since this is a form page
export const dynamic = 'force-dynamic';

export default function DoctorSignUpPage() {
  return <DoctorSignUp />;
}
