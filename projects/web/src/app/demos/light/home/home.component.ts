import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    Mesh, PlaneGeometry, MeshLambertMaterial, BoxGeometry, SphereGeometry, SpotLight
} from 'three';

import { RenderService, Updatable } from '../../../services/render.service';

@Component({
    selector: 'app-demos-light-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    public shadowEnabled!: boolean;

    private plane!: Mesh;
    private cube!: Mesh;
    private sphere!: Mesh;
    private spotlight!: SpotLight;

    constructor(
        private rs: RenderService
    ) { }

    public ngOnInit(): void {
        this.shadowEnabled = this.rs.renderer.shadowMap.enabled;
        this.rs.renderer.shadowMap.enabled = true;
        const scene = this.rs.scene;
        const camera = this.rs.camera;
        //
        const planeGeometry = new PlaneGeometry(60, 20);
        const planeMaterial = new MeshLambertMaterial({ color: 0xffffff });
        const plane = new Mesh(planeGeometry, [planeMaterial]);
        plane.receiveShadow = true;
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;
        this.plane = plane;

        scene.add(plane);
        //
        const cubeGeometry = new BoxGeometry(4,  4, 4);
        const cubeMaterial = new MeshLambertMaterial({ color: 0xffffff });
        const cube = new Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.position.x = -4;
        cube.position.y = 3;
        cube.position.z = 0;
        this.cube = cube;
        scene.add(cube);
        //
        const sphereGeometry = new SphereGeometry(4, 20, 20);
        const sphereMaterial = new MeshLambertMaterial({ color: 0xffffff });
        const sphere = new Mesh(sphereGeometry, sphereMaterial);
        sphere.position.x = 20;
        sphere.position.y = 4;
        sphere.position.z = 2;
        sphere.castShadow = true;
        this.sphere = sphere;
        scene.add(sphere);
        //
        camera.position.x = -30;
        camera.position.y = 40;
        camera.position.z = 30;
        camera.lookAt(scene.position);
        const spotlight = new SpotLight(0xffffff);
        spotlight.position.set(-40, 60, 10);
        spotlight.castShadow = true;
        this.spotlight = spotlight;
        scene.add(spotlight);
    }

    public ngOnDestroy(): void {
        this.rs.renderer.shadowMap.enabled = this.shadowEnabled;
        const scene = this.rs.scene;
        scene.remove(this.plane, this.cube, this.sphere, this.spotlight);
    }

}
