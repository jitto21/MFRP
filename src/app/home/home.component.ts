import { Logout } from './../store/actions/auth.action';
import { AppState } from './../store/app.state';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loggedInUser;
  constructor(private authService: AuthService, private store: Store<AppState>) { 
  
  }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    console.log(this.loggedInUser);
  }

  onLogout() {
    this.store.dispatch(new Logout({}));
    //this.authService.logout();
  }

  ngOnDestroy() {
  }

}
