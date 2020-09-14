import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

import {
    Mesh, Points, MeshBasicMaterial, PointsMaterial, Object3D,
    SphereBufferGeometry, TextureLoader, Geometry, Quaternion, Vector3
} from 'three';

import { RenderService, Updatable } from '../../../services/render.service';

@Component({
    selector: 'app-demos-points-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, Updatable {

    private objects: Object3D[] = [];

    private readonly MaxPoints = 20000;
    private points!: Points;
    private speeds: Quaternion[] = [];

    constructor(
        private ngZone: NgZone,
        private rs: RenderService
    ) { }

    public ngOnInit(): void {
        const { scene, camera, renderer } = this.rs;
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);
        // create earth;
        const sphere = this.createEarth();
        scene.add(sphere);
        // create points;
        this.points = this.createPoints();
        scene.add(this.points);
        this.rs.addUpdatable(this);
    }

    public ngOnDestroy(): void {
        this.rs.removeUpdatable(this);
        const scene = this.rs.scene;
        for (const obj of this.objects) {
            scene.remove(obj);
        }
    }

    public update(time: number): void {
        const geometry = this.points.geometry as Geometry;
        const vertices = geometry.vertices;
        for (let i = 0; i < vertices.length; i++) {
            vertices[i].applyQuaternion(this.speeds[i]);
        }
        geometry.verticesNeedUpdate = true;
    }

    public setPointsColor(el: HTMLInputElement): void {
        this.ngZone.runOutsideAngular(() => {
            const color = el.value;
            const material = this.points.material as PointsMaterial;
            material.color.setStyle(color);
        });
    }

    private createEarth(): Mesh {
        const geometry = new SphereBufferGeometry(1.99, 360, 180);
        const sphereMaterial = new MeshBasicMaterial({
            map: new TextureLoader().load('./assets/land_ocean_ice_2048.jpg'),
            wireframe: false,
            wireframeLinewidth: 1
        });
        const sphere = new Mesh(geometry, sphereMaterial);
        this.objects.push(sphere);
        return sphere;
    }

    private createPoints(): Points {
        const geometry = new Geometry();
        const yaxis = new Vector3(0, 1, 0);
        let i = 0;
        while (geometry.vertices.length < this.MaxPoints) {
            const x = Math.random() * 4.0 - 2.0;
            const y = Math.random() * 4.0 - 2.0;
            const radius = x * x + y * y;
            if (radius < 4) {
                let z = Math.sqrt(4 - radius);
                z = i % 2 === 0 ? z : -z;
                i++;
                // verts
                const vert = new Vector3(x, y, z);
                geometry.vertices.push(vert);
                // angle speed;
                const angle = 0.001 + Math.random() / 1000.0;
                const speed = new Quaternion();
                speed.setFromAxisAngle(yaxis, angle);
                this.speeds.push(speed);
            }
        }
        const material = new PointsMaterial({
            color: 0xff0000,
            size: 3,
            transparent: false,
            sizeAttenuation: false
        });
        const points = new Points(geometry, material);
        this.objects.push(points);
        return points;
    }

}
