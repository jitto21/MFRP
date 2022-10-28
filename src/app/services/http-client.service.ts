import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpCounterService } from "./http-counter.service";


@Injectable({
    providedIn: 'root'
})

export class HttpClientService {

    constructor(private http: HttpClient, private httpCounterService: HttpCounterService) { }

    public getCall(url: string) {
        this.httpCounterService.setHttpCounter(true);
        return this.http.get(url).pipe(
            tap(() => this.setHttpCounter(false)),
            catchError((err) => {
                this.setHttpCounter(false);
                return of(err)
            })
        );
    }

    public postCall(url: string, body: any) {
        this.httpCounterService.setHttpCounter(true);
        return this.http.post(url, body).pipe(
            tap(() => this.setHttpCounter(false)),
            catchError((err) => {
                this.setHttpCounter(false);
                return of(err)
            })
        );
    }

    private setHttpCounter(increment: boolean) {
        this.httpCounterService.setHttpCounter(increment);
    }
}