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

        // Willekeurige rotatiesnelheden instellen tussen 0.0001 en 0.00015
        this.rotationSpeedX = 0.0001 + Math.random() * (0.00015 - 0.0001);
        this.rotationSpeedY = 0.0001 + Math.random() * (0.00015 - 0.0001);
        this.rotationSpeedZ = 0.0001 + Math.random() * (0.00015 - 0.0001);

        // Willekeurige richting instellen (1 of -1)
        this.directionX = Math.random() > 0.5 ? 1 : -1;
        this.directionY = Math.random() > 0.5 ? 1 : -1;
        this.directionZ = Math.random() > 0.5 ? 1 : -1;
    }

    setModel(data, angle) {
        this.model = this.resource.scene.clone();
        this.model.scale.set(1, 1, 1);

        // Distance from center
        const radius = 9.5;
        const x = Math.sin(angle) * radius;
        const y = Math.cos(angle) * radius;

        this.model.position.x = x;
        this.model.position.y = y;

        this.model.lookAt(new THREE.Vector3(0, 0, 0)); // Look towards the center

        // get it to a scale from -0.5 to 0.5 * amplifier
        const randomRotation = (Math.random() - 0.5) * 2;
        this.model.rotation.z = randomRotation;
        this.model.rotation.x = randomRotation;

        // Voeg het model toe aan de groep
        this.group.add(this.model);

        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });
    }

    update() {
        // Pas rotatie toe met richtingfactor
        this.model.rotation.y +=
            this.time.delta * this.rotationSpeedY * this.directionY;
        this.model.rotation.z +=
            this.time.delta * this.rotationSpeedZ * this.directionZ;
        this.model.rotation.x +=
            this.time.delta * this.rotationSpeedX * this.directionX;

        if (this.world.wordStatus === "blocksCarousel") {
            if (this.world.modulo === this.index) {
                this.model.scale.set(1.05, 1.05, 1.05); // active block
            } else if (
                this.world.modulo === this.index + 1 ||
                this.world.modulo === this.index - 1
            ) {
                this.model.scale.set(0.8, 0.8, 0.8); // nearby blocks
            } else {
                this.model.scale.set(0.6, 0.6, 0.6); // farther away blocks
            }
        } else {
            this.model.scale.set(0.75, 0.75, 0.75);
            if (this.world.modulo === this.index) {
                this.model.scale.set(1.25, 1.25, 1.25); // active block
            }
        }
    }
}
