import * as THREE from "three";
import Block from "./Block.js";
import blocksData from "./data/blocksData.js";
import Experience from "../Experience.js";
import World from "./World.js";

export default class BlocksGroup {
    constructor() {
        this.experience = new Experience();
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.scene = this.experience.scene;

        this.world = new World();
        this.currentPosition = this.world.currentPosition;
        this.blocks = []; // Array to hold Block instances

        this.numberOfBlocks = blocksData.length;
        this.oneStep = (Math.PI * 2) / this.numberOfBlocks;

        this.updateAngle();

        this.setModel();
    }

    setModel() {
        // Create a Three.js group for blocks
        this.blocksGroup = new THREE.Group();

        // Wait for resources
        this.resources.on("ready", () => {
            // Setup blocks
            blocksData.forEach((blockData, index) => {
                const angle = ((Math.PI * 2) / blocksData.length) * index;
                const block = new Block(
                    blockData,
                    index,
                    this.blocksGroup,
                    angle
                ); // Create Block instance
                this.blocks.push(block); // Store Block instance in the array
            });
        });
        this.blocksGroup.position.z = -10;
        this.scene.add(this.blocksGroup);
    }

    updateAngle() {
        // Inverteer de positie
        this.activeBlockAngle =
            -((Math.PI * 2) / this.numberOfBlocks) * this.world.currentPosition;
    }

    update() {
        if (this.blocksGroup) {
            this.updateAngle();

            // Gebruik linear interpolation (lerp) om de rotatie soepel te animeren
            this.blocksGroup.rotation.y = THREE.MathUtils.lerp(
                this.blocksGroup.rotation.y,
                this.activeBlockAngle,
                0.1 // Interpolatie snelheid (0.1 is een goede start, je kunt dit aanpassen)
            );

            // Update each block (now using the Block instances)
            this.blocks.forEach((block) => {
                block.update(); // Call update on each Block instance
            });
        }
    }
}
