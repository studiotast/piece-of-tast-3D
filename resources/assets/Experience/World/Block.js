import * as THREE from "three";
import Experience from "../Experience.js";
import World from "./World.js";
import blocksData from "./data/blocksData.js";
export default class Block {
    constructor(data, index, group, angle) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.group = group; // Add the group reference

        this.world = new World();

        this.numberOfBlocks = blocksData.length;
        this.index = index;

        // Selecteer de juiste resource op basis van de 'model' eigenschap
        this.resource = this.resources.items[data.name];

        if (!this.resource) {
            console.error(`Geen resource gevonden voor model: ${data.name}`);
            return;
        }

        this.setModel(data, angle);
    }

    setModel(data, angle) {
        this.model = this.resource.scene.clone();
        this.model.scale.set(1, 1, 1);

        // Distance from center
        const radius = 10;
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius;

        this.model.position.x = x;
        this.model.position.y = y;

        this.model.lookAt(new THREE.Vector3(0, 0, 0)); // Look towards the center

        // Voeg het model toe aan de groep
        this.group.add(this.model);

        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });
    }

    update() {
        if (this.world.modulo === this.index) {
            this.model.scale.set(1, 1, 1); // active block
        } else if (
            this.world.modulo === this.index + 1 ||
            this.world.modulo === this.index - 1
        ) {
            this.model.scale.set(0.7, 0.7, 0.7); // nearby blocks
        } else {
            this.model.scale.set(0.55, 0.55, 0.55); // farther away blocks
        }
    }
}
