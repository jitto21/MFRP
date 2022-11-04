import { HttpClientModule } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { StoreModule } from "@ngrx/store";

import { AuthComponent } from "./auth.component";
import { AuthState } from "../store/reducers/auth.reducer";
import { AppState } from "../store/app.state";

describe("AuthComponent", () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let mockStore: MockStore<AppState>;
  const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
  } as AppState["auth"];

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
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    mockStore = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
  });
  afterEach(() => {
    fixture.destroy();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(component.showPass).toEqual(false);
    expect(component.passInput).toEqual("");
    expect(component.repassInput).toEqual("");
    expect(component.emailInput).toEqual("");
    expect(component.loginForm).toEqual(undefined);
    expect(component.signupForm).toEqual(undefined);
    expect(component.user).toEqual(undefined);
    expect(component.loggSub).toEqual(undefined);
  });

  it("should initialize login and signup forms", () => {
    expect(component.loginForm).toEqual(undefined);
    expect(component.signupForm).toEqual(undefined);
    spyOn(component, "initForms").and.callThrough();
    component.ngOnInit();
    expect(component.initForms).toHaveBeenCalled();
    expect(component.loginForm).toBeDefined();
    expect(component.signupForm).toBeDefined();
  });

  it("should check login email is not valid", () => {
    fixture.detectChanges();
    fixture.autoDetectChanges();
    let email = component.loginForm.controls["email"];
    expect(email.value).toEqual("");
    expect(email.valid).toBeFalsy();
    email.setValue("test@test.");
    expect(email.valid).toBeFalsy();
  });

  it("should check login password is not valid", () => {
    fixture.detectChanges();
    fixture.autoDetectChanges();
    let pass = component.loginForm.controls["pass"];
    expect(pass.value).toEqual("");
    expect(pass.valid).toBeFalsy();
    pass.setValue("12345");
    expect(pass.valid).toBeFalsy();
  });

  it("should check signup email is not valid", () => {
    fixture.detectChanges();
    fixture.autoDetectChanges();
    let email = component.signupForm.controls["emailSignup"];
    expect(email.value).toEqual("");
    expect(email.valid).toBeFalsy();
    email.setValue("test@test.");
    expect(email.valid).toBeFalsy();
  });

  it("should call highlight mandatory on LOGIN with invalid LOGIN form", () => {
    fixture.detectChanges();
    fixture.autoDetectChanges();
    spyOn(component, "onLoginUser").and.callThrough();
    spyOn(component, "highlightMandatory").and.callThrough();
    component.loginForm.setValue({
      email: "testtest.com",
      pass: "12345678",
    }); //invalid
    let button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector("div.login-btn>button");
    button.click();
    expect(component.onLoginUser).toHaveBeenCalled();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.highlightMandatory).toHaveBeenCalled();
    const firstInvalidInput: HTMLInputElement = document.querySelector(
      `div.login input.ng-invalid`
    );
    expect(firstInvalidInput.hasAttribute("has-focus")).toBeTruthy();
  });

  it("should call highlight mandatory on SIGNUP with invalid SIGNUP form", () => {
    fixture.detectChanges();
    fixture.autoDetectChanges();
    spyOn(component, "onCreateUser").and.callThrough();
    spyOn(component, "highlightMandatory").and.callThrough();
    component.signupForm.setValue({
      fname: "",
      lname: "User",
      gender: "Male",
      dob: "22/05/1997",
      phone: 9945651234,
      emailSignup: "test@test.com",
      passSignup: "12345678",
      repass: "12345678",
    }); //invalid
    let button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector("div.signup-btn>button");
    button.click();
    expect(component.onCreateUser).toHaveBeenCalled();
    expect(component.signupForm.invalid).toBeTruthy();
    expect(component.highlightMandatory).toHaveBeenCalled();
    const firstInvalidInput: HTMLInputElement = document.querySelector(
      `div.signup input.ng-invalid`
    );
    expect(firstInvalidInput.hasAttribute("has-focus")).toBeTruthy();
  });

  it("should call createUser() on click of signup button and dispatch new user", () => {
    fixture.detectChanges();
    fixture.autoDetectChanges();
    // spyOn(component, "onCreateUser").and.callThrough();

    let onCreateUser = jasmine
      .createSpy("onCreateUser", component.onCreateUser)
      .and.callFake(() => {
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
        let dateString = component.signupForm.get("dob").value;
        var dateParts = dateString.split("/");
        var dob = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
        let age = new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970;
        expect(dateString).toEqual("22/05/1997");
        expect(age).toEqual(25);
        const initialState = {
          isAuthenticated: false,
          user: null,
          error: null,
        };
        mockStore.setState({ auth: initialState });
        component.loggSub.subscribe((authState) => {
          expect(authState.user).toBeNull();
        });
      });

    let button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector("div.signup-btn>button");
    button.click();
    onCreateUser();
    expect(onCreateUser).toHaveBeenCalled();
  });

  it("should call login() on click of login button and dispatch logged in user", () => {
    fixture.detectChanges();
    fixture.autoDetectChanges();
    spyOn(component, "onLoginUser").and.callThrough();
    component.loginForm.setValue({
      email: "testuser@test.com",
      pass: "12345678",
    });
    let button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector("div.login-btn>button");
    button.click();
    expect(component.onLoginUser).toHaveBeenCalled();
    //expect(component.loginForm.valid).toBeTruthy();
    const loggedInState = {
      auth: {
        isAuthenticated: true,
        user: {
          name: "Test User",
          gender: "Male",
          age: 23,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImppdHRvdHBAZ21haWwuY29tIiwiaWQiOiI1ZWY0NjdlODI1M2Q1MjQ3OTA4YmVhZTAiLCJpYXQiOjE2Njc1NDQ1MjUsImV4cCI6MTY2NzU0ODEyNX0.nDNW9bjXNtJrXzDhRirgerYmgZc_7sLLlisvMm0mRTk",
          expiresIn: 3600,
          expirationDate: 3600,
        },
        error: null,
      },
    };
    mockStore.setState(loggedInState);
    component.loggSub.subscribe((authState) => {
      expect(authState.user.name).toEqual("Test User");
      expect(authState.user.age).toEqual(23);
      expect(authState.user.token).toBeTruthy();
    });
  });

  it("should show password on checking the box near to password field", () => {
    fixture.detectChanges();
    fixture.autoDetectChanges();
    spyOn(component, "onShowPass").and.callThrough();
    let checkboxLabel: HTMLElement =
      fixture.debugElement.nativeElement.querySelector("label.show-pass");
    let passInput: HTMLInputElement =
      fixture.debugElement.nativeElement.querySelector(
        "input[name=passSignup]"
      );
    let checkboxInput: HTMLInputElement = checkboxLabel.querySelector("input");
    let checked = checkboxInput.checked;
    expect(component.showPass).toBe(checked); //before click
    expect(passInput.type).toEqual("password");
    checkboxLabel.click();
    expect(component.onShowPass).toHaveBeenCalled();
    checked = checkboxInput.checked;
    expect(component.showPass).toBe(checked);
    expect(passInput.type).toEqual("text");
  });

  it("should update state on LOGIN Error", () => {
    fixture.detectChanges();
    fixture.autoDetectChanges();
    spyOn(component, "onLoginUser").and.callThrough();
    component.loginForm.setValue({
      email: "test@test.com",
      pass: "12345678",
    });
    let button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector("div.login-btn>button");
    button.click();
    expect(component.onLoginUser).toHaveBeenCalled();
    const loginErrorState = {
      auth: {
        isAuthenticated: false,
        user: null,
        error: "Login Failed",
      },
    };
    mockStore.setState(loginErrorState);
    component.loggSub.subscribe((user) => {
      expect(user.isAuthenticated).toBeFalse();
      expect(user.user).toBeNull();
      expect(user.error).toContain("Failed");
    });
  });
});
