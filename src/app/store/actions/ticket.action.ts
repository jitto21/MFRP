import { Action } from "@ngrx/store";

export enum TicketActionsTypes {
  BUS = "[Ticket] Bus Fetch",
  BUS_SUCCESS = "[Ticket] Bus Fetch Success",
  BUS_ERROR = "[Ticket] Bus Fetch Error",

  BUS_SELECT_SUCCESS = "[Ticket] Bus Select Success",
  BUS_SEAT_SELECT_SUCCESS = "[Ticket] Bus Seat Select Success",

  BUS_BOOK = "[Ticket] Bus Book",
  BUS_BOOK_SUCCESS = "[Ticket] Bus Book Success",
  BUS_BOOK_ERROR = "[Ticket] Bus Book Error",
}

//FETCH

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

//SELECT

export class BusSelectSuccess implements Action {
  type = TicketActionsTypes.BUS_SELECT_SUCCESS;
  constructor(public payload: any) {}
}

export class BusSeatSelectSuccess implements Action {
  type = TicketActionsTypes.BUS_SEAT_SELECT_SUCCESS;
  constructor(public payload: any) {}
}

//BOOK

export class BusBook implements Action {
  type = TicketActionsTypes.BUS_BOOK;
  constructor(public payload: any) {}
}

export class BusBookSuccess implements Action {
  type = TicketActionsTypes.BUS_BOOK_SUCCESS;
  constructor(public payload: any) {}
}

export class BusBookError implements Action {
  type = TicketActionsTypes.BUS_BOOK_ERROR;
  constructor(public payload: any) {}
}

export type TicketAction =
  | Bus
  | BusSuccess
  | BusError
  | BusSelectSuccess
  | BusSeatSelectSuccess
  | BusBook
  | BusBookSuccess
  | BusBookError;
