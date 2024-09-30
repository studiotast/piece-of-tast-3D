import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/assets/script.js", "resources/assets/style.css"],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            "@": "/resources",
        },
    },
});
