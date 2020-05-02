import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeModel } from '../home.model';
import { HomeService } from '../home.service';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  // public seatArray= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];
  public seatArray = [
    { value: 1, clicked: false, booked: false },
    { value: 2, clicked: false, booked: false },
    { value: 3, clicked: false, booked: false },
    { value: 4, clicked: false, booked: false },
    { value: 5, clicked: false, booked: false },
    { value: 6, clicked: false, booked: false },
    { value: 7, clicked: false, booked: false },
    { value: 8, clicked: false, booked: false },
    { value: 9, clicked: false, booked: false },
    { value: 10, clicked: false, booked: false },
    { value: 11, clicked: false, booked: false },
    { value: 12, clicked: false, booked: false },
    { value: 13, clicked: false, booked: false },
    { value: 14, clicked: false, booked: false },
    { value: 15, clicked: false, booked: false },
    { value: 16, clicked: false, booked: false },
    { value: 17, clicked: false, booked: false },
    { value: 18, clicked: false, booked: false },
    { value: 19, clicked: false, booked: false },
    { value: 20, clicked: false, booked: false },
    { value: 21, clicked: false, booked: false },
    { value: 22, clicked: false, booked: false },
    { value: 23, clicked: false, booked: false },
    { value: 24, clicked: false, booked: false },
    { value: 25, clicked: false, booked: false },
    { value: 26, clicked: false, booked: false },
    { value: 27, clicked: false, booked: false },
    { value: 28, clicked: false, booked: false },
    { value: 29, clicked: false, booked: false },
    { value: 30, clicked: false, booked: false },
    { value: 31, clicked: false, booked: false },
    { value: 32, clicked: false, booked: false },
    { value: 33, clicked: false, booked: false },
    { value: 34, clicked: false, booked: false },
    { value: 35, clicked: false, booked: false },
    { value: 36, clicked: false, booked: false },
    { value: 37, clicked: false, booked: false },
    { value: 38, clicked: false, booked: false },
    { value: 39, clicked: false, booked: false },
    { value: 40, clicked: false, booked: false }
  ];
  bus: HomeModel;
  totalFare: number = 0;
  selectedSeatNos: number[] = [];
  seatForm: FormGroup;
  showSeat: boolean = false;

  constructor(private router: Router, private homeService: HomeService,
    private formBuilder: FormBuilder) {
      this.seatForm = this.formBuilder.group({
        seatFormArray: this.formBuilder.array([])
      });
  }

  ngOnInit() {
    this.selectedSeatNos = [];
    this.bus = this.homeService.getViewSeats();
    this.totalFare = this.bus.fare + 180;
    if (this.bus.bookedSeats.length > 0) {
      this.seatArray.forEach((elt, i) => {
        this.bus.bookedSeats.map(no => {
          if (elt.value == no) {
            console.log("Match at pos: ", i);
            this.seatArray[i].booked = true;
          }
        })
      })
    }
    console.log(this.seatArray);
  }

  get seatFormArray() {
    return this.seatForm.get('seatFormArray') as FormArray;
  }

  onSeatSelect(seatIndex, event) {
    console.log(event);
    // this.seatClicked = true;
    this.seatArray[seatIndex - 1].clicked = !this.seatArray[seatIndex - 1].clicked; //toggle
    console.log(this.seatArray[seatIndex - 1].clicked);
    if (this.seatArray[seatIndex - 1].clicked) { //push to array;
      this.selectedSeatNos.push(seatIndex);
    } else { //remove from array
      this.selectedSeatNos = this.selectedSeatNos.filter(val => {
       return val !== seatIndex;
      })
    }
    if(this.selectedSeatNos.length > 0) {
      this.showSeat = true;
    } else{
      this.showSeat = false;
    }
    this.totalFare = this.bus.fare*this.selectedSeatNos.length + 180;
  }

  onConfirm() {
    console.log("Confirm: ", this.bus);
    console.log(this.seatForm.value);
    this.homeService.bookBus(this.bus._id, this.selectedSeatNos);
    this.router.navigate(['home/payment']);
  }

}
