import { Action } from "@ngrx/store";

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_AUTO = '[Auth] Auto',
    LOGIN_SUCCESS = '[Auth] Success',
    LOGIN_AUTO_SUCCESS = '[Auth] Auto Success',
    LOGIN_ERROR = '[Auth] Error',
    LOGOUT = '[Auth] Logout'
}

export class Login implements Action {
    type = AuthActionTypes.LOGIN;
    constructor(public payload: any) { }
}

export class LoginAuto implements Action {
    type = AuthActionTypes.LOGIN_AUTO;
    constructor(public payload: any) { }
}

export class LoginSuccess implements Action {
    type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) { }
}

export class LoginAutoSuccess implements Action {
    type = AuthActionTypes.LOGIN_AUTO_SUCCESS;
    constructor(public payload: any) { }
}

export class LoginError implements Action {
    type = AuthActionTypes.LOGIN_ERROR;
    constructor(public payload: any) { }
}

export class Logout implements Action {
    type = AuthActionTypes.LOGOUT;
    constructor(public payload: any) { }
}



export type Auth = Login | LoginSuccess | LoginError | Logout | LoginAutoSuccess