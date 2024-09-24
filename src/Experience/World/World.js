import Experience from "../Experience.js";
import Environment from "./Environment.js";
import BlocksGroup from "./BlocksGroup.js"; // Import the new Blocks class
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
    this.debug = this.experience.debug;

    this.activeBlockPosition = 0;
    console.log(this.activeBlockPosition);

    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("blocksGroup");
    }

    // Create an instance of Blocks and add the group to the scene
    this.blocksGroup = new BlocksGroup();

    // Wait for resources to setup environment
    this.resources.on("ready", () => {
      this.environment = new Environment();
    });

    // Debug
    if (this.debug.active) {
      const debugObject = {
        increase: () => {
          this.activeBlockPosition = this.activeBlockPosition + 1;
          console.log(this.activeBlockPosition);
        },
        decrease: () => {
          this.activeBlockPosition = this.activeBlockPosition - 1;
          this.blocksGroup.update();
          console.log(this.activeBlockPosition);
        },
      };
      this.debugFolder.add(debugObject, "increase");
      this.debugFolder.add(debugObject, "decrease");
    }
  }

  update() {
    // Update blocks
    if (this.blocksGroup) {
      this.blocksGroup.update();
    }
  }
}
