import * as THREE from "three";
import Experience from "./Experience.js";

export default class RayCaster {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setMouse();
  }

  setInstance() {
    this.instance = new THREE.Raycaster();
    this.currentIntersect = null;
  }

  setMouse() {
    this.mouse = new THREE.Vector2();
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = -(event.clientY / this.sizes.height) * 2 + 1;
    });
  }

  update() {
    if (this.mouse && this.camera) {
      this.instance.setFromCamera(this.mouse, this.camera.instance);
    }
  }
}
