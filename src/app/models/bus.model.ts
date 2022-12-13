export interface BusType extends BusMain {
  _id: string;
  ava: string;
  bookedSeats: number[]
}

export interface BusMain {
  name: string;
  from: string;
  to: string;
  type: string;
  dep: string;
  arr: string;
  date: string;
  fare: number;
}
