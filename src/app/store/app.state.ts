import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as auth from "./reducers/auth.reducer";
import * as ticket from "./reducers/ticket.reducer";

export interface AppState {
  auth: auth.AuthState;
  ticket: ticket.TicketState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: auth.authReducer,
  ticket: ticket.ticketReducer
};

export const selectAppState = createFeatureSelector<AppState>("auth");

export const authState = (state: AppState) => state.auth;

export const selectUser = createSelector(
  authState,
  (state: auth.AuthState) => state.user
);

export const ticketState = (state: AppState) => state.ticket;

export const selectBuses = createSelector(
  ticketState,
  (state: ticket.TicketState) => state.plan?.buses
);

export const selectSeat = createSelector(
  ticketState,
  (state: ticket.TicketState) => state.seat
);

export const selectConfirm = createSelector(
  ticketState,
  (state: ticket.TicketState) => state.confirm
);
