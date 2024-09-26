import * as THREE from "three";
import Block from "./Block.js";
import { blocksData } from "../sources.js";
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

        this.setModel();
    }

    setModel() {
        // Create a Three.js group for blocks
        this.blocksGroup = new THREE.Group();

        // Wait for resources
        this.resources.on("ready", () => {
            // Setup blocks

            blocksData.forEach((blockData, index) => {
                const initialAngle =
                    ((Math.PI * 2) / blocksData.length) * index;
                const block = new Block(
                    blockData,
                    index,
                    this.blocksGroup,
                    initialAngle
                ); // Create Block instance
                this.blocks.push(block); // Store Block instance in the array
            });
        });
        this.blocksGroup.position.y = -7.5;
        this.scene.add(this.blocksGroup);
    }

    update() {
        if (this.blocksGroup) {
            // Update elke blok (met de Block-instanties)
            this.blocks.forEach((block) => {
                block.update(); // Roep update aan op elke Block-instantie
            });
        }
    }
}
