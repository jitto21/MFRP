import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { StoreModule } from "@ngrx/store";

import { AuthComponent } from "./auth.component";

describe("AuthComponent", () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        HttpClientModule,
        StoreModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [AuthComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.autoDetectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize login and signup forms", () => {
    spyOn(component, "initForms");
    component.ngOnInit();
    expect(component.initForms).toHaveBeenCalled();
  });

  it("should check login email is not valid", () => {
    let email = component.loginForm.controls["email"];
    expect(email.value).toEqual("");
    expect(email.valid).toBeFalsy();
    email.setValue("test@test.");
    expect(email.valid).toBeFalsy();
  });

  it("should check login password is not valid", () => {
    let pass = component.loginForm.controls["pass"];
    expect(pass.value).toEqual("");
    expect(pass.valid).toBeFalsy();
    pass.setValue("12345");
    expect(pass.valid).toBeFalsy();
  });

  it("should check signup email is not valid", () => {
    let email = component.signupForm.controls["emailSignup"];
    expect(email.value).toEqual("");
    expect(email.valid).toBeFalsy();
    email.setValue("test@test.");
    expect(email.valid).toBeFalsy();
  });

  it("should call createUser() on click of signup button", () => {
    // spyOn(component, "onCreateUser").and.callThrough();
    component.signupForm.setValue({
      fname: "Test",
      lname: "User",
      gender: "Male",
      dob: "22/05/1997",
      phone: 9945651234,
      emailSignup: "test@test.com",
      passSignup: "12345678",
      repass: "12345678",
    });
    let onCreateUser = jasmine
      .createSpy("onCreateUser", component.onCreateUser)
      .and.callFake(() => {
        let dateString = component.signupForm.get("dob").value;
        var dateParts = dateString.split("/");
        var dob = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
        let age = new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970;
        expect(dateString).toEqual("22/05/1997");
        expect(age).toEqual(25);
      });

    let button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector("div.signup-btn>button");
    console.log(button);
    button.click();
    onCreateUser();
    expect(onCreateUser).toHaveBeenCalled();
  });

  it("should save the user to store on signup", () => {});

  it("should call login() on click of login button", () => {
    spyOn(component, "onLoginUser");
    let button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector("div.login-btn>button");
    button.click();
    expect(component.onLoginUser).toHaveBeenCalled();
  });

  it("should login user on click of login button", () => {});

  it("should show password on checking the box near to password field", () => {
    spyOn(component, "onShowPass").and.callThrough();
    let checkboxLabel: HTMLElement =
      fixture.debugElement.nativeElement.querySelector("label.show-pass");
    let checkboxInput: HTMLInputElement = checkboxLabel.querySelector("input");
    let checked = checkboxInput.checked;
    expect(component.showPass).toBe(checked); //before click
    checkboxLabel.click();
    expect(component.onShowPass).toHaveBeenCalled();
    checked = checkboxInput.checked;
    expect(component.showPass).toBe(checked);
  });
});
