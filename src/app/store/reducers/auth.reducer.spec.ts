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
import { authPayload, authReducer, initialState } from "./auth.reducer";

describe("Auth Reducer", () => {
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
      let loginAction = new Login(authPayload.loginPayload);
      let loginResult = authReducer(initialState, loginAction);
      let autoAction = new LoginAuto(authPayload.loginPayload);
      let autoResult = authReducer(initialState, autoAction);
      expect(loginResult).toEqual(initialState);
      expect(autoResult).toEqual(initialState);
    });
  });

  describe("[Auth] Login Success", () => {
    it("should add user to auth state", () => {
      let loginAction = new LoginSuccess(authPayload.loginSuccessPayload);
      let loginResult = authReducer(initialState, loginAction);
      let autoAction = new LoginAutoSuccess(authPayload.loginSuccessPayload);
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
      let loginAction = new LoginError(authPayload.loginErrorPayload);
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
      let action = new Signup(authPayload.signupPayload);
      let result = authReducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });

  describe("[Auth] Signup Success", () => {
    it("should add show message to auth state", () => {
      let action = new SignupSuccess(authPayload.loginSuccessPayload);
      let result = authReducer(initialState, action);
      expect(result).toEqual(initialState);
    });
  });

  describe("[Auth] Signup Error", () => {
    it("should update error in auth state", () => {
      let action = new SignupError(authPayload.signupErrorPayload);
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
