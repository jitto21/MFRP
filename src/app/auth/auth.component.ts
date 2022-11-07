import { Login, Signup } from "./../store/actions/auth.action";
import { AppState, selectAppState } from "./../store/app.state";
import { Component, OnInit } from "@angular/core";
import { AuthSignupModel } from "./auth-signup.model";
import { StateObservable, Store } from "@ngrx/store";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { AuthState } from "../store/reducers/auth.reducer";
import { Subscription } from "rxjs";

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
  user: AuthState;
  loggSub: StateObservable;
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initForms();
    this.loggSub = this.store.select((selectAppState) => selectAppState.auth);
    this.loggSub.subscribe((user) => {
      console.log(user);
      this.user = user;
    });
  }

  initForms() {
    console.log(this.loginForm);
    console.log(this.signupForm);
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^[_0-9a-zA-Z-.]+@([_0-9a-zA-Z-]+.)+[_0-9a-zA-Z-]{2,4}$"
        ),
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
        Validators.pattern(
          "^[_0-9a-zA-Z-.]+@([_0-9a-zA-Z-]+.)+[_0-9a-zA-Z-]{2,4}$"
        ),
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
    console.log(this.loginForm);
    console.log(this.signupForm);
  }

  onShowPass(event) {
    this.showPass = event.target.checked;
    console.log("showPass: ", this.showPass);
  }
  onCreateUser(): void {
    if (this.signupForm.invalid) {
      return this.highlightMandatory("signup");
    }
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
    this.signupForm.reset();
  }
  onLoginUser() {
    if (this.loginForm.invalid) {
      return this.highlightMandatory("login");
    }
    console.log(this.loginForm.value);
    this.store.dispatch(new Login(this.loginForm.value));
    //this.loginForm.reset();
  }

  highlightMandatory(section: string): void {
    const firstInvalidInput: HTMLInputElement = document.querySelector(
      `div.${section} input.ng-invalid`
    );
    firstInvalidInput.setAttribute("has-focus", "yes");
    firstInvalidInput.focus();
  }
}
