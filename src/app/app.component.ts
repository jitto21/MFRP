import { LoginAuto, Logout } from './store/actions/auth.action';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store<AppState>) {

  }
  ngOnInit() {
    const user: any = this.authService.getAuthData();
    if (user && user.token) {
      this.store.dispatch(new LoginAuto(user));
    }

    // this.authService.autoLogin();
  }
}
