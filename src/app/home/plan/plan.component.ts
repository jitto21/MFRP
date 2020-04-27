import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {
  planForm: FormGroup;
  todayDate;
  array;
  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.planForm = new FormGroup({
      'from': new FormControl(null, [Validators.required]),
      'to': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required])
    })
    this.todayDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    console.log(this.todayDate);
    this.array=[
      {type: 'multi axle', dep: '22:10', arr: '08:10', date: '30-04-2020', ava: 'yes', fare: 1200},
      {type: 'air bus', dep: '21:00', arr: '08:00', date: '30-04-2020', ava: 'yes', fare: 1800},
      {type: 'std', dep: '23:40', arr: '10:10', date: '30-04-2020', ava: 'no', fare: 900}
    ]
  }

  onSubmitPlan() {
    console.log(this.planForm.value);
  }

  onClearForm() {
    this.planForm.reset();
  }
}
