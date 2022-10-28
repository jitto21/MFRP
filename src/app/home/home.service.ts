import { HttpClientService } from './../services/http-client.service';
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
    private date: string = '';
    private fare: number;

    constructor(private http: HttpClientService, private router: Router) { }

    getBusTicket() {
        // return this.http.get<{message: string, result: any}>('auth/ticket')
        return this.http.getCall('auth/ticket');
    }

    getSeatDetails() {
        return this.seatDetails;
    }

    getBusesArrayListener() {
        return this.busesArrayListener.asObservable();
    }

    getViewSeats() {
        return { bus: this.bus, date: this.date };
    }

    saveSeatDetails(id: string, seatArr: number[], seatForm, fare) {  //save seat Details before payment is done
        this.seatFormDetails = seatForm;
        this.fare = fare;
        this.seatDetails = {
            id: id,
            seatArr: seatArr
        };
        console.log("Saved in Service: ", this.seatDetails);
    }

    fetchBusDetails(from: string, to: string, date: string) {
        this.date = date;
        // this.http.get<{ message: string, buses: HomeModel[] }>(`bus/fetch?from=${from}&to=${to}&date=${date}`)
        //     .subscribe((resData) => {
        //         console.log(resData);
        //         this.busesArray = resData.buses;
        //         this.busesArrayListener.next(this.busesArray);
        //         console.log(this.busesArray)
        //     })

        this.http.getCall(`bus/fetch?from=${from}&to=${to}&date=${date}`)
            .subscribe((resData: { message: string, buses: HomeModel[] }) => {
                console.log(resData);
                this.busesArray = resData.buses;
                this.busesArrayListener.next(this.busesArray);
                console.log(this.busesArray)
            })
    }

    bookBus() {
        let busTicket = {
            name: this.bus.name,
            type: this.bus.type,
            from: this.bus.from,
            to: this.bus.to,
            dep: this.bus.dep,
            arr: this.bus.arr,
            fare: this.fare,
            date: this.date,
            seatForm: this.seatFormDetails
        }
        this.http.postCall('bus/book', this.seatDetails)
            .subscribe(resData => {
                console.log(resData);
                this.http.postCall('auth/ticket', busTicket)
                    .subscribe(resData => {
                        console.log(resData);
                        this.router.navigate(['home/confirm']);
                    })
            })
        // this.http.post('bus/book', this.seatDetails)
        // .subscribe(resData => {
        //     console.log(resData);
        //     this.http.post('auth/ticket', busTicket)
        //         .subscribe(resData => {
        //             console.log(resData);
        //             this.router.navigate(['home/confirm']);
        //         })
        // })
    }
}