import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HomeModel } from './home.model';

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    constructor(private http: HttpClient) {}

    fetchBusDetails(from: string, to: string, date: string) {
        return this.http.get<{message: string, buses: HomeModel[]}>(`http://localhost:3000/bus/fetch?from=${from}&to=${to}&date=${date}`)
    }
}