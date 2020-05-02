import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { HomeService } from '../home.service';
import { HomeModel } from '../home.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit, OnDestroy {
  planForm: FormGroup;
  todayDate;
  busesArray: HomeModel[] = [];
  showNoBusesMsg: boolean = false;
  busesArraySub: Subscription;
  constructor(private datePipe: DatePipe, private homeService: HomeService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.planForm = new FormGroup({
      'from': new FormControl('Chennai', [Validators.required]),
      'to': new FormControl("Bangalore", [Validators.required]),
      'date': new FormControl(null, [Validators.required])
    })
    this.todayDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    console.log(this.todayDate);

    // this.array = [
    //   { from: 'Chennai', to: 'Bangalore', type: 'multi axle', dep: '22:10', arr: '08:10', date: '30-04-2020', ava: 'yes', fare: 1200 },
    //   { from: 'Kottayam', to: 'Chennai', type: 'air bus', dep: '21:00', arr: '08:00', date: '30-04-2020', ava: 'yes', fare: 1800 },
    //   { from: 'Mumbai', to: 'Delhi', type: 'std', dep: '23:40', arr: '10:10', date: '30-04-2020', ava: 'no', fare: 900 }
    // ]
  }

  onSubmitPlan() {
    this.homeService.fetchBusDetails(this.planForm.value.from, this.planForm.value.to, this.planForm.value.date);
    this.busesArraySub = this.homeService.getBusesArrayListener()
    .subscribe(resData=> {
      console.log(resData);
      this.busesArray = resData;
      if(this.busesArray.length<1) {
        this.showNoBusesMsg = true;
      } else {
        this.showNoBusesMsg = false;
      }
    })
  }

  onClearBusArray() {
    this.busesArray = [];
    this.showNoBusesMsg = false;
    this.planForm.reset(); 
  }

  onViewSeats(busDetails: HomeModel) {
    console.log(busDetails);
    this.homeService.bus = busDetails;
    this.router.navigate(['home/seat'])
  }

  ngOnDestroy() {
    this.busesArraySub.unsubscribe();
  }
}
