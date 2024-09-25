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
        this.radius = 8;

        if (!this.resource) {
            console.error(`Geen resource gevonden voor model: ${data.name}`);
            return;
        }

        this.setModel();
        this.setInitialValues();
    }

    setInitialValues() {
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
        this.randomY = -5 + Math.random() * (25 - -5); // Range: -5 to 25
        this.randomZ = -20 + Math.random() * (-40 - -20); // Range: -20 to -40
    }

    placeInSpace() {
        // Lerp de huidige positie naar de target ruimtepositie voor animatie
        this.AnimateModelPosition(this.randomX, this.randomY, this.randomZ);
    }

    setModel() {
        this.model = this.resource.scene.clone();
        this.model.scale.set(1, 1, 1);
        this.setModelPosition();
        this.group.add(this.model);
    }

    setModelPosition() {
        const x = Math.sin(this.angle) * this.radius;
        const y = Math.cos(this.angle) * this.radius;
        this.model.position.set(x, y, 0);
    }

    placeInCarousel() {
        const targetX = Math.sin(this.angle) * this.radius;
        const targetY = Math.cos(this.angle) * this.radius;
        this.AnimateModelPosition(targetX, targetY, 0);
    }

    getTargetScaleForCarousel() {
        if (this.world.modulo === this.index) {
            return 1.1;
        } else if (
            this.world.modulo === this.index + 1 ||
            this.world.modulo === this.index - 1
        ) {
            return 0.7;
        } else if (
            this.world.modulo === this.index + 2 ||
            this.world.modulo === this.index - 2
        ) {
            return 0.6;
        } else {
            return 0.5;
        }
    }

    animateModelScale(targetScale, lerpFactor = 0.1) {
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

    AnimateModelPosition(targetX, targetY, targetZ) {
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
            targetZ,
            0.1
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
            this.animateModelScale(targetScale);
            this.placeInCarousel();
        } else if (this.world.worldStatus === "space") {
            const targetScale = this.world.modulo === this.index ? 1.5 : 0.75;
            this.animateModelScale(targetScale);

            // If index is active place in center else place in space
            if (this.world.modulo === this.index) {
                this.AnimateModelPosition(0, 10, 0);
            } else {
                this.placeInSpace();
            }
        }
    }
}
