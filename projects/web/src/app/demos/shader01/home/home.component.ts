import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    Mesh, SphereGeometry, ShaderMaterial, MeshNormalMaterial, AxesHelper,
    IUniform
} from 'three';

import { RenderService, Updatable } from '../../../services/render.service';
import { uniforms, vertexShader, fragmentShader } from './shaders';

@Component({
    selector: 'app-shader01-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, Updatable {

    private mesh!: Mesh;
    private axesHelper!: AxesHelper;

    private shader!: ShaderMaterial;

    public minSize = 0;
    public maxSize = 100;
    public step = 1;
    public size = 50;
    public wireframe = true;
    public useTime = true;

    constructor(
        private renderSvc: RenderService
    ) { }

    public ngOnInit(): void {
        this.renderSvc.camera.position.z = 30;
        this.renderSvc.camera.position.y = 30;
        this.renderSvc.camera.lookAt(0, 0, 0);
        const geometry = new SphereGeometry(10, 30, 30);
        this.shader = new ShaderMaterial({
            uniforms, vertexShader, fragmentShader,
            wireframe: this.wireframe
        });
        this.mesh = new Mesh(geometry, [this.shader, new MeshNormalMaterial()]);
        this.renderSvc.addUpdatable(this);
        this.renderSvc.scene.add(this.mesh);
        this.axesHelper = new AxesHelper(20);
        this.renderSvc.scene.add(this.axesHelper);
    }

    public ngOnDestroy(): void {
        this.renderSvc.removeUpdatable(this);
        this.renderSvc.scene.remove(this.mesh);
        this.renderSvc.scene.remove(this.axesHelper);
    }

    public update(time: number): void {
        let t = 1.0;
        if (this.useTime) {
            t = Math.sin(time % 2000.0 / 2000.0 * Math.PI) + 1;
        }
        else {
            t = Math.sin((this.size - 50) / 50.0) + 1;
        }
        uniforms.time.value = t;
        this.shader.wireframe = this.wireframe;
    }

}
