import { Component, OnInit, OnDestroy } from '@angular/core';

import {
    Mesh, PlaneGeometry, ShaderMaterial, AxesHelper, DoubleSide, IUniform,
    Color
} from 'three';

import { Updatable, RenderService } from '../../../services/render.service';
import { vert, frag } from './shaders';

@Component({
    selector: 'app-shader02-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, Updatable {

    private mesh!: Mesh;
    private axesHelper!: AxesHelper;
    private uniforms = {
        currTime: { value: 0.0 },
        ringColor: { value: [1.0, 0.0, 0.0 ] },
        ringCount: { value: 3.0 },
        ringFreq: { value: 1.0 }
    };

    public color = '#ff0000';
    public count = 3;
    public freq = 1;

    constructor(
        private render: RenderService
    ) { }

    public ngOnInit(): void {
        // 初始化 camera 位置
        this.render.camera.position.y = 2;
        this.render.camera.position.z = 2;
        this.render.camera.position.x = 2;
        this.render.camera.lookAt(0, 0, 0);
        // 添加坐标系辅助
        this.axesHelper = new AxesHelper(10);
        this.render.scene.add(this.axesHelper);
        const plane = new PlaneGeometry(1, 1, 32, 32);
        const shader = new ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vert,
            fragmentShader: frag,
            side: DoubleSide,
            wireframe: false,
            opacity: 0.8
        });
        // const gl = this.render.renderer.getContext();
        // gl.enable(gl.BLEND);
        // gl.blendFunc(gl.NONE, gl.ONE_MINUS_SRC_ALPHA);
        this.mesh = new Mesh(plane, [shader]);
        this.render.scene.add(this.mesh);
        //
        this.render.addUpdatable(this);
    }

    public ngOnDestroy(): void {
        this.render.removeUpdatable(this);
        this.render.scene.remove(this.axesHelper);
        this.render.scene.remove(this.mesh);
    }

    public update(time: number): void {
        this.uniforms.currTime.value = time / 1000.0;
        const color = new Color(this.color);
        this.uniforms.ringColor.value = color.toArray();
        this.uniforms.ringCount.value = this.count;
        this.uniforms.ringFreq.value = this.freq;
    }

}
