import { Component, OnInit } from '@angular/core';
import { AuthSignupModel } from './auth-signup.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  showPass: boolean = false;
  passInput: string = '';
  repassInput: string = '';
  emailInput: string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  onShowPass() {
    console.log("showPass: ",this.showPass);
   this.showPass = !this.showPass;
  }
  onCreateUser(form) {

  }
  onLoginUser(form) {
    this.router.navigate(['/home'])
  }
}
