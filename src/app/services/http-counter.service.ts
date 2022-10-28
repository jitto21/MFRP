import { BehaviorSubject } from 'rxjs';
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class HttpCounterService {

    private httpCounter = 0;
    public httpCounterSubject = new BehaviorSubject<number>(0);

    public getHttpCounterObs() {
        return this.httpCounterSubject.asObservable();
    }

    public setHttpCounter(increment: boolean) {
        increment ? this.httpCounter++ : this.httpCounter--
        this.httpCounterSubject.next(this.httpCounter);
    }

}