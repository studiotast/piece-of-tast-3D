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
        this.group = group;
        this.world = new World();
        this.index = index;
        this.numberOfBlocks = blocksData.length;
        this.resource = this.resources.items[data.name];
        this.angle = angle;
        this.randomRotation = (Math.random() - 0.5) * 2;

        // Sla de vorige wereldstatus op
        this.previousWorldStatus = this.world.worldStatus;

        if (!this.resource) {
            console.error(`Geen resource gevonden voor model: ${data.name}`);
            return;
        }

        this.setModel(data);
        this.setRandomRotationSpeed();
        this.setRandomDirection();
        this.setRandomSpacePosition();
    }

    setRandomRotationSpeed() {
        this.rotationSpeedX = 0.0001 + Math.random() * (0.00015 - 0.0001);
        this.rotationSpeedY = 0.0001 + Math.random() * (0.00015 - 0.0001);
        this.rotationSpeedZ = 0.0001 + Math.random() * (0.00015 - 0.0001);
    }

    setRandomDirection() {
        this.directionX = Math.random() > 0.5 ? 1 : -1;
        this.directionY = Math.random() > 0.5 ? 1 : -1;
        this.directionZ = Math.random() > 0.5 ? 1 : -1;
    }

    setRandomSpacePosition() {
        this.randomX = (Math.random() - 0.5) * 40; // Range: -40 to 40
        this.randomY = Math.random() * 40; // Range: -40 to 40
        this.randomZ = Math.random() * -40; // Range: 0 to 40
    }

    placeInSpace() {
        // Lerp de huidige positie naar de target ruimtepositie voor animatie
        this.model.position.x = THREE.MathUtils.lerp(
            this.model.position.x,
            this.randomX,
            0.1
        );
        this.model.position.y = THREE.MathUtils.lerp(
            this.model.position.y,
            this.randomY,
            0.1
        );
        this.model.position.z = THREE.MathUtils.lerp(
            this.model.position.z,
            this.randomZ,
            0.1
        );
    }

    setModel(data) {
        this.model = this.resource.scene.clone();
        this.model.scale.set(1, 1, 1);
        this.setModelPosition();
        this.setModelRotation();
        this.group.add(this.model);
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
            }
        });
    }

    setModelPosition() {
        const radius = 9.5;
        const x = Math.sin(this.angle) * radius;
        const y = Math.cos(this.angle) * radius;
        this.model.position.set(x, y, 0);
        this.model.lookAt(new THREE.Vector3(0, 0, 0));
    }

    setModelRotation() {
        this.model.rotation.set(this.randomRotation, 0, this.randomRotation);
    }

    placeInCarousel() {
        const radius = 9.5;
        const targetX = Math.sin(this.angle) * radius;
        const targetY = Math.cos(this.angle) * radius;

        // Lerp de huidige positie naar de target positie voor animatie
        this.model.position.x = THREE.MathUtils.lerp(
            this.model.position.x,
            targetX,
            0.1
        );
        this.model.position.y = THREE.MathUtils.lerp(
            this.model.position.y,
            targetY,
            0.1
        );
        this.model.position.z = THREE.MathUtils.lerp(
            this.model.position.z,
            0,
            0.1
        ); // Z blijft 0 voor de carousel

        // Zorg dat het blok naar het centrum blijft kijken
        this.model.lookAt(new THREE.Vector3(0, 0, 0));
        this.setModelRotation();
    }

    getTargetScaleForCarousel() {
        if (this.world.modulo === this.index) {
            return 1.1;
        } else if (
            this.world.modulo === this.index + 1 ||
            this.world.modulo === this.index - 1
        ) {
            return 0.8;
        } else {
            return 0.6;
        }
    }

    lerpModelScale(targetScale, lerpFactor = 0.1) {
        this.model.scale.x = THREE.MathUtils.lerp(
            this.model.scale.x,
            targetScale,
            lerpFactor
        );
        this.model.scale.y = THREE.MathUtils.lerp(
            this.model.scale.y,
            targetScale,
            lerpFactor
        );
        this.model.scale.z = THREE.MathUtils.lerp(
            this.model.scale.z,
            targetScale,
            lerpFactor
        );
    }

    update() {
        this.model.rotation.y +=
            this.time.delta * this.rotationSpeedY * this.directionY;
        this.model.rotation.z +=
            this.time.delta * this.rotationSpeedZ * this.directionZ;
        this.model.rotation.x +=
            this.time.delta * this.rotationSpeedX * this.directionX;

        if (this.world.worldStatus === "blocksCarousel") {
            const targetScale = this.getTargetScaleForCarousel();
            this.lerpModelScale(targetScale);
            this.placeInCarousel(); // Roep de animatie voor de carousel aan
        } else {
            const targetScale = this.world.modulo === this.index ? 1.5 : 0.75;
            this.lerpModelScale(targetScale);

            if (this.world.modulo === this.index) {
                // Lerp positie naar (0, 0, 0) wanneer de blok de actieve is
                this.model.position.x = THREE.MathUtils.lerp(
                    this.model.position.x,
                    0,
                    0.1
                );
                this.model.position.y = THREE.MathUtils.lerp(
                    this.model.position.y,
                    12,
                    0.1
                );
                this.model.position.z = THREE.MathUtils.lerp(
                    this.model.position.z,
                    0,
                    0.1
                );
            } else {
                this.placeInSpace(); // Roep de animatie voor ruimtepositie aan
            }
        }
    }
}
