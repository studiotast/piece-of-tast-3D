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
];
