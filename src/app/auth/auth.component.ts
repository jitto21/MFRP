import { Login, Signup } from "./../store/actions/auth.action";
import { AppState } from "./../store/app.state";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthSignupModel } from "./auth-signup.model";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { from } from "rxjs";
import { Store } from "@ngrx/store";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  showPass: boolean = false;
  passInput: string = "";
  repassInput: string = "";
  emailInput: string = "";
  loginForm: FormGroup;
  signupForm: FormGroup;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[^@s]+@[^@s]+.[^@s]+"),
      ]),
      pass: new FormControl("", [Validators.required, Validators.minLength(6)]),
    });

    this.signupForm = new FormGroup({
      fname: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      dob: new FormControl("", [
        Validators.required,
        Validators.pattern("[0-9]{1,2}/[0-9]{1,2}/[0-9]{4}"),
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern("[1-9]{1}[0-9]{9}"),
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      emailSignup: new FormControl("", [
        Validators.required,
        Validators.pattern("[^@s]+@[^@s]+.[^@s]+"),
      ]),
      passSignup: new FormControl("", [
        Validators.required,
        Validators.pattern(".{8,25}"),
      ]),
      repass: new FormControl("", [
        Validators.required,
        Validators.pattern(".{8,25}"),
      ]),
    });
  }

  onShowPass(event) {
    this.showPass = event.target.checked;
    console.log("showPass: ", this.showPass);
  }
  onCreateUser() {
    const form = this.signupForm;
    let dateString = form.value.dob;
    var dateParts = dateString.split("/");
    var dob = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    let age = new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970;
    console.log(age);
    const payload: AuthSignupModel = {
      fname: form.value.fname,
      lname: form.value.lname,
      phone: form.value.phone,
      gender: form.value.gender,
      email: form.value.emailSignup,
      pass: form.value.passSignup,
      age,
    };
    console.log(payload);
    this.store.dispatch(new Signup(payload));
    //form.reset();
  }
  onLoginUser() {
    console.log(this.loginForm.value);
    this.store.dispatch(new Login(this.loginForm.value));
  }
}
