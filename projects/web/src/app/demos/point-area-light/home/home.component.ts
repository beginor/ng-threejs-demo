import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';

import {
    Object3D, PCFSoftShadowMap, sRGBEncoding, AmbientLight, RectAreaLight, Mesh,
    PlaneBufferGeometry, MeshBasicMaterial, BackSide, BoxBufferGeometry,
    MeshStandardMaterial, SphereBufferGeometry, TorusKnotBufferGeometry,
    PointLight
} from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

import { RenderService, Updatable } from '../../../services/render.service';

@Component({
    selector: 'app-demos-point-area-light-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, Updatable {

    private shadowEnabled!: boolean;
    private objects: Object3D[] = [];
    private rectLight!: RectAreaLight;
    private pointLight!: PointLight;

    constructor(
        private ngZone: NgZone,
        private rs: RenderService
    ) { }

    public ngOnInit(): void {
        const { scene, camera, renderer } = this.rs;
        this.shadowEnabled = renderer.shadowMap.enabled;
        // setup shadowmap
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = PCFSoftShadowMap;
        renderer.outputEncoding = sRGBEncoding;
        // check for extensions
        if (!renderer.capabilities.isWebGL2
            && !renderer.extensions.get('OES_texture_float')) {
            alert( 'OES_texture_float not supported' );
            throw new Error('missing webgl extension');
        }
        if (!renderer.capabilities.isWebGL2
            && !renderer.extensions.get('OES_texture_float_linear')) {
            alert( 'OES_texture_float_linear not supported' );
            throw new Error('missing webgl extension');
        }
        // add ambient;
        const ambient = new AmbientLight(0xffffff, 0.1);
        scene.add(ambient);
        this.objects.push(ambient);
        // react area light
        RectAreaLightUniformsLib.init();
        const rectLight = new RectAreaLight(0xffffff, 1.0, 10, 10);
        rectLight.position.set(5, 5, 0);
        scene.add(rectLight);
        this.rectLight = rectLight;
        this.objects.push(rectLight);
        const rectLightMesh = new Mesh(
            new PlaneBufferGeometry(),
            new MeshBasicMaterial({ side: BackSide })
        );
        rectLightMesh.scale.x = rectLight.width;
        rectLightMesh.scale.y = rectLight.height;
        rectLight.add(rectLightMesh);
        const rectLightMeshBack = new Mesh(
            new PlaneBufferGeometry(),
            new MeshBasicMaterial({ color: 0x080808 })
        );
        rectLightMesh.add(rectLightMeshBack);
        // floor
        const floor = new Mesh(
            new BoxBufferGeometry(100, 0.1, 100),
            new MeshStandardMaterial({
                color: 0x808080, roughness: 0, metalness: 0
            })
        );
        scene.add(floor);
        this.objects.push(floor);
        // some objects;
        const material = new MeshStandardMaterial({
            color: 0xA00000, roughness: 0, metalness: 0
        });
        const box = new Mesh(
            new BoxBufferGeometry(Math.PI, Math.sqrt(2), Math.E),
            material
        );
        box.position.set(0, 5, 0);
        box.rotation.set(0, Math.PI / 2, 0);
        box.castShadow = true;
        box.receiveShadow = true;
        scene.add(box);
        this.objects.push(box);
        const sphere = new Mesh(
            new SphereBufferGeometry(1.5, 32, 32),
            material
        );
        sphere.position.set(-5, 5, 0);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        scene.add(sphere);
        this.objects.push(sphere);
        const knot = new Mesh(
            new TorusKnotBufferGeometry(1.5, 0.5, 100, 16),
            material
        );
        knot.position.set(5, 5, 0);
        knot.castShadow = true;
        knot.receiveShadow = true;
        scene.add(knot);
        this.objects.push(knot);
        // point light
        const pointLight = new PointLight(0xffff00, 0.5, 20, 0.5);
        pointLight.position.set(0, 10, 0);
        const pointLightMesh = new Mesh(
            new BoxBufferGeometry(0.2, 0.2, 0.2),
            new MeshBasicMaterial({ color: 0xffff00 })
        );
        pointLight.add(pointLightMesh);
        scene.add(pointLight);
        this.pointLight = pointLight;
        //
        camera.position.set(0, 20, 35);
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
        const t = time / 2000.0;
        const r = 15;
        const lx = r * Math.cos(t);
        const lz = r * Math.sin(t);
        const ly = 5.0 + 5.0 * Math.sin(t / 3.0);
        this.rectLight.position.set(lx, ly, lz);
        this.rectLight.lookAt(0, 0, 0);
        this.pointLight.position.y = 10.0 + 5.0 * Math.sin(t);
    }

    public setPointLightColor(el: HTMLInputElement): void {
        this.ngZone.runOutsideAngular(() => {
            this.pointLight.color.setStyle(el.value);
            const mesh = this.pointLight.children[0] as Mesh;
            const mat = mesh.material as MeshBasicMaterial;
            mat.color.copy(this.pointLight.color)
                .multiplyScalar(this.pointLight.intensity);
        });
    }

    public setRectLightColor(el: HTMLInputElement): void {
        this.ngZone.runOutsideAngular(() => {
            this.rectLight.color.setStyle(el.value);
            const mesh = this.rectLight.children[0] as Mesh;
            const mat = mesh.material as MeshBasicMaterial;
            mat.color.copy(this.rectLight.color)
                .multiplyScalar(this.rectLight.intensity);
        });
    }

    public setPointLightPenumbra(el: HTMLInputElement): void {
        this.ngZone.runOutsideAngular(() => {
            const val = el.valueAsNumber / 100.0;
            this.pointLight.intensity = val;
        });
    }

    public setRectLightPenumbra(el: HTMLInputElement): void {
        this.ngZone.runOutsideAngular(() => {
            const val = el.valueAsNumber / 100.0;
            this.rectLight.intensity = val;
        });
    }

}
