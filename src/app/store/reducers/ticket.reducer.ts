import { TicketAction, TicketActionsTypes } from "../actions/ticket.action";
import { BusType } from "../../models/bus.model";
import { Seat } from "src/app/models/seat.model";
import { BusBookResponse } from "src/app/models/bus-book.model";
import { AuthActionTypes } from "../actions/auth.action";

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
  book: {
    error: Error;
    message: string[];
  };
  confirm: {
    error: Error;
    message: string;
    tickets: BusBookResponse[];
  };
}

const initialState: TicketState = {
  plan: null,
  seat: null,
  book: null,
  confirm: null,
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
        book: {
          ...state.book,
          message: action.payload,
          error: null,
        },
        confirm: null,
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
        book: {
          ...state.book,
          error: action.payload.error?.error?.message || "Error in booking bus",
        },
        confirm: null,
      };

    case TicketActionsTypes.BUS_BOOK_FETCH_SUCCESS:
      return {
        ...state,
        plan: {
          ...state.plan,
        },
        seat: {
          ...state.seat,
        },
        book: {
          ...state.book,
        },
        confirm: {
          ...state.confirm,
          tickets: action.payload.tickets,
          error: null,
          message: action.payload.message,
        },
      };

    case TicketActionsTypes.BUS_BOOK_FETCH_ERROR:
      return {
        ...state,
        plan: {
          ...state.plan,
        },
        seat: {
          ...state.seat,
        },
        book: {
          ...state.book,
        },
        confirm: {
          ...state.confirm,
          tickets: null,
          error:
            action.payload.error?.error?.message || "Error in fetching tickets",
          message: null,
        },
      };

      case TicketActionsTypes.BUS_CLEAR:
        return initialState;
        
    default:
      return state;
  }
}
