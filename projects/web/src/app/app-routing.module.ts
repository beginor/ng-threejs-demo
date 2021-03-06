import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

// tslint:disable: max-line-length
const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    },
    {
        path: 'glcube',
        loadChildren: () => import('./demos/glcube/glcube.module').then(m => m.GlcubeModule)
    },
    {
        path: 'shader01',
        loadChildren: () => import('./demos/shader01/shader01.module').then(m => m.ShaderModule)
    },
    {
        path: 'shader02',
        loadChildren: () => import('./demos/shader02/shader02.module').then(m => m.Shader02Module)
    },
    {
        path: 'spotlight',
        loadChildren: () => import('./demos/spotlight/spotlight.module').then(m => m.SpotLightModule)
    },
    {
        path: 'point-area-light',
        loadChildren: () => import('./demos/point-area-light/point-area-light.module').then(m => m.PointAreaLightModule)
    },
    {
        path: 'points',
        loadChildren: () => import('./demos/points/points.module').then(m => m.PointsModule)
    },
    {
        path: 'solar',
        loadChildren: () => import('./demos/solar/solar.module').then(m => m.SolarModule)
    }
];
// tslint:enable: max-line-length

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: false,
            enableTracing: !environment.production
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
