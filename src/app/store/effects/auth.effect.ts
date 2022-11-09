import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/auth.service";
import {
  AuthActionTypes,
  LoginSuccess,
  LoginError,
  LoginAutoSuccess,
  SignupSuccess,
  SignupError,
} from "./../actions/auth.action";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { map, switchMap, tap, catchError } from "rxjs/operators";
import { AuthSignupModel } from "src/app/auth/auth-signup.model";
import { MatDialog } from "@angular/material/dialog";
import { ErrorComponent } from "src/app/error/error.component";

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  @Effect()
  Login: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: any) => action.payload),
    switchMap((payload: any) => {
      return this.authService.login(payload).pipe(
        map((user: Login) => {
          if (user && user.token) {
            console.log(AuthActionTypes.LOGIN + " ", user);
            return new LoginSuccess(user);
          }
          return throwError("Login Failed :: Could not get token");
        }),
        catchError((error) => {
          return of(new LoginError({ error }));
        })
      );
    })
  );

  @Effect()
  Singup: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP),
    map((action: any) => action.payload),
    switchMap((payload: AuthSignupModel) => {
      return this.authService.signup(payload).pipe(
        map((response) => {
          console.log(response);
          return new SignupSuccess(response);
        }),
        catchError((error) => {
          return of(new SignupError({ error }));
        })
      );
    })
  );

  @Effect({ dispatch: false })
  SignupSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    map((action: any) => action.payload),
    tap((response: { message: string }) => {
      this.dialog.open(ErrorComponent, {
        data: {
          title: response.message,
          message: "Now Login With Your Credentials",
        },
      });
    })
  );

  @Effect()
  LoginAuto: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_AUTO),
    map((action: any) => action.payload),
    map((user) => {
      if (user && user.token) {
        console.log(AuthActionTypes.LOGIN_AUTO + " ", user);
        return new LoginAutoSuccess(user);
      }
      return throwError("Auto Login Failed :: Could not get token");
    }),
    catchError((error) => {
      console.log(error);
      return of(new LoginError({ error }));
    })
  );

  @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    map((action: any) => action.payload),
    tap((user: Login) => {
      console.log(AuthActionTypes.LOGIN_SUCCESS + " ", user);
      this.authService.autoLogout(user.expiresIn * 1000);
      const expirationDate = new Date(
        new Date().getTime() + user.expiresIn * 1000
      );
      this.authService.saveAuthData(
        user.token,
        expirationDate,
        user.name,
        user.gender,
        user.age
      );
      this.router.navigate(["home/plan"]);
    })
  );

  @Effect({ dispatch: false })
  LoginAutoSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_AUTO_SUCCESS),
    map((action: any) => action.payload),
    tap((user: Login) => {
      console.log(user);
      const expiresIn = user.expirationDate.getTime() - new Date().getTime();
      console.log("New expiry time in minutes", expiresIn / 60000);
      this.authService.autoLogout(expiresIn);
      const expirationDate = new Date(new Date().getTime() + expiresIn);
      this.authService.saveAuthData(
        user.token,
        expirationDate,
        user.name,
        user.gender,
        user.age
      );
    })
  );

  @Effect({ dispatch: false })
  LoginError: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_ERROR),
    tap((error) => {
      console.error(error);
    })
  );

  @Effect({ dispatch: false })
  SignupError: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP_ERROR),
    tap((error) => {
      console.error(error);
    })
  );

  @Effect({ dispatch: false })
  Logout: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.authService.logout();
    })
  );
}

interface Login {
  message: string;
  token: string;
  expiresIn: number;
  name: string;
  gender: string;
  age: string;
  autoLogin: boolean;
  expirationDate?: Date;
}
