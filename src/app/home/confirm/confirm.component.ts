import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  busTicket: any;
  seatDetails: any;
  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.busTicket = this.homeService.getBusTicket();
    console.log(this.busTicket);
    this.seatDetails = this.busTicket.seatForm.seatDetails;
  }

  onBookAgain() {
    this.router.navigateByUrl('home/plan');
  }

}
