import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlcubeRoutingModule } from './glcube-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        GlcubeRoutingModule
    ]
})
export class GlcubeModule { }
