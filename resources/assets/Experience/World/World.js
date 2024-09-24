import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Block from "./Block.js";
import * as THREE from "three";
import blocksData from "./data/blocksData.js";

let instance = null;
export default class World {
  constructor() {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Setup
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Create a Three.js group for blocks
    this.blocksGroup = new THREE.Group();
    this.scene.add(this.blocksGroup); // Add the group to the scene

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      blocksData.forEach((blockData, index) => {
        new Block(blockData, index, this.blocksGroup); // Pass the group to each block
      });

      this.environment = new Environment();
    });
  }

  update() {
    if (this.blocksGroup) {
      this.blocksGroup.children.forEach((block) => {
        if (block.update) block.update();
      });
    }
  }
}
