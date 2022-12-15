import { BusMain } from "./bus.model";

export interface BusBookResponse {
  message: string;
  tickets: [
    {
      tickets: Tickets[];
      _id: string;
      fname: string;
      lname: string;
      phone: string;
      gender: string;
      age: number;
      email: string;
      pass: string;
      __v: number;
    }
  ];
}

export interface Tickets extends BusMain {
  seatForm: { seatDetails: SeatDetails[] };
}

export interface SeatDetails {
  name: string;
  age: number;
  gender: string;
  seatNo: number;
}
