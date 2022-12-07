import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { HomeService } from "src/app/home/home.service";
import {
  TicketActionsTypes,
  Bus,
  BusError,
  BusSuccess,
} from "../actions/ticket.action";

@Injectable()
export class TicketEffects {
  constructor(private action: Actions, private homeService: HomeService) {}

  fetchBuses = createEffect(() =>
    this.action.pipe(
      ofType(TicketActionsTypes.BUS),
      map((action: any) => action.payload),
      exhaustMap((payload) => {
        console.log("inside exhaust map ", payload);
        return this.homeService
          .fetchBusDetails(payload.from, payload.to, payload.date)
          .pipe(map((response) => new BusSuccess(response)));
      }),
      catchError((error) => of(new BusError(error)))
    )
  );

  fetchBusesSuccess = createEffect(
    () =>
      this.action.pipe(
        ofType(TicketActionsTypes.BUS_SUCCESS),
        map((action: any) => action.payload),
        tap((payload) => {
          console.log(payload);
        })
      ),
    { dispatch: false }
  );
}
