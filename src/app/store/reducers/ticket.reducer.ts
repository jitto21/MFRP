import { TicketAction, TicketActionsTypes } from "../actions/ticket.action";
import { BusType } from "../../interfaces/bus.interface";

export interface TicketState {
  plan: {
    buses: BusType[] | null;
    message: string;
    error: null | Error;
  };
  seat: {
    selectedBus: BusType | null;
    error: null | Error;
  };
  // payment: {
  //   buses: BusType[] | null;
  // error: null | Error;
  // }
  // confirm: {
  //   buses: BusType[] | null;
  // error: null | Error;
  // }
}

const initialState: TicketState = {
  plan: { buses: null, error: null, message: "" },
  seat: { selectedBus: null, error: null },
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
            action.payload.error && action.payload.error.error
              ? action.payload.error.error.message
              : "Error in fetching buses",
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
          error: null
        }
      };

    default:
      return initialState;
  }
}
