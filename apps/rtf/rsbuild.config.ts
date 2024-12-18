import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginTypeCheck } from "@rsbuild/plugin-type-check";
import path from "node:path";

export default defineConfig({
	plugins: [pluginReact(), pluginTypeCheck()],

	server: {
		port: 5173,
	},

	html: {
		template: "./static/index.html",
	},
	source: {
		entry: {
			index: "./src/main.tsx",
		},

		assetsInclude: /\.(glb)$/,
	},

	output: {
		copy: [
			{
				from: path.resolve("../../libs/assets/src"),
				to: import.meta.env.PUBLIC_STATIC_ASSETS_PATH,
			},
		],
	},
});
