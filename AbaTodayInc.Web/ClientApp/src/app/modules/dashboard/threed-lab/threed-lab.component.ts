import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

@Component({
    selector: "app-threed-lab",
    templateUrl: "./threed-lab.component.html",
    styleUrls: ["./threed-lab.component.css"]
})
export class ThreedLabComponent implements OnInit {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cube: THREE.Mesh;
    controls: OrbitControls;

    constructor() { }

    ngOnInit(): void {
        this.initScene();
        window.addEventListener("resize", () => {
            if (this.camera) {
                this.camera.aspect = this.getClientWidth() / this.getClientHeight();
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.getClientWidth(), this.getClientHeight());
            }
        });

        var animate = () => {
            requestAnimationFrame(animate);

            //this.cube.rotation.x += 0.005;
            //this.cube.rotation.y += 0.005;

            this.controls.update();

            this.renderer.render(this.scene, this.camera);
        };

        animate();
    }

    private getClientWidth(): number {
        const element = document.getElementsByClassName("layout-content")[0];
        if (element) {
            return element.clientWidth - 56;
        } else {
            return 1024;
        }
    }

    private getClientHeight(): number {
        return window.innerHeight - 340;
    }

    private initScene() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera.position.z = 2;

        this.renderer.setSize(this.getClientWidth(), this.getClientHeight());
        document.getElementById("threeScene").appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        //this.camera.position.set(0, 20, 100);
        this.controls.update();

        /*
         * This method takes five constructor parameters: the first is the width of the sides of the cube on the X axis,
         * the second is height of sides of the cube on the Y axis, and the third is the depth of the sides of the cube on Z axis.
         * The last three optional parameters, whose default value is 1, are the number of segmented faces along the
         * width, height, and depth of the sides respectively
         */
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        /*
        * To add a texture (image) to the cube
        */
        const texture = new THREE.TextureLoader().load("assets/square-texture.jpg");
        const material = new THREE.MeshBasicMaterial({ map: texture });

        //const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
        //const material = new THREE.MeshBasicMaterial({ color: 0x0fffff, wireframe: true });

        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    }
}
