import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import solidLabels from "vite-plugin-solid-labels";

export default defineConfig({
  plugins: [
    solidLabels({
      filter: {
        include: "src/**/*.{ts,tsx}",
        exclude: "node_modules/**/*.{ts,js,tsx,jsx}",
      },
    }),
    devtools({
      autoname: true,
      locator: {
        targetIDE: "vscode",
        key: "Cmd",
        jsxLocation: true,
        componentLocation: true,
      },
    }),
    solid(),
  ],
});
