import Experience from "../Experience.js";
import Environment from "./Environment.js";
import BlocksGroup from "./BlocksGroup.js"; // Import the new Blocks class
import { blocksData } from "../sources.js";

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
        this.worldStatus = "blocksCarousel";

        this.currentPosition = 0;
        this.numberOfBlocks = blocksData.length;

        this.updateModulo();
        this.overlay = document.getElementById("overlay");
        this.overlay.style.display = "none";
        this.setupIconClickListeners();

        // Text variables
        this.rotationTimeout = null;
        this.idleTime = 3000; // 3 seconds of no rotation
        this.textElement = document.getElementById("text");

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
                toggleOverlay: () => {
                    if (this.overlay.style.display === "block") {
                        this.overlay.style.display = "none";
                    } else {
                        this.overlay.style.display = "block";
                    }
                },
                switchWorldStatus: () => this.switchWorldStatus(),
            };
            this.debugFolder.add(debugObject, "increase");
            this.debugFolder.add(debugObject, "decrease");
            this.debugFolder.add(debugObject, "toggleOverlay");
            this.debugFolder.add(debugObject, "switchWorldStatus");
        }
    }

    setupIconClickListeners() {
        // Home icon click listener
        const homeIcon = document.getElementById("home-icon");
        homeIcon.addEventListener("click", () => {
            // Refresh page
            location.reload();

            // // Reset all states
            // this.worldStatus = "blocksCarousel";
            // this.currentPosition = 0;
            // this.updateModulo();
        });

        // Angle icon click listener
        const angleIcon = document.getElementById("angle-icon");
        angleIcon.addEventListener("click", () => {
            console.log("Angle icon clicked");
        });
    }

    // Update the modulo and the displayed number
    updateModulo() {
        this.modulo =
            this.currentPosition < 0
                ? ((this.currentPosition % this.numberOfBlocks) +
                      this.numberOfBlocks) %
                  this.numberOfBlocks
                : this.currentPosition % this.numberOfBlocks;

        // Update the displayed modulo number
        document.getElementById("block-number").textContent = `#${
            blocksData[this.modulo].number
        }`;
    }

    /*
     * Text functions
     */
    handleText() {
        // Clear any previous timeout to prevent the fade-in
        clearTimeout(this.rotationTimeout);

        // Hide the text when rotating
        this.hideText();

        // Set a new timeout to show the text only if worldStatus is still 'blocksCarousel'
        this.rotationTimeout = setTimeout(() => {
            if (this.worldStatus === "blocksCarousel") {
                this.showText();
            } else {
                this.hideText(); // Ensure the text stays hidden if worldStatus changes
            }
        }, this.idleTime);
    }

    increase() {
        this.currentPosition = this.currentPosition + 1;
        this.updateModulo();
        this.handleText();
    }
    decrease() {
        this.currentPosition = this.currentPosition - 1;
        this.updateModulo();
        this.handleText();
    }
    switchWorldStatus() {
        const circleElement = document.getElementById("circle");

        if (this.worldStatus === "blocksCarousel") {
            this.worldStatus = "space";
            this.hideText(); // Verberg de tekst meteen als de wereld naar 'space' gaat
            circleElement.classList.add("active"); // Voeg de 'active' class toe aan circle
        } else if (this.worldStatus === "space") {
            this.worldStatus = "blocksCarousel";
            this.handleText();
            circleElement.classList.remove("active"); // Verwijder de 'active' class van circle
        }
    }

    showText() {
        this.textElement.classList.add("visible");
    }

    hideText() {
        this.textElement.classList.remove("visible");
    }

    update() {
        // Update blocks
        if (this.blocksGroup) {
            this.blocksGroup.update();
        }
    }
}
