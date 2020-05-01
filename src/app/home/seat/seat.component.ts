import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }

  onButton() {
    this.router.navigate(['home/payment']);
  }

}
