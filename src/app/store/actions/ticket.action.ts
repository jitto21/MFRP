import { Action } from "@ngrx/store";

export enum TicketActionsTypes {
  BUS = "[PLAN] Bus",
  BUS_SUCCESS = "[PLAN] Bus Success",
  BUS_ERROR = "[PLAN] Bus Error",

  BUS_SELECT_SUCCESS = "[Seat] Bus Select Success",
}

export class Bus implements Action {
  type = TicketActionsTypes.BUS;
  constructor(public payload: any) {}
}

export class BusSuccess implements Action {
  type = TicketActionsTypes.BUS_SUCCESS;
  constructor(public payload: any) {}
}

export class BusError implements Action {
  type = TicketActionsTypes.BUS_ERROR;
  constructor(public payload: any) {}
}

export class BusSelectSuccess implements Action {
  type = TicketActionsTypes.BUS_SELECT_SUCCESS;
  constructor(public payload: any) {}
}

export type TicketAction = Bus | BusSuccess | BusError | BusSelectSuccess;
