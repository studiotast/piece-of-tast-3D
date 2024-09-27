import * as THREE from "three";
import Experience from "../Experience.js";
import World from "./World.js";
import { blocksData } from "../sources.js";
// const { DateTime } = require("luxon");
import { DateTime } from "luxon";

export default class Block {
    constructor(data, index, group, initialAngle) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.group = group;
        this.world = new World();
        this.index = index;
        this.numberOfBlocks = blocksData.length;
        this.resource = this.resources.items[data.name];
        this.initialAngle = initialAngle;
        this.radius = 8;
        this.oneStep = (Math.PI * 2) / this.numberOfBlocks;
        this.previousWorldStatus = this.world.worldStatus;

        if (!this.resource) {
            console.error(`Geen resource gevonden voor model: ${data.name}`);
            return;
        }

        this.createModel();
        this.setInitialValues();
    }

    createModel() {
        this.model = this.resource.scene.clone();
        this.model.scale.set(1, 1, 1);
        this.group.add(this.model);
    }

    setInitialValues() {
        this.setRandomRotationSpeed();
        this.setRandomDirection();
        this.setRandomSpacePositions();
    }

    setRandomRotationSpeed() {
        this.rotationSpeedX = 0.0001 + Math.random() * (0.00015 - 0.0001);
        this.rotationSpeedY = 0.0001 + Math.random() * (0.00015 - 0.0001);
        this.rotationSpeedZ = 0.0001 + Math.random() * (0.00015 - 0.0001);
    }

    setBlockText() {
        const block = blocksData[this.world.modulo];

        let formattedDate = "";
        if (block.client_text_set_at) {
            // Parse the ISO string and format it as desired
            const date = DateTime.fromISO(block.client_text_set_at);
            formattedDate = date.toLocaleString(DateTime.DATE_FULL); // For example: September 15, 2024
        }

        this.world.blockTextElement.innerHTML =
            block.client_text === null
                ? "<p>Dit blokje is nog niet ingevuld</p>"
                : `
                    <p>${block.client_text}</p>
                    <p class='calendar-text'>
                        <i class="fa-solid fa-calendar"></i> 
                        ${formattedDate}
                    </p>
                `;
    }

    setRandomDirection() {
        this.directionX = Math.random() > 0.5 ? 1 : -1;
        this.directionY = Math.random() > 0.5 ? 1 : -1;
        this.directionZ = Math.random() > 0.5 ? 1 : -1;
    }

    setRandomSpacePositions() {
        this.randomX = (Math.random() - 0.5) * 50; // Range: -50 to 50
        this.randomY = -5 + Math.random() * (30 - -5); // Range: -5 to 30
        this.randomZ = -20 + Math.random() * (-100 - -20); // Range: -30 to -80
    }

    placeInSpace() {
        // Lerp de huidige positie naar de target ruimtepositie voor animatie
        this.AnimateModelPosition(this.randomX, this.randomY, this.randomZ);
    }

    placeInCarousel() {
        // Bereken de nieuwe hoek door de huidige hoek (initialAngle) te updaten met het aantal stappen
        const newAngle =
            this.initialAngle - this.world.currentPosition * this.oneStep;
        const targetX = Math.sin(newAngle) * this.radius;
        const targetY = Math.cos(newAngle) * this.radius;
        this.AnimateModelPosition(targetX, targetY, 0);
    }

    getTargetScaleForCarousel() {
        // Bereken het cyclische verschil tussen het huidige blok (this.index) en de actieve (modulo)
        const diff = Math.min(
            Math.abs(this.world.modulo - this.index),
            this.numberOfBlocks - Math.abs(this.world.modulo - this.index)
        );

        // Pas de schaal aan op basis van de cyclische afstand
        if (diff === 0) {
            return 1.1; // Actief blok
        } else if (diff === 1) {
            return 0.7; // Naburig blok (voor/achter)
        } else if (diff === 2) {
            return 0.6; // Tweede blok voor/achter
        } else {
            return 0.5; // Alle andere blokken
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

    // Nieuwe methode om te checken of de wereldstatus is veranderd
    checkWorldStatusChange() {
        if (this.previousWorldStatus !== this.world.worldStatus) {
            this.setRandomSpacePositions();
            this.previousWorldStatus = this.world.worldStatus; // Update de vorige status
        }
    }

    update() {
        this.model.rotation.y +=
            this.time.delta * this.rotationSpeedY * this.directionY;
        this.model.rotation.z +=
            this.time.delta * this.rotationSpeedZ * this.directionZ;
        this.model.rotation.x +=
            this.time.delta * this.rotationSpeedX * this.directionX;

        this.checkWorldStatusChange();
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
                this.setBlockText();
            } else {
                this.placeInSpace();
            }
        }
    }
}
