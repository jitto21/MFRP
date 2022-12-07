import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as auth from "./reducers/auth.reducer";
import * as ticket from "./reducers/ticket.reducer";

export interface AppState {
  auth: auth.AuthState;
  ticket: ticket.TicketState
}

export const reducers = {
  auth: auth.authReducer,
  ticket: ticket.ticketReducer
};

export const selectAppState = createFeatureSelector<AppState>("auth");

export const selectTicket = (state: AppState) => state.ticket;

export const selectBuses = createSelector(
  selectTicket,
  (state: ticket.TicketState) => state.plan.buses
);
