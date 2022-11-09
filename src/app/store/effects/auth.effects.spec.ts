import { TestBed } from "@angular/core/testing";
import { Observable, of } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { AuthEffects } from "./auth.effect";
import { provideMockActions } from "@ngrx/effects/testing";
import {
  authPayload,
  authReducer,
  initialState,
} from "../reducers/auth.reducer";
import { Login, LoginAuto, LoginAutoSuccess, LoginError, LoginSuccess, Signup, SignupSuccess } from "../actions/auth.action";
import { cold, hot } from "jasmine-marbles";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { AppState } from "../app.state";
import { RouterTestingModule } from "@angular/router/testing";
import { MaterialModule } from "src/app/material-module";
import { TestScheduler } from "rxjs/testing";

describe("Auth Effects", () => {
  let actions: Observable<any>;
  let effects: AuthEffects;
  let authService: AuthService;
  let store: MockStore<AppState>;
  let testScheduler;
  const authServiceSpy = jasmine.createSpyObj("authService", [
    "login",
    "signup",
    "logout"
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule],
      providers: [
        AuthEffects,
        provideMockStore({ initialState }),
        provideMockActions(() => actions),
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
    });
    effects = TestBed.inject(AuthEffects);
    store = TestBed.inject(MockStore);
    store.setState({ auth: initialState });
    authService = TestBed.inject(AuthService);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe("[Auth] Login", () => {
    it("should return LoginSuccess action, on success", () => {
      const loginPayload = authPayload.loginPayload;
      const loginSuccessPayload = authPayload.loginSuccessPayload;
      const action = new Login(loginPayload);
      const outcome = new LoginSuccess(loginSuccessPayload);

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot("-a", { a: action });
        const response = cold("-b|", { b: loginSuccessPayload });
        authServiceSpy.login.and.returnValue(response);
        //const expected = cold("--b", { b: outcome });
        expectObservable(effects.Login).toBe("--b", { b: outcome });
      });
      //expect(effects.Login).toBeObservable(expected);
    });

    it("should return LoginError action, on error", () => {
      const loginPayload = authPayload.loginPayload;
      const loginErrorPayload =authPayload.loginErrorPayload;
      const action = new Login(loginPayload);
      const outcome = new LoginError({loginErrorPayload});
      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot("-a", { a: action });
        const response = cold("-#|", {}, {'loginErrorPayload': loginErrorPayload});
        authServiceSpy.login.and.returnValue(response);
        expectObservable(effects.Login).toBe("--b", { b: outcome });
      });
    });
  });

  describe('[Auth] Signup', ()=> {
    it('should return Signup Success action, on success', () => {
        const signupPayload = authPayload.signupPayload;
        const signupSuccessPayload = authPayload.signupSuccessPayload;
        const action = new Signup(signupPayload);
        const outcome = new SignupSuccess(signupSuccessPayload);

        testScheduler.run(({hot, cold, expectObservable}) => {
            actions = hot('-a', {a: action});
            const reponse = cold('-b|', {b: signupSuccessPayload});
            authServiceSpy.signup.and.returnValue(reponse);
            expectObservable(effects.Singup).toBe('--b', {b: outcome});
        })
    })
  })

  describe("[Auth] Auto Login", () => {
    it("should return AUTO LoginSuccess action, on success", () => {
      const autoLoginPayload = authPayload.autoLoginPayload;
      const action = new LoginAuto(autoLoginPayload);
      const outcome = new LoginAutoSuccess(autoLoginPayload);

      testScheduler.run(({ hot, cold, expectObservable }) => {
        actions = hot("--a", { a: action });
        expectObservable(effects.LoginAuto).toBe("--a", { a: outcome });
      });
    });
  });

});
