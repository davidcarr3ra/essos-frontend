"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Stethoscope,
  Globe,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  specialty: z.string().min(2, { message: "Specialty must be at least 2 characters." }),
  yearsOfExperience: z.number().min(1, { message: "Years of experience must be at least 1." }),
  licenseNumber: z.string().min(5, { message: "License number must be at least 5 characters." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
  languages: z.string().min(2, { message: "Languages must be at least 2 characters." }),
  bio: z.string().min(50, { message: "Bio must be at least 50 characters." }),
  medicalAssociations: z
    .string()
    .min(2, { message: "Please list at least one medical association." }),
  photoId: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Photo ID is required")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .pdf, .jpg and .png files are accepted.",
    ),
  medicalCertificates: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Medical certificates are required")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
      "Only .pdf, .jpg and .png files are accepted.",
    ),
  cv: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "CV is required")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => files[0]?.type === "application/pdf",
      "Only .pdf files are accepted for CV.",
    ),
});

type FormData = z.infer<typeof formSchema>;

export default function DoctorSignUp() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    const formData = {
      ...data,
      photoId: data.photoId[0],
      medicalCertificates: data.medicalCertificates[0],
      cv: data.cv[0],
    };
    setIsSubmitted(true);
  };

  const totalSteps = 4;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Join Our Global Medical Network</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Why Join Essos?</CardTitle>
            <CardDescription>
              Expand your practice globally with our medical tourism platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <span>Access patients from around the world</span>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span>Increase your revenue potential</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>We handle logistics, you focus on patient care</span>
            </div>
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-5 w-5 text-primary" />
              <span>Join a network of world-class medical professionals</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doctor Application</CardTitle>
            <CardDescription>
              {isSubmitted ? "Thank you for your application!" : `Step ${step} of ${totalSteps}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {step === 1 && (
                  <>
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" {...register("fullName")} />
                      {errors.fullName && (
                        <p className="text-sm text-red-500">{errors.fullName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register("email")} />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="specialty">Medical Specialty</Label>
                      <Input id="specialty" {...register("specialty")} />
                      {errors.specialty && (
                        <p className="text-sm text-red-500">{errors.specialty.message}</p>
                      )}
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div>
                      <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                      <Input
                        id="yearsOfExperience"
                        type="number"
                        {...register("yearsOfExperience", { valueAsNumber: true })}
                      />
                      {errors.yearsOfExperience && (
                        <p className="text-sm text-red-500">{errors.yearsOfExperience.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="licenseNumber">Medical License Number</Label>
                      <Input id="licenseNumber" {...register("licenseNumber")} />
                      {errors.licenseNumber && (
                        <p className="text-sm text-red-500">{errors.licenseNumber.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="country">Country of Practice</Label>
                      <Input id="country" {...register("country")} />
                      {errors.country && (
                        <p className="text-sm text-red-500">{errors.country.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="languages">Languages Spoken</Label>
                      <Input id="languages" {...register("languages")} />
                      {errors.languages && (
                        <p className="text-sm text-red-500">{errors.languages.message}</p>
                      )}
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div>
                      <Label htmlFor="bio">Professional Bio</Label>
                      <Textarea id="bio" {...register("bio")} />
                      {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="medicalAssociations">Medical Associations</Label>
                      <Textarea
                        id="medicalAssociations"
                        {...register("medicalAssociations")}
                        placeholder="List the medical associations you are a member of, separated by commas"
                      />
                      {errors.medicalAssociations && (
                        <p className="text-sm text-red-500">{errors.medicalAssociations.message}</p>
                      )}
                    </div>
                  </>
                )}
                {step === 4 && (
                  <>
                    <div>
                      <Label htmlFor="photoId">Photo ID</Label>
                      <Input
                        id="photoId"
                        type="file"
                        {...register("photoId")}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      {errors.photoId && (
                        <p className="text-sm text-red-500">{errors.photoId.message?.toString()}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="medicalCertificates">Medical Certificates</Label>
                      <Input
                        id="medicalCertificates"
                        type="file"
                        {...register("medicalCertificates")}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      {errors.medicalCertificates && (
                        <p className="text-sm text-red-500">
                          {errors.medicalCertificates.message?.toString()}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="cv">CV (PDF only)</Label>
                      <Input id="cv" type="file" {...register("cv")} accept=".pdf" />
                      {errors.cv && (
                        <p className="text-sm text-red-500">{errors.cv.message?.toString()}</p>
                      )}
                    </div>
                  </>
                )}
              </form>
            ) : (
              <div className="text-center space-y-4">
                <Check className="h-16 w-16 text-green-500 mx-auto" />
                <p className="text-xl font-semibold">Application Submitted Successfully!</p>
                <p>
                  Thank you for your interest in joining our platform. Our team will review your
                  application and get back to you within 3-5 business days.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {!isSubmitted && (
              <>
                {step > 1 && (
                  <Button onClick={prevStep} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button onClick={nextStep} className="ml-auto">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit(onSubmit)} className="ml-auto">
                    Submit Application
                  </Button>
                )}
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
