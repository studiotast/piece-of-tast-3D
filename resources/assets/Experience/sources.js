export default [
    {
        name: "environmentMapTexture",
        type: "cubeTexture",
        path: [
            "static/textures/environmentMap/px.jpg",
            "static/textures/environmentMap/nx.jpg",
            "static/textures/environmentMap/py.jpg",
            "static/textures/environmentMap/ny.jpg",
            "static/textures/environmentMap/pz.jpg",
            "static/textures/environmentMap/nz.jpg",
        ],
    },
    {
        name: "hdrEnvironmentMapDisco",
        type: "hdrEnvMap",
        path: "static/textures/environmentMap/blender-2k-2.hdr",
    },
    {
        name: "hdrEnvironmentMapNormal",
        type: "hdrEnvMap",
        path: "static/textures/environmentMap/blender-2k.hdr",
    },
    {
        name: "hdrEnvironmentMapStreet",
        type: "hdrEnvMap",
        path: "static/textures/environmentMap/2k.hdr",
    },
    {
        name: "hdrEnvironmentMapOffice",
        type: "hdrEnvMap",
        path: "static/textures/environmentMap/2k-studio.hdr",
    },
    {
        name: "laminateColorTexture",
        type: "texture",
        path: "static/textures/laminate/Poliigon_WoodFloorAsh_4186_BaseColor.jpg",
    },
    {
        name: "laminateNormalTexture",
        type: "texture",
        path: "static/textures/laminate/Poliigon_WoodFloorAsh_4186_Normal.jpg",
    },
    {
        name: "laminateAmbientOcclusionTexture",
        type: "texture",
        path: "static/textures/laminate/Poliigon_WoodFloorAsh_4186_AmbientOcclusion.jpg",
    },
    {
        name: "laminateRoughnessTexture",
        type: "texture",
        path: "static/textures/laminate/Poliigon_WoodFloorAsh_4186_Roughness.jpg",
    },
    {
        name: "block1",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 1.glb",
    },
    {
        name: "block2",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 2.glb",
    },
    {
        name: "block3",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 3.glb",
    },
    {
        name: "block4",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 4.glb",
    },
    {
        name: "block5",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 5.glb",
    },
    {
        name: "block6",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 6.glb",
    },
    {
        name: "block7",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 7.glb",
    },
    {
        name: "block8",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 8.glb",
    },
    {
        name: "block9",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 9.glb",
    },
    {
        name: "block10",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 10.glb",
    },
    {
        name: "block11",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 11.glb",
    },
    {
        name: "block12",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 12.glb",
    },
    {
        name: "block13",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 13.glb",
    },
    {
        name: "block14",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 14.glb",
    },
    {
        name: "block15",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 15.glb",
    },
    {
        name: "block16",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 16.glb",
    },
    {
        name: "block17",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 17.glb",
    },
    {
        name: "block18",
        type: "gltfModel",
        path: "static/models/Blocks/Blokje 18.glb",
    },
];

async function fetchBlocks() {
    try {
        const response = await fetch("http://piece-of-tast-3d.test/api/models");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const blocks = await response.json();
        // blocks.forEach((block, index) => {
        //     sources.push({
        //         name: `block${index + 1}`,
        //         type: "gltfModel",
        //         path: block.path,
        //     });
        // });
        console.log("Blocks fetched:", blocks);
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

// Call the function to fetch blocks and update the sources array
fetchBlocks();
