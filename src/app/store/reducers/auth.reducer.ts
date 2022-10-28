import { LoginSuccess } from './../actions/auth.action';
import { AuthActionTypes } from "../actions/auth.action";

export interface AuthState {
    isAuthenticated: boolean;
    user: any | null;
    error: any;
}

export const initialState = {
    isAuthenticated: false,
    user: null,
    error: null
}

export function authReducer(state = initialState, action: any): AuthState {
    switch (action.type) {
        case (AuthActionTypes.LOGIN_SUCCESS):
        case (AuthActionTypes.LOGIN_AUTO):
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    name: action.payload.name,
                    gender: action.payload.gender,
                    age: action.payload.age,
                    token: action.payload.token,
                    expiresIn: action.payload.expiresIn,
                    expirationDate: action.payload.expiresIn
                },
                error: null
            };
        case (AuthActionTypes.LOGIN_ERROR):
            return {
                ...state,
                error: 'Invalid Login Details'
            };
        case (AuthActionTypes.LOGOUT):
        default:
            return initialState;
    }
}