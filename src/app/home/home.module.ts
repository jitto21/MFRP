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
import { DigitOnlyDirective } from '../directives/digit-only.directive';
import { MaterialModule } from '../material-module';
import { DirectiveModule } from '../directives/directive.module';

@NgModule({
    imports: [
        HomeRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        MaterialModule,
        DirectiveModule
    ],
    declarations:[
        HomeComponent,
        HeaderComponent,
        PlanComponent,
        SeatComponent,
        PaymentComponent,
        ConfirmComponent
    ],
    providers: [
        DatePipe,
        UrlService        
    ]
})

export class HomeModule {}