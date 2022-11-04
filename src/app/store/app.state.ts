import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as auth from "./reducers/auth.reducer";

export interface AppState {
  auth: auth.AuthState;
}

export const reducers = {
  auth: auth.authReducer,
};

export const selectAuthState = createFeatureSelector<AppState>("auth");

// export const getAuthUser = createSelector(
//   selectAuthState,
//   (state: AppState) => state.auth.user
// );

// export const getIsAuthenticated = createSelector(
//     selectAuthState,
//     (state: AppState) => state.auth.user.isAuthenticated
//   );
