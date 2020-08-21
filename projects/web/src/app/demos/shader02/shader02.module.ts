import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Shader02RoutingModule } from './shader02-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        Shader02RoutingModule
    ]
})
export class Shader02Module { }
