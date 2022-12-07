import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DatePipe, JsonPipe } from "@angular/common";
import { HomeService } from "../home.service";
import { BusType } from "../../interfaces/bus.interface";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { Bus, BusSelectSuccess } from "src/app/store/actions/ticket.action";
import { AppState, selectBuses } from "src/app/store/app.state";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-plan",
  templateUrl: "./plan.component.html",
  styleUrls: ["./plan.component.css"],
})
export class PlanComponent implements OnInit, OnDestroy {
  planForm: FormGroup;
  todayDate;
  busesArray: BusType[] = [];
  showNoBusesMsg: boolean = false;
  busesArraySub: Subscription;
  fromCities: string[];
  viewSeatsDisabled: boolean[] = [];

  constructor(
    private datePipe: DatePipe,
    private homeService: HomeService,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store.select(selectBuses).subscribe((buses) => {
      if (buses) {
        this.busesArray = buses;
        if (this.busesArray.length > 0) {
          //this.busesArray.sort(this.compare); // sort the bus array based on pricing
          this.viewSeatsDisabled = this.busesArray.map((elt) => {
            return elt.ava === "No" ? true : false;
          });
          this.showNoBusesMsg = false;
        } else {
          this.showNoBusesMsg = true;
        }
      }
    });
    this.fromCities = ["Bangalore", "Chennai", "Kottayam", "Mumbai"];
    this.planForm = new FormGroup({
      from: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
    });
    this.todayDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    console.log(this.todayDate);
  }

  onSubmitPlan() {
    let dateArr = this.planForm.value.date.split("-");
    dateArr = dateArr.reverse();
    let formatDate = dateArr.join("-");
    const payload = {
      from: this.planForm.value.from,
      to: this.planForm.value.to,
      date: formatDate,
    };
    this.store.dispatch(new Bus(payload));
  }

  compare(a: BusType, b: BusType) {
    let compare = 0;
    if (a.fare > b.fare) {
      compare = 1;
    } else if (a.fare < b.fare) {
      compare = -1;
    }
    return compare;
  }

  onClearBusArray() {
    this.busesArray = [];
    this.showNoBusesMsg = false;
    this.planForm.reset();
  }

  onViewSeats(busDetails: BusType) {
    console.log(busDetails);
    this.homeService.bus = busDetails;
    this.store.dispatch(new BusSelectSuccess(busDetails))
    this.router.navigate(["home/seat"]);
  }

  ngOnDestroy() {
    if (this.showNoBusesMsg) {
      this.busesArraySub.unsubscribe();
    }
  }
}
