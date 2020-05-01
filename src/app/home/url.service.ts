import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UrlService {
    private urlChanged = new Subject<string>()
    constructor(private router: Router) {
        router.events.subscribe(route=> {
            if(route instanceof NavigationEnd) {
              console.log("URL ==> ",route.url)
              this.urlChanged.next(route.url);
            }
          })
    }

    getUrlChanged() {
        return this.urlChanged.asObservable();
    }

}