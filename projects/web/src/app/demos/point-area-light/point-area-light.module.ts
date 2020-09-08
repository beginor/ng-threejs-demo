import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointAreaLightRoutingModule } from './point-area-light-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        PointAreaLightRoutingModule
    ]
})
export class PointAreaLightModule { }
