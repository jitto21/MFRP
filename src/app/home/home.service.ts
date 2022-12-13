import { HttpClientService } from "./../services/http-client.service";
import { Injectable } from "@angular/core";
import { BusType } from "../models/bus.model";
import { forkJoin, Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  bus: BusType;
  busesArray: BusType[];
  private busesArrayListener = new Subject<BusType[]>();
  private seatFormDetails: any;
  private seatDetails: any;
  private date: string = "";
  private fare: number;

  constructor(private http: HttpClientService, private router: Router) {}

  getBusTicket() {
    // return this.http.get<{message: string, result: any}>('auth/ticket')
    return this.http.getCall("auth/ticket");
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

  saveSeatDetails(id: string, seatArr: number[], seatForm, fare) {
    //save seat Details before payment is done
    this.seatFormDetails = seatForm;
    this.fare = fare;
    this.seatDetails = {
      id: id,
      seatArr: seatArr,
    };
    console.log("Saved in Service: ", this.seatDetails);
  }

  fetchBusDetails(from: string, to: string, date: string) {
    this.date = date;
    return this.http.getCall(`bus/fetch?from=${from}&to=${to}&date=${date}`);
    // .subscribe((resData: { message: string, buses: BusType[] }) => {
    //     console.log(resData);
    //     this.busesArray = resData.buses;
    //     this.busesArrayListener.next(this.busesArray);
    //     console.log(this.busesArray)
    // })
  }

  bookBus(
    seatDetails = this.seatDetails,
    busTicket = {
      name: this.bus.name,
      type: this.bus.type,
      from: this.bus.from,
      to: this.bus.to,
      dep: this.bus.dep,
      arr: this.bus.arr,
      fare: this.fare,
      date: this.date,
      seatForm: this.seatFormDetails,
    }
  ) {
    const busbook$ = forkJoin([
      this.http.postCall("bus/book", seatDetails),
      this.http.postCall("auth/ticket", busTicket),
    ]);
    return busbook$;
    //busbook$.subscribe(() => this.router.navigate(['home/confirm']));
  }
}
