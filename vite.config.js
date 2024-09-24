import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: [
                "resources/assets/script.js",
                "resources/assets/style.css",
                "resources/assets/static",
            ],
            refresh: true,
        }),
    ],
    server: {
        host: "piece-of-tast-3d.test",
        port: 5173,
    },
    build: {
        outDir: "public",
    },
    resolve: {
        alias: {
            "@": "/resources",
        },
    },
});
