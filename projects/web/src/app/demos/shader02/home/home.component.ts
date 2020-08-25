import { Component, OnInit, OnDestroy } from '@angular/core';

import {
    Mesh, PlaneGeometry, ShaderMaterial, AxesHelper, DoubleSide, IUniform
} from 'three';

import { Updatable, RenderService } from '../../../services/render.service';

@Component({
    selector: 'app-shader02-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, Updatable {

    private mesh!: Mesh;
    private axesHelper!: AxesHelper;
    private uniforms: { [key: string]: IUniform } = {
        currTime: { value: 0.0 }
    };

    constructor(
        private render: RenderService
    ) { }

    public ngOnInit(): void {
        // 初始化 camera 位置
        this.render.camera.position.y = 5;
        this.render.camera.position.z = 5;
        this.render.camera.position.x = 5;
        this.render.camera.lookAt(0, 0, 0);
        // 添加坐标系辅助
        this.axesHelper = new AxesHelper(10);
        this.render.scene.add(this.axesHelper);
        const plane = new PlaneGeometry(2, 2, 16, 16);
        const shader = new ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: [
                'uniform float currTime;',
                '',
                'varying float distance;',
                '',
                'const float PI = 3.14159;',
                '',
                'void main() {',
                '    distance = sqrt(position.x * position.x + position.y * position.y);',
                '    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
                '}'
            ].join('\n'),
            fragmentShader: [
                'uniform float currTime;',
                '',
                'varying float distance;',
                '',
                'const float PI = 3.14159;',
                'const float N_RINGS = 3.0;',
                'const vec3 COLOR = vec3(1.0, 0.0, 0.0);',
                'const float FREQ = 1.0;',
                '',
                'void main() {',
                '    float intensity = clamp(cos(distance * PI), 0.0, 1.0)',
                '        * clamp(cos(2.0 * PI * (distance * 2.0 * N_RINGS - FREQ * currTime)), 0.0, 1.0);',
                '    gl_FragColor = vec4(COLOR * intensity, intensity);',
                '}'
            ].join('\n'),
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
    }

}
