import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("environment");
        }

        this.setSunLight();
        this.setEnvironmentMap();
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 1);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 15;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-0.5, 8, 5);
        this.sunLightHelper = new THREE.DirectionalLightHelper(
            this.sunLight,
            2
        );
        this.scene.add(this.sunLight);
        if (this.debug.active) {
            this.scene.add(this.sunLightHelper);
        }

        // shadow settings
        this.sunLight.shadow.camera.far = 8;

        // Shadow camera helper
        // this.sunLightCameraHelper = new THREE.CameraHelper(
        //   this.sunLight.shadow.camera
        // );
        // sunLightCameraHelper.visible = true;
        // this.scene.add(sunLightCameraHelper);

        // Debug
        if (this.debug.active) {
            this.debugFolder
                .add(this.sunLight, "intensity")
                .name("sunLightIntensity")
                .min(0)
                .max(10)
                .step(0.001);

            this.debugFolder
                .add(this.sunLight.position, "x")
                .name("sunLightX")
                .min(-5)
                .max(5)
                .step(0.001);

            this.debugFolder
                .add(this.sunLight.position, "y")
                .name("sunLightY")
                .min(-5)
                .max(15)
                .step(0.001);

            this.debugFolder
                .add(this.sunLight.position, "z")
                .name("sunLightZ")
                .min(-5)
                .max(5)
                .step(0.001);
        }
        this.debugFolder.close();
    }

    setOfficeEnvMap() {
        this.environmentMap.texture =
            this.resources.items.hdrEnvironmentMapOffice;

        this.environmentMap.texture.mapping =
            THREE.EquirectangularReflectionMapping;

        this.scene.background = null;
        this.scene.environment = this.environmentMap;

        this.environmentMap.updateMaterials();
    }

    setStreetEnvMap() {
        this.environmentMap.texture =
            this.resources.items.hdrEnvironmentMapStreet;

        this.environmentMap.texture.mapping =
            THREE.EquirectangularReflectionMapping;

        this.scene.background = this.environmentMap.texture;
        this.scene.environment = this.environmentMap;

        this.environmentMap.updateMaterials();
    }

    setDiscoEnvMap() {
        this.environmentMap.texture =
            this.resources.items.hdrEnvironmentMapDisco;

        this.environmentMap.texture.mapping =
            THREE.EquirectangularReflectionMapping;

        this.scene.background = this.environmentMap.texture;
        this.scene.environment = this.environmentMap;

        this.environmentMap.updateMaterials();
    }

    setNormalEnvMap() {
        this.environmentMap.texture =
            this.resources.items.hdrEnvironmentMapNormal;

        this.environmentMap.texture.mapping =
            THREE.EquirectangularReflectionMapping;

        this.scene.background = null;
        this.scene.environment = this.environmentMap;

        this.environmentMap.updateMaterials();
    }

    setEnvironmentMap() {
        this.environmentMap = {};
        this.environmentMap.intensity = 0.8;

        // // Normal envmap with images
        // this.environmentMap.texture = this.resources.items.environmentMapTexture;
        // this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace;
        // this.scene.environment = this.environmentMap.texture;

        // HDR RGBE Equirectangular envmap
        this.environmentMap.texture =
            this.resources.items.hdrEnvironmentMapNormal;

        this.environmentMap.texture.mapping =
            THREE.EquirectangularReflectionMapping;

        // this.scene.background = this.environmentMap.texture;
        this.scene.environment = this.environmentMap;

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if (
                    child instanceof THREE.Mesh &&
                    child.material instanceof THREE.MeshStandardMaterial
                ) {
                    child.material.envMap = this.environmentMap.texture;
                    child.material.envMapIntensity =
                        this.environmentMap.intensity;
                    child.material.needsUpdate = true;
                }
            });
        };
        this.environmentMap.updateMaterials();

        // Debug
        if (this.debug.active) {
            this.debugFolder
                .add(this.environmentMap, "intensity")
                .name("envMapIntensity")
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials);
            const debugObject = {
                setNormalEnvMap: () => this.setNormalEnvMap(),
                setDiscoEnvMap: () => this.setDiscoEnvMap(),
                setStreetEnvMap: () => this.setStreetEnvMap(),
                setOfficeEnvMap: () => this.setOfficeEnvMap(),
            };
            this.debugFolder.add(debugObject, "setNormalEnvMap");
            this.debugFolder.add(debugObject, "setDiscoEnvMap");
            this.debugFolder.add(debugObject, "setStreetEnvMap");
            this.debugFolder.add(debugObject, "setOfficeEnvMap");
        }
    }
}
