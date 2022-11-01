import { AppState } from './../store/app.state';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGaurd implements CanActivate {
    constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | UrlTree | boolean {
        return this.store.select(selectAuthState => selectAuthState.auth.isAuthenticated).pipe(
            tap((isAuth) => {
                console.log(isAuth)
                if(!isAuth) {
                    alert('Please login to access this page');
                    return this.router.navigate(['auth']);
                }
                    
                return true;
            })
        )

        // let auth = this.authService.getAuthStatus();
        // const authState = this.store.select('auth');
        // console.log("Auth Guard ", authState);
        // if(auth) {
        //     console.log("Auth Guard ==> User is authenticated");
        //     return true;
        // }
        // alert('Please login to access this page');
        // return this.router.createUrlTree(['auth']);

    }

}