export interface HomeModel {
    _id: string;
    from: string;
    to: string;
    type: string;
    dep: string;
    arr: string;
    date: string;
    ava: string;
    fare: number;
    bookedSeats: number[]
}