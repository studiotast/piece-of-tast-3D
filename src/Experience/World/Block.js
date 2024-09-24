import * as THREE from "three";
import Experience from "../Experience";

export default class Block {
  constructor(data, index, group) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.group = group; // Add the group reference

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Block");
    }

    // Selecteer de juiste resource op basis van de 'model' eigenschap
    this.resource = this.resources.items[data.name];

    if (!this.resource) {
      console.error(`Geen resource gevonden voor model: ${data.name}`);
      return;
    }

    this.setModel(data);
    this.setAnimation();
  }

  setModel(data) {
    this.model = this.resource.scene.clone();
    this.model.scale.set(1, 1, 1);
    this.model.position.x = data.x;
    this.model.position.z = data.z;
    this.model.rotation.y = data.rotationY;

    // Voeg het model toe aan de groep
    this.group.add(this.model);

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    console.log("model", this.model);
  }

  setAnimation() {}

  update() {}
}
