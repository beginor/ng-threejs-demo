import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LightRoutingModule } from './light-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        LightRoutingModule
    ]
})
export class LightModule { }
