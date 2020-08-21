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
        path: 'shader',
        loadChildren: () => import('./demos/shader/shader.module').then(m => m.ShaderModule)
    },
    {
        path: 'shader02',
        loadChildren: () => import('./demos/shader02/shader02.module').then(m => m.Shader02Module)
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
