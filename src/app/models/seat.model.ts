export interface Seat {
  seatFormDetails: SeatForm[];
  fare: number;
  seatDetails: SeatDetails;
}

export interface SeatForm {
    name: string;
    age: string;
    gender: string;
}

export interface SeatDetails {
    id: string;
    seatArr: number[];
}