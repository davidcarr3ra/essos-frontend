"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { IDoctor } from '@/data/doctors';

export enum Treatment { // todo later
  HAIR_TRANSPLANT = 'HAIR_TRANSPLANT',
  IVF = 'IVF',
  EYE_LIFT = 'EYE_LIFT',
  DENTAL_IMPLANTS = 'DENTAL_IMPLANTS',
  PLASTIC_SURGERY = 'PLASTIC_SURGERY',
  ORTHOPEDIC_SURGERY = 'ORTHOPEDIC_SURGERY'
}

interface DoctorContextType {
  selectedDoctor: IDoctor | null;
  setSelectedDoctor: Dispatch<SetStateAction<IDoctor | null>>;
  selectedTreatment: string | null;
  setSelectedTreatment: Dispatch<SetStateAction<string | null>>;
	selectedPrice: number | null;
	setSelectedPrice: Dispatch<SetStateAction<number | null>>;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

interface DoctorProviderProps {
  children: ReactNode;
}

export function DoctorProvider({ children }: DoctorProviderProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
	const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const value: DoctorContextType = {
    selectedDoctor,
    setSelectedDoctor,
    selectedTreatment,
    setSelectedTreatment,
		selectedPrice,
		setSelectedPrice,
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctor(): DoctorContextType {
  const context = useContext(DoctorContext);
  if (context === undefined) {
    throw new Error('useDoctor must be used within a DoctorProvider');
  }
  return context;
}