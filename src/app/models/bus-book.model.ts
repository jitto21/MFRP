import { BusMain } from "./bus.model";

export interface BusBook extends BusMain {
  seatForm: {
    seatDetails: {
      name: string;
      age: number;
      gender: string;
      seatNo: number;
    }[];
  };
}
