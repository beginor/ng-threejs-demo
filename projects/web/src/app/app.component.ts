import {
    Component, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';

import {
    Scene, PerspectiveCamera, WebGLRenderer, Color
} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { ThreeService } from './services/three.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

    public collapsed = true;

    @ViewChild('glView')
    public glView: ElementRef<HTMLDivElement>;

    constructor(
        private three: ThreeService
    ) { }

    public ngAfterViewInit(): void {
        this.three.scene = new Scene();
        this.three.scene.background = new Color('#000000');
        const container = this.glView.nativeElement;
        this.three.camera = new PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            10000
        );
        this.three.camera.position.z = 5;
        this.three.controls = new OrbitControls(this.three.camera, container);
        this.three.renderer = new WebGLRenderer({
            premultipliedAlpha: false
        });
        this.three.renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );
        container.appendChild(this.three.renderer.domElement);
        this.three.stats = Stats();
        this.three.stats.dom.style.cssText = `
            position: absolute;
            top: 4px;
            left: 4px;
            cursor: pointer;
            opacity: 0.9;
        `;
        container.appendChild(this.three.stats.dom);
        this.animate(0);
        window.addEventListener('resize', () => {
            this.three.renderer.setSize(
                container.clientWidth,
                container.clientHeight
            );
        });
    }

    private update(time: number): void {
        this.three.updateCallbacks.forEach(callback => {
            callback(time);
        });
    }

    private animate(time: number): void {
        const callback = this.animate.bind(this);
        requestAnimationFrame(callback);
        this.update(time);
        this.three.renderer.render(this.three.scene, this.three.camera);
        this.three.stats.update();
    }

}
