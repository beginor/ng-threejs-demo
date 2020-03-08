import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from '../environments/environment';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        // tslint:disable-next-line: max-line-length
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'about',
        // tslint:disable-next-line: max-line-length
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    },
    {
        path: 'glcube',
        // tslint:disable-next-line: max-line-length
        loadChildren: () => import('./demos/glcube/glcube.module').then(m => m.GlcubeModule)
    }
];

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
