import * as THREE from "three";
import Experience from "../Experience.js";
import World from "./World.js";
export default class Block {
    constructor(data, index, group, angle) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.group = group; // Add the group reference

        this.world = new World();
        this.index = index;

        // Selecteer de juiste resource op basis van de 'model' eigenschap
        this.resource = this.resources.items[data.name];

        if (!this.resource) {
            console.error(`Geen resource gevonden voor model: ${data.name}`);
            return;
        }

        this.setModel(data, angle);
        this.setAnimation();
    }

    setModel(data, angle) {
        this.model = this.resource.scene.clone();
        this.model.scale.set(1, 1, 1);

        // Distance from center
        const radius = 10;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        this.model.position.x = x;
        this.model.position.z = z;

        this.model.lookAt(new THREE.Vector3(0, 0, 0)); // Look towards the center

        // Voeg het model toe aan de groep
        this.group.add(this.model);

        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });
    }

    setAnimation() {}

    update() {
        const relativePosition = Math.abs(
            this.world.currentPosition - this.index
        );

        // Scale based on proximity to active position
        let scale;
        if (relativePosition === 0) {
            this.model.scale.set(1, 1, 1); // active block
        } else if (relativePosition === 1) {
            this.model.scale.set(0.7, 0.7, 0.7); // nearby blocks
        } else {
            this.model.scale.set(0.55, 0.55, 0.55); // farther away blocks
        }
    }
}
