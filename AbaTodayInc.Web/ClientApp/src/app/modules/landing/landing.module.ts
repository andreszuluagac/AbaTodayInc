import { NgModule } from '@angular/core';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared.module';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        SharedModule,
        LandingRoutingModule
    ]
})
export class LandingModule { }
