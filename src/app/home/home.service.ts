import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeModel } from './home.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    bus: HomeModel;
    busesArray: HomeModel[];
    private busesArrayListener = new Subject<HomeModel[]>();
    private seatFormDetails: any;
    private seatDetails: any;
    constructor(private http: HttpClient, private router: Router) { }

    getBusTicket() {
        return {
            name: this.bus.name,
            type: this.bus.type,
            from: this.bus.from,
            to: this.bus.to,
            dep: this.bus.dep,
            arr: this.bus.arr,
            fare: this.bus.fare,
            date: this.bus.date,
            seatForm: this.seatFormDetails
        }
    }

    saveSeatDetails(id: string, seatArr: number[], seatForm) {  //save seat Details before payment is done
        this.seatFormDetails = seatForm;
        this.seatDetails = {
            id: id,
            seatArr: seatArr
        };
        console.log("Saved in Service: ", this.seatDetails);
    }

    getBusesArrayListener() {
        return this.busesArrayListener.asObservable();
    }

    getViewSeats() {
        return this.bus;
    }

    fetchBusDetails(from: string, to: string, date: string) {
        this.http.get<{ message: string, buses: HomeModel[] }>(`http://localhost:3000/bus/fetch?from=${from}&to=${to}&date=${date}`)
            .subscribe((resData) => {
                console.log(resData);
                this.busesArray = resData.buses;
                this.busesArrayListener.next(this.busesArray);
                console.log(this.busesArray)
            })
    }

    bookBus() {
        // let bookBusObj ={
        //     id: id,
        //     seatArr: selectedSeatNos 
        // }
        this.http.post('http://localhost:3000/bus/book', this.seatDetails)
            .subscribe(resData => {
                console.log(resData);
                this.router.navigate(['home/confirm']);
            })
    }
}