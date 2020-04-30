import { Component, OnInit } from '@angular/core';
import { AuthSignupModel } from './auth-signup.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { from } from 'rxjs';

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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  onShowPass() {
   this.showPass = !this.showPass;
   console.log("showPass: ",this.showPass);

  }
  onCreateUser(form) {
    console.log(form.value);
    this.authService.signup(form.value);

  }
  onLoginUser(form) {
    this.authService.login(form.value);
  }
}
