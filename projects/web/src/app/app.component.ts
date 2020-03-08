import {
    Component, ViewChild, ElementRef, AfterViewInit, OnDestroy
} from '@angular/core';

import {
    Scene, PerspectiveCamera, WebGLRenderer, Color
} from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { RenderService } from './services/render.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {

    private stats: Stats;

    public collapsed = true;

    @ViewChild('glView')
    public glView: ElementRef<HTMLDivElement>;

    constructor(
        private renderSvc: RenderService
    ) { }

    public ngAfterViewInit(): void {
        const scene = new Scene();
        scene.background = new Color('#000000');
        const container = this.glView.nativeElement;
        const camera = new PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            0.1,
            10000
        );
        const controls = new OrbitControls(camera, container);
        const renderer = new WebGLRenderer({
            premultipliedAlpha: false,
            antialias: true
        });
        // renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(
            container.clientWidth,
            container.clientHeight
        );
        container.appendChild(renderer.domElement);
        this.stats = Stats();
        this.stats.dom.style.cssText = `
            position: absolute;
            top: 4px;
            left: 4px;
            cursor: pointer;
            opacity: 0.9;
        `;
        container.appendChild(this.stats.dom);

        window.addEventListener('resize', () => {
            setTimeout(() => {
                camera.aspect = container.clientWidth / container.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(
                    container.clientWidth,
                    container.clientHeight
                );
            }, 300);
        });
        this.renderSvc.scene = scene;
        this.renderSvc.camera = camera;
        this.renderSvc.controls = controls;
        this.renderSvc.renderer = renderer;
        this.animate(0);
    }

    public ngOnDestroy(): void {
        this.renderSvc.scene.dispose();
        this.renderSvc.renderer.domElement.remove();
        this.renderSvc.renderer.dispose();
    }

    private update(time: number): void {
        this.renderSvc.update(time);
    }

    private animate(time: number): void {
        const callback = this.animate.bind(this);
        requestAnimationFrame(callback);
        this.update(time);
        this.renderSvc.renderer.render(
            this.renderSvc.scene,
            this.renderSvc.camera
        );
        this.stats.update();
    }

}
