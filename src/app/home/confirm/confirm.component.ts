import { Component, OnInit } from "@angular/core";
import { HomeService } from "../home.service";
import { Router } from "@angular/router";
import { AppState, selectConfirm } from "src/app/store/app.state";
import { Store } from "@ngrx/store";
import { BusBookFetch, BusClear } from "src/app/store/actions/ticket.action";
import { Tickets } from "src/app/models/bus-book.model";

@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.css"],
})
export class ConfirmComponent implements OnInit {
  busTickets: any[];
  busTicketsArray: any[] = [];
  ticketsLen: number;
  showMore: boolean = false;
  showMoreBtn: string = "Show";
  // seatDetails: any;
  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectConfirm).subscribe((confirm) => {
      if (confirm) {
        this.ticketsLen = confirm.tickets[0]?.tickets?.length;
        console.log(this.ticketsLen);
        if (this.ticketsLen > 0) {
          this.busTickets = confirm.tickets[0]?.tickets;
          this.busTickets =
            this.busTickets.length > 0 && [...this.busTickets].reverse();
          console.log(this.busTickets);
          this.ticketsNumber(1);
        }
      }
    });
    this.store.dispatch(new BusBookFetch({}));

    // this.seatDetails = this.busTicket.seatForm.seatDetails;
  }

  onShowMore() {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.ticketsNumber(this.ticketsLen);
      this.showMoreBtn = "Hide";
    } else {
      this.ticketsNumber(1);
      this.showMoreBtn = "Show";
    }
  }

  private ticketsNumber(number: number) {
    this.busTicketsArray = [];
    for (let i = 0; i < number; i++) {
      this.busTicketsArray.push(this.busTickets[i]);
    }
  }

  onBookAgain() {
    this.store.dispatch(new BusClear({}));
    this.router.navigateByUrl("home/plan");
  }
}
