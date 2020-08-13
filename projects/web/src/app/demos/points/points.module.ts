import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PointsRoutingModule } from './points-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        PointsRoutingModule
    ]
})
export class PointsModule { }
