import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { HomeService } from "src/app/home/home.service";
import {
  TicketActionsTypes,
  Bus,
  BusError,
  BusSuccess,
  BusBookSuccess,
  BusBookError,
  BusBookFetch,
  BusBookFetchSuccess,
  BusBookFetchError,
} from "../actions/ticket.action";

@Injectable()
export class TicketEffects {
  constructor(
    private action: Actions,
    private homeService: HomeService,
    private router: Router
  ) {}

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

  bookTicket = createEffect(() =>
    this.action.pipe(
      ofType(TicketActionsTypes.BUS_BOOK),
      map((action: any) => action.payload),
      exhaustMap((payload: any) => {
        console.log("inside bookTicket exhaustMap ; ", payload);
        return this.homeService
          .bookBus(payload.seatBook, payload.ticketBook)
          .pipe(
            map((response) => {
              const payload = response.map((res: any) => res.message);
              return new BusBookSuccess(payload);
            }),
            catchError((error) => of(new BusBookError(error)))
          );
      })
    )
  );

  bookTicketSuccess = createEffect(
    () =>
      this.action.pipe(
        ofType(TicketActionsTypes.BUS_BOOK_SUCCESS),
        map((action: any) => action.payload),
        tap((payload: any) => {
          console.log(payload);
          this.router.navigate(["home/confirm"]);
        })
      ),
    { dispatch: false }
  );

  fetchTicket = createEffect(() =>
    this.action.pipe(
      ofType(TicketActionsTypes.BUS_BOOK_FETCH),
      exhaustMap(() => {
        return this.homeService.getBusTicket().pipe(
          map((response) => new BusBookFetchSuccess(response)),
          catchError((error) => of(new BusBookFetchError(error)))
        );
      })
    )
  );
}
