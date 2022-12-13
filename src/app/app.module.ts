import { AuthEffects } from './store/effects/auth.effect';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DirectiveModule } from './directives/directive.module';
import { ErrorComponent } from './error/error.component';
import { ErrorInterceptor } from './error/error.interceptor';
import { AuthInterceptor } from './auth/auth-interceptor';
import { StoreModule } from '@ngrx/store';
import { LoadingComponent } from './loading/loading.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { reducers } from './store/app.state';
import { TicketEffects } from './store/effects/ticket.effect';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoadingComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
    HttpClientModule,
    DirectiveModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, TicketEffects]),
    StoreDevtoolsModule.instrument({
      name: 'bus-booking-app',
      logOnly: environment.production
    })
  ],
  entryComponents: [ErrorComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
