import { HttpClientService } from './../services/http-client.service';
import { Injectable } from '@angular/core';
import { AuthSignupModel } from './auth-signup.model';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from '../error/error.component';
import { HttpResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url: string = '';
    private token: string = null;
    private isAuthenticated: boolean = false;
    private logoutTimer;
    private authStateListener = new Subject<boolean>()
    private loggedInUser = { name: '', gender: '', age: '' };
    private homeStatus = { plan: true, seat: false, confirm: false, payment: false };

    constructor(private http: HttpClientService, private router: Router, private dialog: MatDialog) { }

    getToken() {
        return this.token;
    }

    getUrl() {
        return this.url;
    }

    getLoggedInUser() { //returns name, age and gender
        return this.loggedInUser;
    }

    getHomeStatus() { //returns status of plan, seat, paymet and confirm
        return this.homeStatus;
    }

    getAuthStatus() {
        return this.isAuthenticated;
    }

    getAuthStateListener() {
        return this.authStateListener.asObservable();
    }

    signup(signupObj, age: number) {
        let signupUser: AuthSignupModel = {
            fname: signupObj.fname,
            lname: signupObj.lname,
            phone: signupObj.phone,
            gender: signupObj.gender,
            email: signupObj.emailSignup,
            pass: signupObj.passSignup,
            age: age
        }
        console.log(signupUser);
        this.http.postCall('auth/signup', signupUser)
            .subscribe((resData: { message: string }) => {
                console.log(resData);
                this.dialog.open(ErrorComponent, {
                    data: { title: resData.message, message: 'Now Login With Your Credentials' }
                });
            });
        // this.http.post<{message: string}>('auth/signup', signupUser)
        //     .subscribe(resData => {
        //         console.log(resData);
        //         this.dialog.open(ErrorComponent, {
        //             data: {title: resData.message, message: 'Now Login With Your Credentials'}
        //         });
        //     });
    }

    login(loginObj) {
        let loginUser = {
            email: loginObj.email,
            pass: loginObj.pass
        };
        return this.http.postCall('auth/login', loginUser)
            // .subscribe((resData: {
            //     message: string,
            //     token: string,
            //     expiresIn: number,
            //     name: string,
            //     gender: string,
            //     age: string
            // }) => {
            //     console.log(resData);
            //     this.loggedInUser.name = resData.name;
            //     this.loggedInUser.gender = resData.gender;
            //     this.loggedInUser.age = resData.age;
            //     this.token = resData.token;
            //     const expiresIn = resData.expiresIn;
            //     if (this.token) {
            //         this.isAuthenticated = true;
            //         this.authStateListener.next(true);
            //         this.autoLogout(expiresIn * 1000);
            //         const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            //         this.saveAuthData(this.token, expirationDate, this.loggedInUser.name, this.loggedInUser.gender, this.loggedInUser.age);
            //         this.router.navigate(['home/plan'])
            //     }
            // }, err => {
            //     this.authStateListener.next(false);
            //     console.log(err);
            // });
    }


    autoLogin(user) {
        // const user = this.getAuthData();
        if (!user) {
            console.log("user is NOT in localstorage");
            return;
        }
        console.log("user is still in localstorage");
        console.log(user);
        const expiresIn = user.expirationDate.getTime() - new Date().getTime();
        console.log("New expiry time in minutes", expiresIn / 60000);
        this.autoLogout(expiresIn);
        this.token = user.token;
        this.loggedInUser.name = user.name;
        this.loggedInUser.gender = user.gender;
        this.loggedInUser.age = user.age;
        this.isAuthenticated = true;
        this.authStateListener.next(true);

    }

    autoLogout(expiresIn: number) {
        console.log("New expiry time in minutes", expiresIn / 60000);
        this.logoutTimer = setTimeout(() => {
            this.logout();
        }, expiresIn)
    }

    logout() {
        this.router.navigate(['auth']);
        console.log("logout called");
        alert("Logged Out")
        this.authStateListener.next(false);
        this.isAuthenticated = false;
        this.token = null;
        clearTimeout(this.logoutTimer);
        this.deleteAuthData();
    }

    saveAuthData(token: string, expirationDate: Date, name: string, gender: string, age: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate.toISOString());
        localStorage.setItem('name', name);
        localStorage.setItem('gender', gender);
        localStorage.setItem('age', age);
    }

    deleteAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('gender');
        localStorage.removeItem('age');
    }

    getAuthData() {
        let authUser = {};
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem('expirationDate');
        const name = localStorage.getItem("name");
        const gender = localStorage.getItem("gender");
        const age = +localStorage.getItem("age");
        if (!token || !expirationDate) {
            return authUser;
        }
        authUser = { token, expirationDate: new Date(expirationDate), name, gender, age }
        return authUser;
    }
}