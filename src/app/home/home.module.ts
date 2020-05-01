import { NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PlanComponent } from './plan/plan.component';
import { SeatComponent } from './seat/seat.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule, DatePipe, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UrlService } from './url.service';
import { DigitOnlyDirective } from '../digit-only.directive';
import { DobDirective } from '../auto-dash.directive';

@NgModule({
    imports: [
        HomeRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule
    ],
    declarations:[
        HomeComponent,
        HeaderComponent,
        PlanComponent,
        SeatComponent,
        PaymentComponent,
        ConfirmComponent,
        DigitOnlyDirective,
        DobDirective
    ],
    providers: [
        DatePipe,
        UrlService        
    ]
})

export class HomeModule {}