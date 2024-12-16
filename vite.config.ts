import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
	assetsInclude: ["**/*.gltf", "**/*.glb"],

	plugins: [
		react(),
		checker({
			typescript: true,
			overlay: false,
			enableBuild: false,
		}),
	],

	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					react: ["react", "react-dom"],
					"react-three": ["@react-three/drei", "@react-three/fiber"],
					three: ["three"],
				},
			},
		},
	},
});
