import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import {
    Mesh, PlaneGeometry, MeshLambertMaterial, BoxGeometry, SphereGeometry,
    SpotLight, SpotLightHelper, AxesHelper, Object3D, Color, AmbientLight,
    PlaneBufferGeometry, MeshPhongMaterial
} from 'three';

import { RenderService, Updatable } from '../../../services/render.service';

@Component({
    selector: 'app-demos-spotlight-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, Updatable {

    private shadowEnabled!: boolean;
    private sphere!: Mesh;
    private cube!: Mesh;
    private spotLight!: SpotLight;
    private spotLightHelper!: SpotLightHelper;
    private objects: Object3D[] = [];

    public lightColor = '#ffffff';

    constructor(
        private rs: RenderService,
        private ngZone: NgZone
    ) { }

    public ngOnInit(): void {
        this.shadowEnabled = this.rs.renderer.shadowMap.enabled;
        this.rs.renderer.shadowMap.enabled = true;
        const scene = this.rs.scene;
        const camera = this.rs.camera;
        //
        const planeGeometry = new PlaneBufferGeometry(100, 100);
        const planeMaterial = new MeshPhongMaterial({
            color: 0xffffff, dithering: true
        });
        const plane = new Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.set(0, -1, 0);
        this.objects.push(plane);
        scene.add(plane);
        //
        const cubeGeometry = new BoxGeometry(4, 4, 4);
        const cubeMaterial = new MeshLambertMaterial({ color: 0xffffaa });
        const cube = new Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;
        this.cube = cube;
        this.objects.push(cube);
        scene.add(cube);
        //
        const sphereGeometry = new SphereGeometry(4, 20, 20);
        const sphereMaterial = new MeshLambertMaterial({ color: 0xffffff });
        const sphere = new Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = 20;
        sphere.position.y = 4;
        sphere.position.z = 0;
        sphere.castShadow = true;
        this.sphere = sphere;
        this.objects.push(sphere);
        scene.add(sphere);
        //
        const ambient = new AmbientLight(0xffffff, 0.3);
        this.objects.push(ambient);
        scene.add(ambient);
        //
        const spotlight = new SpotLight(0xffffff, 1);
        spotlight.position.set(-20, 30, 0);
        spotlight.castShadow = true;
        spotlight.intensity = 1;
        spotlight.distance = 60;
        spotlight.angle = Math.PI / 4.0;
        spotlight.penumbra = 0.5;
        spotlight.decay = 0.5;
        spotlight.shadow.camera.near = 10;
        spotlight.shadow.camera.far = 60;
        this.objects.push(spotlight);
        scene.add(spotlight);
        this.spotLight = spotlight;
        const spotlightHelper = new SpotLightHelper(spotlight);
        this.objects.push(spotlightHelper);
        scene.add(spotlightHelper);
        spotlightHelper.visible = true;
        this.spotLightHelper = spotlightHelper;
        //
        const axesHelper = new AxesHelper(50);
        scene.add(axesHelper);
        this.objects.push(axesHelper);
        //
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);
        //
        this.rs.addUpdatable(this);
    }

    public ngOnDestroy(): void {
        this.rs.removeUpdatable(this);
        this.rs.renderer.shadowMap.enabled = this.shadowEnabled;
        const scene = this.rs.scene;
        for (const obj of this.objects) {
            scene.remove(obj);
        }
    }

    public update(time: number): void {
        const cube = this.cube;
        const angle = (time / 1000) / Math.PI;
        cube.rotation.y = angle;
        cube.rotation.x = angle;
        //
        const sphere = this.sphere;
        sphere.position.x = Math.cos(angle) * 20;
        sphere.position.z = Math.sin(angle) * 20;
        //
        const spotlight = this.spotLight;
        spotlight.position.x = Math.sin(angle) * 20;
        spotlight.position.z = Math.cos(angle) * 10;
        this.spotLightHelper.update();
    }

    public setLightColor(el: HTMLInputElement): void {
        this.ngZone.runOutsideAngular(() => {
            this.spotLight.color.setStyle(el.value);
            // this.spotLight.intensity
        });
    }

    public setLightAngle(el: HTMLInputElement): void {
        this.ngZone.runOutsideAngular(() => {
            const angle = el.valueAsNumber / 180.0 * Math.PI;
            this.spotLight.angle = angle;
        });
    }

    public setLightPenumbra(el: HTMLInputElement): void {
        this.ngZone.runOutsideAngular(() => {
            const penumbra = el.valueAsNumber / 100.0;
            this.spotLight.penumbra = penumbra;
        });
    }

    public setLightDecay(el: HTMLInputElement): void {
        this.ngZone.runOutsideAngular(() => {
            const decay = el.valueAsNumber / 100.0;
            this.spotLight.decay = decay;
        });
    }

}
