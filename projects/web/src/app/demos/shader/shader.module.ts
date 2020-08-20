import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShaderRoutingModule } from './shader-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        ShaderRoutingModule
    ]
})
export class ShaderModule { }
