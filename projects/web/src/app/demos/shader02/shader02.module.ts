import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Shader02RoutingModule } from './shader02-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        FormsModule,
        Shader02RoutingModule
    ]
})
export class Shader02Module { }
