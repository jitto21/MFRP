import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as auth from "./reducers/auth.reducer";

export interface AppState {
  auth: auth.AuthState;
}

export const reducers = {
  auth: auth.authReducer,
};

export const selectAppState = createFeatureSelector<AppState>("auth");
