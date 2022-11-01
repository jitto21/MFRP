import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  LOGIN = "[Auth] Login",
  SIGNUP = "[Auth] Signup",
  LOGIN_AUTO = "[Auth] Auto",
  LOGIN_SUCCESS = "[Auth] Login Success",
  SIGNUP_SUCCESS = "[Auth] Signup Success",
  LOGIN_AUTO_SUCCESS = "[Auth] Auto Success",
  LOGIN_ERROR = "[Auth] Login Error",
  SIGNUP_ERROR = "[Auth] Signup Error",
  LOGOUT = "[Auth] Logout",
}

export class Login implements Action {
  type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class Signup implements Action {
  type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class LoginAuto implements Action {
  type = AuthActionTypes.LOGIN_AUTO;
  constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
  type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

export class SignupSuccess implements Action {
  type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginAutoSuccess implements Action {
  type = AuthActionTypes.LOGIN_AUTO_SUCCESS;
  constructor(public payload: any) {}
}

export class LoginError implements Action {
  type = AuthActionTypes.LOGIN_ERROR;
  constructor(public payload: any) {}
}

export class SignupError implements Action {
  type = AuthActionTypes.SIGNUP_ERROR;
  constructor(public payload: any) {}
}

export class Logout implements Action {
  type = AuthActionTypes.LOGOUT;
  constructor(public payload: any) {}
}

export type Auth =
  | Login
  | Signup
  | LoginAuto
  | LoginSuccess
  | SignupSuccess
  | LoginAutoSuccess
  | LoginError
  | SignupError
  | Logout;
