import { Auth, AuthActionTypes } from "../actions/auth.action";

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

export function authReducer(state = initialState, action: Auth): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
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
        },
        error: null,
      };
    case AuthActionTypes.LOGIN_ERROR:
    case AuthActionTypes.SIGNUP_ERROR:
      return {
        ...state,
        error:
          action.payload.error?.error?.message || "Error in Authentication",
      };
    case AuthActionTypes.LOGOUT:
      return initialState;
    default:
       return state;
  }
}

const loginPayload = {
  email: "test@testuser.com",
  pass: "12345678",
};
const autoLoginPayload = {
  expirationDate: new Date(),
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQHRlc3QuY29tIiwiaWQiOiI2MzY0YmYwNjNkMmM3ZTBlZDQxNzYwMWQiLCJpYXQiOjE2Njc4MDY1MjEsImV4cCI6MTY2NzgxMDEyMX0.P7FQtOEsH_OJwRYeidvjk6LhoQdbPTMr0zJx9dowZVo",
  expiresIn: 3600,
  name: "Test User",
  age: 23,
  gender: "Male",
};
const loginSuccessPayload = {
  message: "Login Successfull",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQHRlc3QuY29tIiwiaWQiOiI2MzY0YmYwNjNkMmM3ZTBlZDQxNzYwMWQiLCJpYXQiOjE2Njc4MDY1MjEsImV4cCI6MTY2NzgxMDEyMX0.P7FQtOEsH_OJwRYeidvjk6LhoQdbPTMr0zJx9dowZVo",
  expiresIn: 3600,
  name: "Test User",
  age: 23,
  gender: "Male",
};
const signupPayload = {
  fname: "Ouseph",
  lname: "Pal",
  phone: "5324242342",
  gender: "Male",
  email: "jj@jjjjj.com",
  pass: "123123123",
  age: 15,
};
const signupSuccessPayload = {
  message: "User Created",
};
const loginErrorPayload = {
  error: {
    headers: {
      normalizedNames: {},
      lazyUpdate: null,
    },
    status: 401,
    statusText: "Unauthorized",
    url: "http://localhost:8080/auth/login",
    ok: false,
    name: "HttpErrorResponse",
    message:
      "Http failure response for http://localhost:8080/auth/login: 401 Unauthorized",
    error: {
      message: "Login Failed",
    },
  },
};

const signupErrorPayload = {
  error: {
    headers: {
      normalizedNames: {},
      lazyUpdate: null,
    },
    status: 500,
    statusText: "Internal Server Error",
    url: "http://localhost:8080/auth/signup",
    ok: false,
    name: "HttpErrorResponse",
    message:
      "Http failure response for http://localhost:8080/auth/signup: 500 Internal Server Error",
    error: {
      message: "This Email exists",
    },
  },
};

export const authPayload = {
  loginPayload,
  loginSuccessPayload,
  autoLoginPayload,
  signupPayload,
  signupSuccessPayload,
  loginErrorPayload,
  signupErrorPayload,
};
