import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeModel } from './home.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    bus: HomeModel;
    busesArray: HomeModel[];
    private busesArrayListener = new Subject<HomeModel[]>()
    constructor(private http: HttpClient) {}

    getBusesArrayListener() {
        return this.busesArrayListener.asObservable();
    }

    getViewSeats() {
        return this.bus;
    }

    fetchBusDetails(from: string, to: string, date: string) {
        this.http.get<{message: string, buses: HomeModel[]}>(`http://localhost:3000/bus/fetch?from=${from}&to=${to}&date=${date}`)
        .subscribe((resData) => {
            console.log(resData);
            this.busesArray = resData.buses;
            this.busesArrayListener.next(this.busesArray);
            console.log(this.busesArray)
          })
    }

    bookBus(id: string, selectedSeatNos: number[]) {
        let bookBusObj ={
            id: id,
            seatArr: selectedSeatNos 
        }
        this.http.post('http://localhost:3000/bus/book', bookBusObj)
        .subscribe(resData=> {
            console.log(resData);
        })
    }
}