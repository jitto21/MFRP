import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthSignupModel } from './auth-signup.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    url: string = '';
    private token: string = null;
    private isAuthenticated: boolean = false;
    private logoutTimer;
    private authStateListener = new Subject<boolean>()
    private loggedInUser = {lname: '',fname: ''}   

    constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

    getUrl() {
        return this.url;
    }

    getLoggedInUser() {
        return this.loggedInUser;
    }

    getAuthStatus() {
        return this.isAuthenticated;
    }

    getAuthStateListener() {
        return this.authStateListener.asObservable();
    }

    signup(signupObj) {
        let signupUser: AuthSignupModel = {
            fname: signupObj.fname,
            lname: signupObj.lname,
            phone: signupObj.phone,
            gender: signupObj.gender,
            email: signupObj.emailSignup,
            pass: signupObj.passSignup,
        }
        console.log(signupUser);
        this.http.post('http://localhost:3000/auth/signup', signupUser)
            .subscribe(resData => {
                console.log(resData);
            });
    }

    login(loginObj) {
        let loginUser = {
            email: loginObj.email,
            pass: loginObj.pass
        };
        this.http.post<{
            message: string,
            token: string,
            expiresIn: number,
            fname: string,
            lname: string
        }>('http://localhost:3000/auth/login', loginUser)
            .subscribe((resData) => {
                console.log(resData);
                this.loggedInUser.fname = resData.fname;
                this.loggedInUser.lname = resData.lname;

                this.token = resData.token;
                const expiresIn = resData.expiresIn;
                if (this.token) {
                    this.isAuthenticated = true;
                    this.authStateListener.next(true);
                    this.autoLogout(expiresIn * 1000);
                    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
                    this.saveAuthData(this.token, expirationDate, this.loggedInUser.fname, this.loggedInUser.lname);
                    this.router.navigate(['home/plan'])
                }
            }, err => {
                this.authStateListener.next(false);
                console.log(err);
            })
    }


    autoLogin() {
        const user = this.getAuthData();
        if(!user) {
            console.log("user is NOT in localstorage");
            return;
        }
        console.log("user is still in localstorage");
        console.log(user);
        const expiresIn = user.expirationDate.getTime() - new Date().getTime();
        console.log("New expiry time in minutes", expiresIn/60000);
        this.autoLogout(expiresIn);
        this.token = user.token;
        this.loggedInUser.fname = user.fname;
        this.loggedInUser.lname = user.lname;
        this.isAuthenticated = true;
        this.authStateListener.next(true);

    }

    autoLogout(expiresIn: number) {
        this.logoutTimer = setTimeout(()=> {
            this.logout();
        }, expiresIn)
    }

    logout() {
        console.log("logout called");
        alert("Logged Out")
        this.authStateListener.next(false);
        this.isAuthenticated = false;
        this.token = null;
        clearTimeout(this.logoutTimer);
        this.deleteAuthData();
        this.router.navigate(['']);
    }

    saveAuthData(token: string, expirationDate: Date, fname: string, lname: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationDate', expirationDate.toISOString());
        localStorage.setItem('fname', fname);
        localStorage.setItem('lname', lname);

    }

    deleteAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('fname');
        localStorage.removeItem('lname');
    }

    getAuthData() {
        let authUser;
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem('expirationDate');
        const fname = localStorage.getItem("fname");
        const lname = localStorage.getItem("lname");
        if(!token || !expirationDate) {
            return;
        }
        authUser = {token: token, expirationDate: new Date(expirationDate), fname: fname, lname: lname}
        return authUser;
    }

    /**8888888888888888 */

}