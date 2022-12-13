import { TicketAction, TicketActionsTypes } from "../actions/ticket.action";
import { BusType } from "../../models/bus.model";
import { Seat } from "src/app/models/seat.model";
import { BusBook } from "src/app/models/bus-book.model";

export interface TicketState {
  plan: {
    buses: BusType[];
    message: string;
    error: Error;
  };
  seat: {
    selectedBus: BusType;
    error: Error;
    selectedSeat: Seat;
  };
  confirm: {
    tickets: BusBook[];
    error: Error;
    message: string[]
  };
}

const initialState: TicketState = {
  plan: { buses: null, error: null, message: "" },
  seat: { selectedBus: null, error: null, selectedSeat: null },
  confirm: { tickets: null, error: null, message: null },
};

export function ticketReducer(
  state = initialState,
  action: TicketAction
): TicketState {
  switch (action.type) {
    case TicketActionsTypes.BUS_SUCCESS:
      return {
        ...state,
        plan: {
          ...state.plan,
          buses: action.payload.buses,
          error: null,
          message: action.payload.message,
        },
      };
    case TicketActionsTypes.BUS_ERROR:
      return {
        ...state,
        plan: {
          ...state.plan,
          buses: null,
          error:
            action.payload.error?.error?.message || "Error in fetching buses",
          message: "",
        },
      };

    case TicketActionsTypes.BUS_SELECT_SUCCESS:
      return {
        ...state,
        plan: {
          ...state.plan,
        },
        seat: {
          ...state.seat,
          selectedBus: action.payload,
          selectedSeat: null,
          error: null,
        },
      };

    case TicketActionsTypes.BUS_SEAT_SELECT_SUCCESS:
      return {
        ...state,
        plan: {
          ...state.plan,
        },
        seat: {
          ...state.seat,
          selectedSeat: action.payload,
          error: null,
        },
      };

    case TicketActionsTypes.BUS_BOOK_SUCCESS:
      return {
        ...state,
        plan: {
          ...state.plan,
        },
        seat: {
          ...state.seat,
        },
        confirm: {
          ...state.confirm,
          tickets: null,
          message: action.payload,
          error: null,
        },
      };

    case TicketActionsTypes.BUS_BOOK_ERROR:
      return {
        ...state,
        plan: {
          ...state.plan,
        },
        seat: {
          ...state.seat,
        },
        confirm: {
          ...state.confirm,
          tickets: null,
          error:
            action.payload.error?.error?.message || "Error in booking bus",
        },
      };

    default:
      return state;
  }
}
