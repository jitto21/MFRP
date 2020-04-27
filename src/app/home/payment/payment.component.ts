import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payForm: FormGroup;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.payForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cardno: new FormControl(null, [Validators.required]),
      cvv: new FormControl(null, [Validators.required]),
      expiry: new FormControl(null, [Validators.required]),
    })
  }
  onPayFormSubmit() {
    this.router.navigate(['/confirm']);
  }
}
