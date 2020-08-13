import { Injectable } from '@angular/core';

import {
    Scene, PerspectiveCamera, WebGLRenderer, Camera
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Injectable({
    providedIn: 'root'
})
export class RenderService {

    private updatableObjects: Updatable[] = [];

    public scene!: Scene;
    public camera!: PerspectiveCamera;
    public renderer!: WebGLRenderer;
    public controls!: OrbitControls;

    constructor() { }

    public addUpdatable(obj: Updatable): void {
        this.updatableObjects.push(obj);
    }

    public removeUpdatable(obj: Updatable): void {
        const idx = this.updatableObjects.indexOf(obj);
        if (idx >= -1) {
            this.updatableObjects.splice(idx, 1);
        }
    }

    public update(time: number): void {
        for (const obj of this.updatableObjects) {
            obj.update(time);
        }
    }
}

export interface Updatable {

    update(time: number): void;

}
