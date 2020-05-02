import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {
  public seatArray= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  seatClicked: boolean = false;
  selectedSeatNos: number[] = [];
  constructor(private router: Router) { }

  ngOnInit() {
   this.seatClicked = false;
   this.selectedSeatNos = [];
  }

  onSeatSelect(seatIndex, event) {
    console.log(event);
    this.seatClicked = true;
    this.selectedSeatNos.push(seatIndex);
    console.log(seatIndex);
  }

  onButton() {
    this.router.navigate(['home/payment']);
  }

}
