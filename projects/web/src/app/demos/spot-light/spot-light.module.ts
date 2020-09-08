import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpotLightRoutingModule } from './spot-light-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        SpotLightRoutingModule
    ]
})
export class SpotLightModule { }
