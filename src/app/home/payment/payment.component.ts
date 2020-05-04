import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payForm: FormGroup;
  month = "12";
  value: any;
  i: number = 0;
  backspace: number = 0;
  monthInvalid: boolean = false;
  backspacePressed: boolean;
  backspaceCard: boolean;
  constructor(private router: Router, private homeService: HomeService) { }

  ngOnInit(): void {
    this.payForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cardno: new FormControl(null, [Validators.required]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.maxLength(3),
        Validators.minLength(3)
      ]),
      expiry: new FormControl(null, [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
        // this.ValidateMonth
      ]),
    })
  }
  onKeyDown(event) {
    console.log(event);
    if (event.key == "Backspace") {
      this.backspacePressed = true;
      console.log(this.value.length, " pressed Backspace")
      if (this.value.length == 3 && this.backspacePressed) {
        console.log("Month: " + this.month);
        this.payForm.get('expiry').patchValue(this.month);
      }
    }
  }


  onInputExpiry(event) {
    this.backspacePressed = false;
    this.value = event.target.value;
    this.payForm.get('expiry').valueChanges
      .subscribe(value => {
        if (value.length == 2 && !this.backspacePressed) {
          this.month = value;
          if (+this.month > 12) {
            this.monthInvalid = true;
          } else {
            this.monthInvalid = false;
          }
          this.payForm.get('expiry').patchValue(value + '/');
        }
      })
  }

  // OnKeyDownName(keyValue) {
  //   if (keyValue.key == "Backspace") {
  //     this.backspace++;
  //     console.log("backspace ",this.backspace);
  //     if(this.backspace%4==0) {
  //       this.backspace = 0;
  //       this.i--;
  //       console.log(this.i);
  //     }
  //     return;
  //   } else {
  //     let cardno = this.payForm.get('cardno').value;
  //     let cardnoLength = cardno.length;
  //     console.log("Card Length ", cardnoLength);
  //     if ((cardnoLength-this.i) % 4 == 0 && ) {
  //       this.i++;
  //       console.log(this.i);
  //       if(cardno.length != 0 && cardno.length < 19) {
  //         this.payForm.get('cardno').patchValue(cardno + '-');
  //       }
  //     }
  //   }
  // }

  onPayFormSubmit() {
    this.homeService.bookBus();
  }
}
