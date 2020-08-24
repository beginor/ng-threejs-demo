import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    Mesh, BoxGeometry, MeshBasicMaterial, AxesHelper
} from 'three';

import { RenderService, Updatable } from '../../../services/render.service';

@Component({
    selector: 'app-glcube-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, Updatable {

    private cube!: Mesh;
    private axesHelper!: AxesHelper;

    constructor(
        private renderSvc: RenderService
    ) { }

    public ngOnInit(): void {
        this.renderSvc.camera.position.x = 0;
        this.renderSvc.camera.position.y = 0;
        this.renderSvc.camera.position.z = 5;
        this.renderSvc.camera.lookAt(0, 0, 0);
        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({
            color: 0x00ff00
        });
        this.cube = new Mesh(geometry, material);
        this.renderSvc.scene.add(this.cube);
        this.axesHelper = new AxesHelper(3);
        this.renderSvc.scene.add(this.axesHelper);
        this.renderSvc.addUpdatable(this);
    }

    public ngOnDestroy(): void {
        this.renderSvc.removeUpdatable(this);
        this.renderSvc.scene.remove(this.cube);
        this.renderSvc.scene.remove(this.axesHelper);
    }

    public update(time: number): void {
        const angle = (time / 1000) / Math.PI;
        this.cube.rotation.x = angle;
        this.cube.rotation.y = angle;
    }

}
