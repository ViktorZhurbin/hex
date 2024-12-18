/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
	readonly PUBLIC_STATIC_ASSETS_PATH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module "*.glb" {
	const content: string;
	export default content;
}
