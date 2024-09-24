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

        this.currentPosition = 1;
        this.numberOfBlocks = blocksData.length;

        this.getModulo();

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
                increase: () => this.increase(),
                decrease: () => this.decrease(),
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

    getModulo() {
        this.modulo =
            this.currentPosition < 0
                ? ((this.currentPosition % this.numberOfBlocks) +
                      this.numberOfBlocks) %
                  this.numberOfBlocks
                : this.currentPosition % this.numberOfBlocks;
    }

    increase() {
        this.currentPosition = this.currentPosition + 1;
        console.log(this.currentPosition);
        this.getModulo();
    }
    decrease() {
        this.currentPosition = this.currentPosition - 1;
        console.log(this.currentPosition);
        this.getModulo();
    }
}