import { HttpInterceptor } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { AppState } from "../store/app.state";
import { Store } from "@ngrx/store";
import { exhaustMap, switchMap, take, tap } from "rxjs/operators";
import { of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: import("@angular/common/http").HttpRequest<any>,
    next: import("@angular/common/http").HttpHandler
  ): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    return this.store
      .select((s) => s.auth.user)
      .pipe(
        take(1),
        exhaustMap((user) => {
          console.log("INTERCEPT : ", user);
          const token = user && user.token ? user.token : null;
          const newReq = req.clone({
            headers: req.headers.set("Authorization", "Bearer " + token),
            url: !environment.production
              ? "http://localhost:8080/" + req.url
              : req.url,
          });
          return next.handle(newReq);
        })
      );
  }
}
