/// <reference types="vite/client" />

declare module "*.gltf" {
	const content: string;
	export default content;
}
declare module "*.glb" {
	const content: string;
	export default content;
}
