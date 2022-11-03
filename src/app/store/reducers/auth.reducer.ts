import { LoginSuccess } from "./../actions/auth.action";
import { AuthActionTypes } from "../actions/auth.action";

export interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  error: any;
}

export const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export function authReducer(state = initialState, action: any): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          name: action.payload.name,
          gender: action.payload.gender,
          age: action.payload.age,
          token: action.payload.token,
          expiresIn: action.payload.expiresIn,
          expirationDate: action.payload.expiresIn,
        },
        error: null,
      };
    case AuthActionTypes.LOGIN_AUTO_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          name: action.payload.name,
          gender: action.payload.gender,
          age: action.payload.age,
          token: action.payload.token,
          expiresIn: action.payload.expiresIn,
          expirationDate: action.payload.expiresIn,
        },
        error: null,
      };
    case AuthActionTypes.LOGIN_ERROR:
    case AuthActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        error: action.payload.error?.error?.message
          ? action.payload.error?.error?.message
          : "Invalid Auth Data",
      };
    case AuthActionTypes.LOGOUT:
    default:
      return initialState;
  }
}
