import {
  Login,
  LoginAuto,
  LoginAutoSuccess,
  LoginError,
  LoginSuccess,
  Logout,
  Signup,
  SignupError,
  SignupSuccess,
} from "../actions/auth.action";
import { authReducer, initialState } from "./auth.reducer";

describe("Auth Reducer", () => {
  const loginPayload = {
    email: "test@testuser.com",
    pass: "12345678",
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

  describe("[Auth] undefined action", () => {
    it("should return initial state", () => {
      let action = { type: "NOOP" } as any;
      let result = authReducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });

  //#region LOGIN

  describe("[Auth] Login", () => {
    it("should tooggle login state", () => {
      let loginAction = new Login(loginPayload);
      let loginResult = authReducer(initialState, loginAction);
      let autoAction = new LoginAuto(loginPayload);
      let autoResult = authReducer(initialState, autoAction);
      expect(loginResult).toEqual(initialState);
      expect(autoResult).toEqual(initialState);
    });
  });

  describe("[Auth] Login Success", () => {
    it("should add user to auth state", () => {
      let loginAction = new LoginSuccess(loginSuccessPayload);
      let loginResult = authReducer(initialState, loginAction);
      let autoAction = new LoginAutoSuccess(loginSuccessPayload);
      let autoResult = authReducer(initialState, autoAction);
      const expectedResult = {
        ...initialState,
        isAuthenticated: true,
        user: {
          name: "Test User",
          gender: "Male",
          age: 23,
          expiresIn: 3600,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQHRlc3QuY29tIiwiaWQiOiI2MzY0YmYwNjNkMmM3ZTBlZDQxNzYwMWQiLCJpYXQiOjE2Njc4MDY1MjEsImV4cCI6MTY2NzgxMDEyMX0.P7FQtOEsH_OJwRYeidvjk6LhoQdbPTMr0zJx9dowZVo",
        },
        error: null,
      };
      expect(loginResult).toEqual(expectedResult);
      expect(autoResult).toEqual(expectedResult);
    });
  });

  describe("[Auth] Login Error", () => {
    it("should update error in auth state", () => {
      let loginAction = new LoginError(loginErrorPayload);
      let loginResult = authReducer(initialState, loginAction);
      expect(loginResult).toEqual({
        ...initialState,
        isAuthenticated: false,
        error: "Login Failed",
        user: null,
      });
    });
  });

  //#endregion LOGIN

  //#region SIGNUP

  describe("[Auth] Signup", () => {
    it("should tooggle signup state", () => {
      let action = new Signup(signupPayload);
      let result = authReducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });

  describe("[Auth] Signup Success", () => {
    it("should add show message to auth state", () => {
      let action = new SignupSuccess(loginSuccessPayload);
      let result = authReducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });

  describe("[Auth] Signup Error", () => {
    it("should update error in auth state", () => {
      let action = new SignupError(signupErrorPayload);
      let result = authReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        isAuthenticated: false,
        error: "This Email exists",
        user: null,
      });
    });
  });

  //#endregion SIGNUP

  describe("[Auth] Logout", () => {
    it("should update auth state", () => {
      let action = new Logout({});
      let result = authReducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        isAuthenticated: false,
        error: null,
        user: null,
      });
    });
  });
});
