export interface IFlight {
	id: number;
	airline: string;
	departure: string;
	arrival: string;
	duration: string;
	class: 'economy' | 'business' | 'firstClass';
	price: number;
}

export const flightOptions: IFlight[] = [
  { id: 1, airline: 'AirMed', departure: '08:00', arrival: '12:00', duration: '4h', class: 'economy', price: 500 },
  { id: 1, airline: 'AirMed', departure: '08:00', arrival: '12:00', duration: '4h', class: 'business', price: 1000 },
  { id: 1, airline: 'AirMed', departure: '08:00', arrival: '12:00', duration: '4h', class: 'firstClass', price: 1500 },
  { id: 2, airline: 'HealthJet', departure: '10:00', arrival: '14:30', duration: '4h 30m', class: 'economy', price: 550 },
  { id: 2, airline: 'HealthJet', departure: '10:00', arrival: '14:30', duration: '4h 30m', class: 'business', price: 1100 },
  { id: 2, airline: 'HealthJet', departure: '10:00', arrival: '14:30', duration: '4h 30m', class: 'firstClass', price: 1600 },
  { id: 3, airline: 'MediAir', departure: '13:00', arrival: '16:45', duration: '3h 45m', class: 'economy', price: 600 },
  { id: 3, airline: 'MediAir', departure: '13:00', arrival: '16:45', duration: '3h 45m', class: 'business', price: 1200 },
  { id: 3, airline: 'MediAir', departure: '13:00', arrival: '16:45', duration: '3h 45m', class: 'firstClass', price: 1800 },
]
// export interface IFlight {
// 	id: number;
// 	airline: string;
// 	departure: string;
// 	arrival: string;
// 	duration: string;
// 	price: {
// 		economy: number;
// 		business: number;
// 		firstClass: number;
// 	}
// }

// export const flightOptions: IFlight[] = [
//   { id: 1, airline: 'AirMed', departure: '08:00', arrival: '12:00', duration: '4h', price: { economy: 500, business: 1000, firstClass: 1500 } },
//   { id: 2, airline: 'HealthJet', departure: '10:00', arrival: '14:30', duration: '4h 30m', price: { economy: 550, business: 1100, firstClass: 1600 } },
//   { id: 3, airline: 'MediAir', departure: '13:00', arrival: '16:45', duration: '3h 45m', price: { economy: 600, business: 1200, firstClass: 1800 } },
// ]
