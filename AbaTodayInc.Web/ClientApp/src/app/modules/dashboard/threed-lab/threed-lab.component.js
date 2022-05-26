"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreedLabComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var ThreedLabComponent = /** @class */ (function () {
    function ThreedLabComponent() {
    }
    ThreedLabComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initScene();
        window.addEventListener("resize", function () {
            if (_this.camera) {
                _this.camera.aspect = _this.getClientWidth() / _this.getClientHeight();
                _this.camera.updateProjectionMatrix();
                _this.renderer.setSize(_this.getClientWidth(), _this.getClientHeight());
            }
        });
        var animate = function () {
            requestAnimationFrame(animate);
            //this.cube.rotation.x += 0.005;
            //this.cube.rotation.y += 0.005;
            _this.controls.update();
            _this.renderer.render(_this.scene, _this.camera);
        };
        animate();
    };
    ThreedLabComponent.prototype.getClientWidth = function () {
        var element = document.getElementsByClassName("layout-content")[0];
        if (element) {
            return element.clientWidth - 56;
        }
        else {
            return 1024;
        }
    };
    ThreedLabComponent.prototype.getClientHeight = function () {
        return window.innerHeight - 340;
    };
    ThreedLabComponent.prototype.initScene = function () {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera.position.z = 2;
        this.renderer.setSize(this.getClientWidth(), this.getClientHeight());
        document.getElementById("threeScene").appendChild(this.renderer.domElement);
        this.controls = new OrbitControls_1.OrbitControls(this.camera, this.renderer.domElement);
        //this.camera.position.set(0, 20, 100);
        this.controls.update();
        /*
         * This method takes five constructor parameters: the first is the width of the sides of the cube on the X axis,
         * the second is height of sides of the cube on the Y axis, and the third is the depth of the sides of the cube on Z axis.
         * The last three optional parameters, whose default value is 1, are the number of segmented faces along the
         * width, height, and depth of the sides respectively
         */
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        /*
        * To add a texture (image) to the cube
        */
        var texture = new THREE.TextureLoader().load("assets/square-texture.jpg");
        var material = new THREE.MeshBasicMaterial({ map: texture });
        //const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
        //const material = new THREE.MeshBasicMaterial({ color: 0x0fffff, wireframe: true });
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);
    };
    ThreedLabComponent = __decorate([
        core_1.Component({
            selector: "app-threed-lab",
            templateUrl: "./threed-lab.component.html",
            styleUrls: ["./threed-lab.component.css"]
        })
    ], ThreedLabComponent);
    return ThreedLabComponent;
}());
exports.ThreedLabComponent = ThreedLabComponent;
//# sourceMappingURL=threed-lab.component.js.map