import { Component, OnInit, OnDestroy } from '@angular/core';
import { Mesh, BoxGeometry, MeshBasicMaterial, Scene, Camera } from 'three';

import { RenderService, Updatable } from '../../../services/render.service';

@Component({
    selector: 'app-glcube-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, Updatable {

    private cube: Mesh;

    constructor(
        private renderSvc: RenderService
    ) { }

    public ngOnInit(): void {
        this.renderSvc.camera.position.z = 5;
        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({
            color: 0x00ff00
        });
        this.cube = new Mesh(geometry, material);
        this.renderSvc.scene.add(this.cube);
        this.renderSvc.addUpdatable(this);
    }

    public ngOnDestroy(): void {
        this.renderSvc.removeUpdatable(this);
        this.renderSvc.scene.remove(this.cube);
    }

    public update(time: number): void {
        const angle = (time / 1000) / Math.PI;
        this.cube.rotation.x = angle;
        this.cube.rotation.y = angle;
    }

}
