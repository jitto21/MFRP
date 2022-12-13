import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { HomeService } from "../home.service";
import { AppState, selectSeat } from "src/app/store/app.state";
import { Store } from "@ngrx/store";
import { SeatDetails, SeatForm } from "src/app/models/seat.model";
import { BusBook } from "src/app/store/actions/ticket.action";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  payForm: FormGroup;
  month = "12";
  value: any;
  seatDetails: SeatDetails;
  seatFormDetails: SeatForm[];
  monthInvalid: boolean = false;
  backspacePressed: boolean;
  showPayment: boolean = false;
  bus;
  constructor(
    private router: Router,
    private homeService: HomeService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.select(selectSeat).subscribe((seat) => {
      console.log("Payment component", seat);
      this.bus = seat?.selectedBus;
      this.seatDetails = seat?.selectedSeat.seatDetails;
      this.seatFormDetails = seat?.selectedSeat.seatFormDetails;
      this.showPayment = this.seatDetails ? true : false;
    });
    //this.seatDetails = this.homeService.getSeatDetails();

    this.payForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cardno: new FormControl(null, [Validators.required]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3),
      ]),
      expiry: new FormControl(null, [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
      ]),
    });
  }
  onKeyDown(event) {
    console.log(event);
    if (event.key == "Backspace") {
      this.backspacePressed = true;
      console.log(this.value.length, " pressed Backspace");
      if (this.value.length == 3 && this.backspacePressed) {
        console.log("Month: " + this.month);
        this.payForm.get("expiry").patchValue(this.month);
      }
    }
  }

  onInputExpiry(event) {
    this.backspacePressed = false;
    this.value = event.target.value;
    this.payForm.get("expiry").valueChanges.subscribe((value) => {
      if (value.length == 2 && !this.backspacePressed) {
        this.month = value;
        if (+this.month > 12) {
          this.monthInvalid = true;
        } else {
          this.monthInvalid = false;
        }
        this.payForm.get("expiry").patchValue(value + "/");
      }
    });
  }

  onPayFormSubmit() {
    const bookPayload = {
      ticketBook: {
        name: this.bus.name,
        type: this.bus.type,
        from: this.bus.from,
        to: this.bus.to,
        dep: this.bus.dep,
        arr: this.bus.arr,
        fare: this.bus.fare,
        date: this.bus.date,
        seatForm: this.seatFormDetails,
      },
      seatBook: this.seatDetails,
    };
    this.store.dispatch(new BusBook(bookPayload));
    //this.homeService.bookBus();
  }
}
