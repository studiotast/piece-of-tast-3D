let blocksData = [];

let sources = [
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
];

async function fetchBlocks() {
    try {
        const response = await fetch(
            "https://stukje.tast.studio/api/blocks/3d"
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const blocks = await response.json();
        blocks.forEach((block, index) => {
            const object = {
                name: block.name,
                number: block.number,
                type: "gltfModel",
                path: `https://stukje.tast.studio/storage/${block["3D_model"]}`,
            };

            sources.push(object);
            blocksData.push(object);
        });
        console.log("Blocks fetched:", blocks);
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
}

// // Call the function to fetch blocks and update the sources array
// fetchBlocks();

export { blocksData, sources, fetchBlocks };
