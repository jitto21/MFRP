import { NgModule } from '@angular/core';
import { DigitOnlyDirective } from './digit-only.directive';
import { DobDirective } from './auto-dash-dob.directive';
import { CardDirective } from './auto-dash.directive';

@NgModule({
    declarations:[
        DigitOnlyDirective,
        DobDirective,
        CardDirective
    ],
    exports:[
        DigitOnlyDirective,
        DobDirective,
        CardDirective
    ]
})
export class DirectiveModule {}