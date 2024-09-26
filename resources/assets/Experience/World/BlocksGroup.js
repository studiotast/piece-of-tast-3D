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

        // this.updateAngle();

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

    // updateAngle() {
    //     // Inverteer de positie
    //     this.activeBlockAngle =
    //         ((Math.PI * 2) / this.numberOfBlocks) * this.world.currentPosition;
    // }

    update() {
        if (this.blocksGroup) {
            // this.updateAngle();

            // if (this.world.worldStatus === "space") {
            //     // Interpoleer naar rotatie 0 als de wereldstatus 'space' is
            //     this.blocksGroup.rotation.z = THREE.MathUtils.lerp(
            //         this.blocksGroup.rotation.z,
            //         0, // Doelrotatie naar 0
            //         0.1 // Interpolatiesnelheid
            //     );
            // } else {
            //     // Ga terug naar de normale actieve hoekrotatie wanneer niet in 'space'
            //     this.blocksGroup.rotation.z = THREE.MathUtils.lerp(
            //         this.blocksGroup.rotation.z,
            //         this.activeBlockAngle, // Terug naar de originele rotatie
            //         0.1 // Interpolatiesnelheid
            //     );
            // }

            // Update elke blok (met de Block-instanties)
            this.blocks.forEach((block) => {
                block.update(); // Roep update aan op elke Block-instantie
            });
        }
    }
}
