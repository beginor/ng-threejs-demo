import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';

import {
    Mesh, Object3D, LoadingManager, TextureLoader, PointLight, AmbientLight,
    AxesHelper, Scene, SphereBufferGeometry, MeshBasicMaterial, SphereGeometry,
    Sprite, SpriteMaterial, CanvasTexture, AdditiveBlending, NormalBlending,
    LineBasicMaterial, Geometry, ArcCurve, Line
} from 'three';

import { RenderService, Updatable } from '../../../services/render.service';

@Component({
    selector: 'app-demo-solar-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, Updatable {

    private objects: Object3D[] = [];
    private indexes = {
        sun: 0,  mercury: 1,  venus: 2,  earth: 3, mars: 4,
        jupiter: 5, saturn: 6, uranus: 7, neptune: 8
    };
    private radiuses = [
        695500,
          2440,
          6052,
          6371,
          3390,
         69911,
         60268,
         25559,
         24764
    ];
    private distances = [
                 0,
          57909050,
         108208000,
         149598023,
         227936600,
         778547200,
        1433449370,
        2876679082,
        4503443661
    ];
    private textures = [
        'assets/solar/sun.jpg',
        'assets/solar/mercury.jpg',
        'assets/solar/venus.jpg',
        'assets/solar/earth.jpg',
        'assets/solar/mars.jpg',
        'assets/solar/jupiter.jpg',
        'assets/solar/saturn.jpg',
        'assets/solar/uranus.jpg',
        'assets/solar/neptune.jpg'
    ];
    private movingSpeeds = [
        0,
        -1.0 / 87.9691,
        -1.0 / 224.701,
        -1.0 / 365.256363004,
        -1.0 / 686.98,
        -1.0 / 4332.59,
        -1.0 / 10832.327,
        -1.0 / 30799.095,
        -1.0 / 60327.624
    ];
    private rotateSpeeds = [
        0,
        0,
        0,
        1.0 / 24,
        0,
        0,
        0,
        0,
        0
    ];
    private distanceRatio = 1 / 100;
    private radiusRatio = 20;
    private sunRadiusRatio = 1 / 2;
    private movingSpeedRatio = Math.PI * 100;
    constructor(
        private ngZone: NgZone,
        private rs: RenderService
    ) { }

    public ngOnInit(): void {
        this.rs.controls.enablePan = false;
        const { scene, camera, renderer } = this.rs;
        // setup camera;
        const sunRadius = this.radiuses[this.indexes.sun];
        camera.position.set(sunRadius * 6, sunRadius * 6, sunRadius * 6);
        camera.lookAt(0, 0, 0);
        const axesHelper = new AxesHelper(sunRadius * 100);
        this.objects.push(axesHelper);
        scene.add(axesHelper);
        this.addLights(scene);
        this.addSun(scene);
        this.addRings(scene);
        this.addMercury(scene);
        this.addVenus(scene);
        this.addEarth(scene);
        this.addMars(scene);
        this.addJupiter(scene);
        this.addSaturn(scene);
        this.addUranus(scene);
        this.addNeptune(scene);
        this.rs.addUpdatable(this);
    }

    public ngOnDestroy(): void {
        const { scene } = this.rs;
        this.rs.removeUpdatable(this);
        for (const obj of this.objects) {
            scene.remove(obj);
        }
    }

    public update(time: number): void {
        const seconds = time / 1000.0;
        this.updateMercury(seconds);
        this.updateVenus(seconds);
        this.updateEarth(seconds);
        this.updateMars(seconds);
        this.updateJupiter(seconds);
        this.updateSturn(seconds);
        this.updateUranus(seconds);
        this.updateNeptune(seconds);
    }

    private updateMercury(seconds: number): void {
        this.updateMesh(this.indexes.mercury, 'mercury', seconds);
    }

    private updateVenus(seconds: number): void {
        this.updateMesh(this.indexes.venus, 'venus', seconds);
    }

    private updateEarth(seconds: number): void {
        this.updateMesh(this.indexes.earth, 'earth', seconds);
    }

    private updateMars(seconds: number): void {
        this.updateMesh(this.indexes.mars, 'mars', seconds);
    }

    private updateJupiter(seconds: number): void {
        this.updateMesh(this.indexes.jupiter, 'jupiter', seconds);
    }

    private updateSturn(seconds: number): void {
        this.updateMesh(this.indexes.saturn, 'saturn', seconds);
    }

    private updateUranus(seconds: number): void {
        this.updateMesh(this.indexes.uranus, 'uranus', seconds);
    }

    private updateNeptune(seconds: number): void {
        this.updateMesh(this.indexes.neptune, 'neptune', seconds);
    }

    private updateMesh(index: number, name: string, seconds: number): void {
        const radius = this.distances[index] * this.distanceRatio;
        const mesh = this.objects.find(o => o.name === name) as Mesh;
        const movingSpeed = this.movingSpeeds[index];
        const angle = seconds * movingSpeed * this.movingSpeedRatio;
        mesh.position.set(
            Math.cos(angle) * radius,
            0,
            Math.sin(angle) * radius
        );
    }

    private addRings(scene: Scene): void {
        for (const distance of this.distances) {
            const material = new LineBasicMaterial({
                color: 0x888888,
                depthTest: false,
                linewidth: 40
            });
            const geometry = new Geometry();
            const arc = new ArcCurve(
                0,
                0,
                distance * this.distanceRatio,
                0,
                Math.PI * 2, true
            );
            const points = arc.getPoints(720);
            geometry.setFromPoints(points);
            const line = new Line(geometry, material);
            line.rotation.x = Math.PI / 2;
            this.objects.push(line);
            scene.add(line);
        }
    }

    private addLights(scene: Scene): void {
        const pointLight = new PointLight(0xffffff, 1, Number.MAX_SAFE_INTEGER);
        scene.add(pointLight);
        this.objects.push(pointLight);
        const ambientLight = new AmbientLight(0x333333);
        scene.add(ambientLight);
        this.objects.push(ambientLight);
    }

    private addNeptune(scene: Scene): void {
        const neptune = this.indexes.neptune;
        const radius = this.radiuses[neptune] * this.radiusRatio;
        const texture = this.textures[neptune];
        const distance = this.distances[neptune];
        const mesh = this.createMesh('neptune', radius, texture);
        scene.add(mesh);
        mesh.position.setX(distance * this.distanceRatio);
    }

    private addUranus(scene: Scene): void {
        const uranus = this.indexes.uranus;
        const radius = this.radiuses[uranus] * this.radiusRatio;
        const texture = this.textures[uranus];
        const distance = this.distances[uranus];
        const mesh = this.createMesh('uranus', radius, texture);
        scene.add(mesh);
        mesh.position.setX(distance * this.distanceRatio);
    }
    private addSaturn(scene: Scene): void {
        const saturn = this.indexes.saturn;
        const radius = this.radiuses[saturn] * this.radiusRatio;
        const texture = this.textures[saturn];
        const distance = this.distances[saturn];
        const mesh = this.createMesh('saturn', radius, texture);
        scene.add(mesh);
        mesh.position.setX(distance * this.distanceRatio);
    }
    private addJupiter(scene: Scene): void {
        const jupiter = this.indexes.jupiter;
        const radius = this.radiuses[jupiter] * this.radiusRatio;
        const texture = this.textures[jupiter];
        const distance = this.distances[jupiter];
        const mesh = this.createMesh('jupiter', radius, texture);
        scene.add(mesh);
        mesh.position.setX(distance * this.distanceRatio);
    }

    private addMars(scene: Scene): void {
        const mars = this.indexes.mars;
        const radius = this.radiuses[mars] * this.radiusRatio;
        const texture = this.textures[mars];
        const distance = this.distances[mars];
        const mesh = this.createMesh('mars', radius, texture);
        scene.add(mesh);
        mesh.position.setX(distance * this.distanceRatio);
    }
    private addEarth(scene: Scene): void {
        const earth = this.indexes.earth;
        const radius = this.radiuses[earth] * this.radiusRatio;
        const texture = this.textures[earth];
        const distance = this.distances[earth];
        const mesh = this.createMesh('earth', radius, texture);
        scene.add(mesh);
        mesh.position.setX(distance * this.distanceRatio);
    }

    private addVenus(scene: Scene): void {
        const venus = this.indexes.venus;
        const radius = this.radiuses[venus] * this.radiusRatio;
        const texture = this.textures[venus];
        const distance = this.distances[venus];
        const mesh = this.createMesh('venus', radius, texture);
        scene.add(mesh);
        mesh.position.setX(distance * this.distanceRatio);
    }

    private addMercury(scene: Scene): void {
        const mercury = this.indexes.mercury;
        const radius = this.radiuses[mercury] * this.radiusRatio;
        const texture = this.textures[mercury];
        const distance = this.distances[mercury];
        const mesh = this.createMesh('mercury', radius, texture);
        scene.add(mesh);
        mesh.position.setX(distance * this.distanceRatio);
    }

    private addSun(scene: Scene): void {
        const sun = this.indexes.sun;
        const radius = this.radiuses[sun] * this.sunRadiusRatio;
        const texture = this.textures[sun];
        const mesh = this.createMesh('sun', radius, texture);
        scene.add(mesh);
        // const sprite = this.createSunShine(radius);
        // scene.add(sprite);
    }

    private createSunShine(radius: number): Sprite {
        const canvas = document.createElement('canvas');
        const size = 16;
        const half = size / 2;
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Create canvas context error.');
        }
        const gradient = context.createRadialGradient(
            half, half, 0,
            half, half, half
        );
        gradient.addColorStop(0, 'rgba(255,164,33,1)');
        gradient.addColorStop(0.2, 'rgba(255,164,33,1)');
        gradient.addColorStop(0.5, 'rgba(255,164,33,.6)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        const material = new SpriteMaterial({
            map: new CanvasTexture(canvas),
            blending: AdditiveBlending
        });
        const sprite = new Sprite(material);
        const spriteSize = radius * 3;
        sprite.scale.set(spriteSize, spriteSize, spriteSize);
        this.objects.push(sprite);
        return sprite;
    }

    private createMesh(name: string, radius: number, texture: string): Mesh {
        const geometry = new SphereBufferGeometry(
            radius,
            64,
            32
        );
        const material = new MeshBasicMaterial({});
        if (!!texture) {
            material.map = new TextureLoader().load(texture);
        }
        const mesh = new Mesh(geometry, material);
        mesh.name = name;
        this.objects.push(mesh);
        return mesh;
    }

}
