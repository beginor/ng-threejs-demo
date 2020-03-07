import { Injectable } from '@angular/core';

import { AsyncSubject } from 'rxjs';

import {
    Scene, PerspectiveCamera, WebGLRenderer, Color
} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({
    providedIn: 'root'
})
export class ThreeService {

    public scene = new Scene();
    public camera: PerspectiveCamera;
    public renderer: WebGLRenderer;
    public controls: OrbitControls;
    public stats: Stats;
    public updateCallbacks: Array<(time: number) => void> = [];

    constructor() { }
}
