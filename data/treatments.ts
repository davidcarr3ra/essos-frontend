export interface ITreatment {
	id: string;
	name: string;
	price: number;
}

export const treatments: ITreatment[] = [
  { id: 'hairTransplant', name: 'Hair Transplant', price: 5000 },
  { id: 'dentalImplants', name: 'Dental Implants', price: 3000 },
  { id: 'lasik', name: 'LASIK Eye Surgery', price: 2000 }
]