import Experience from "../Experience.js";
import Environment from "./Environment.js";
import BlocksGroup from "./BlocksGroup.js";
import { blocksData } from "../sources.js";

let instance = null;

const deviceURL = "http://192.168.1.217";
const gyroDiff = 0.2;
export default class World {
    constructor() {
        // Singleton
        if (instance) {
            return instance;
        }
        instance = this;

        // Experience and world variables
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;
        this.worldStatus = "blocksCarousel";

        // Variables
        this.currentPosition = 0;
        this.numberOfBlocks = blocksData.length;
        this.gyro = {};
        this.lastZGyro = 0;

        // Text variables
        this.rotationTimeout = null;
        this.idleTime = 3000; // 3 seconds of no rotation

        // HTML Elements
        this.textElement = document.getElementById("text");
        this.blockTextElement = document.getElementById("block-text");
        this.circleElement = document.getElementById("circle");
        this.blockNumberElement = document.getElementById("block-number");
        this.homeIconElement = document.getElementById("home-icon");
        this.resetIconElement = document.getElementById("angle-icon");

        // Setup functions
        this.updateModulo();
        this.overlay = document.getElementById("overlay");
        this.overlay.style.display = "none";
        this.setupIconClickListeners();

        //Connect to Controller
        this.eventSource = new EventSource(`${deviceURL}/events`);

        fetch(`${deviceURL}/enableSensors`);

        this.eventSource.onmessage = (e) => {
            console.log(e);
        };

        this.eventSource.addEventListener("accelerometer_readings", (e) => {
            if (this.worldStatus == "space") {
                let data = JSON.parse(e.data);
                let combinedResult = Math.sqrt(
                    Math.pow(data.accX, 2) +
                        Math.pow(data.accY, 2) +
                        Math.pow(data.accZ, 2)
                );
                if (combinedResult > 13 || combinedResult < 7) {
                    this.blockShaked();
                }
            }
        });

        this.eventSource.addEventListener("device_status", (e) => {
            let data = JSON.parse(e.data);
            if (!data.onDevice) {
                this.worldStatus = "space";
                this.textElement.classList.remove("visible");
                this.circleElement.classList.add("active");
            } else {
                this.worldStatus = "blocksCarousel";
                this.handleText();
                this.circleElement.classList.remove("active");
                this.circleElement.classList.remove("hidden");
                this.blockTextElement.classList.remove("visible");
            }
        });

        this.eventSource.addEventListener("gyro_readings", (e) => {
            let gyro = JSON.parse(e.data);
            this.gyro = gyro;

            if (this.worldStatus === "blocksCarousel") {
                if (gyro && gyro.gyroZ) {
                    if (gyro.gyroZ - this.lastZGyro > gyroDiff) {
                        this.increase();
                        fetch(`${deviceURL}/handleRotation`)
                            .then(() => {})
                            .catch((error) => {
                                console.error(error);
                            });
                        this.lastZGyro = gyro.gyroZ;
                    } else if (
                        Math.abs(gyro.gyroZ - this.lastZGyro) > gyroDiff
                    ) {
                        this.decrease();
                        fetch(`${deviceURL}/handleRotation`)
                            .then(() => {})
                            .catch((error) => {
                                console.error(error);
                            });
                        this.lastZGyro = gyro.gyroZ;
                    }
                }
            }
        });

        // Create an instance of Blocks and add the group to the scene
        this.blocksGroup = new BlocksGroup();

        // Wait for resources to setup environment
        this.resources.on("ready", () => {
            this.environment = new Environment();
        });

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("blocksGroup");
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
                blockShaked: () => this.blockShaked(),
                switchWorldStatus: () => this.switchWorldStatus(),
            };
            this.debugFolder.add(debugObject, "increase");
            this.debugFolder.add(debugObject, "decrease");
            this.debugFolder.add(debugObject, "toggleOverlay");
            this.debugFolder.add(debugObject, "blockShaked");
            this.debugFolder.add(debugObject, "switchWorldStatus");
        }
    }

    setupIconClickListeners() {
        // Home icon click listener
        this.homeIconElement.addEventListener("click", () => {
            // Refresh page
            location.reload();

            // // Reset all states
            // this.worldStatus = "blocksCarousel";
            // this.currentPosition = 0;
            // this.updateModulo();
        });

        // Angle icon click listener
        this.resetIconElement.addEventListener("click", () => {
            fetch(`${deviceURL}/reset`);
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

        // Update the displayed block number
        this.blockNumberElement.textContent = `#${
            blocksData[this.modulo].number
        }`;
    }

    handleText() {
        // Clear any previous timeout to prevent the fade-in
        clearTimeout(this.rotationTimeout);

        // Hide the text when rotating
        this.textElement.classList.remove("visible");

        // Set a new timeout to show the text only if worldStatus is still 'blocksCarousel'
        this.rotationTimeout = setTimeout(() => {
            if (this.worldStatus === "blocksCarousel") {
                this.textElement.classList.add("visible");
            } else {
                this.textElement.classList.remove("visible"); // Ensure the text stays hidden if worldStatus changes
            }
        }, this.idleTime);
    }

    increase() {
        console.log("increase", this.currentPosition);
        this.currentPosition = this.currentPosition + 1;
        this.updateModulo();
        this.handleText();
    }
    decrease() {
        console.log("decrease", this.currentPosition);
        this.currentPosition = this.currentPosition - 1;
        this.updateModulo();
        this.handleText();
    }

    switchWorldStatus() {
        if (this.worldStatus === "blocksCarousel") {
            this.worldStatus = "space";
            this.textElement.classList.remove("visible");
            this.circleElement.classList.add("active");
        } else if (this.worldStatus === "space") {
            this.worldStatus = "blocksCarousel";
            this.handleText();
            this.circleElement.classList.remove("active");
            this.circleElement.classList.remove("hidden");
            this.blockTextElement.classList.remove("visible");
        }
    }

    blockShaked() {
        this.blockTextElement.classList.add("visible");
        this.circleElement.classList.add("hidden");
        this.circleElement.classList.remove("active");
        setTimeout(() => {
            if (this.worldStatus === "space") {
                this.blockTextElement.classList.remove("visible");
                this.circleElement.classList.add("active");
                this.circleElement.classList.remove("hidden");
            }
        }, 10000); // Pas deze waarde aan om de zichtbaarheid te regelen (hier 10 seconden)
    }

    update() {
        if (this.blocksGroup) {
            this.blocksGroup.update();
        }
    }
}
