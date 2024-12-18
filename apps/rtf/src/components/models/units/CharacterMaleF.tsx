/*
	Auto-generated by: https://github.com/pmndrs/gltfjsx
	Command: npx gltfjsx@6.5.3 public/models/units/character-male-f.glb --output src/components/models/units/CharacterMaleF.tsx --types 
*/

import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import React, { useEffect } from "react";
import type * as THREE from "three";
import { type GLTF, SkeletonUtils } from "three-stdlib";
import { getAssetPath } from "~/utils/getAssetPath";

type ActionName =
	| "static"
	| "idle"
	| "walk"
	| "sprint"
	| "jump"
	| "fall"
	| "crouch"
	| "sit"
	| "drive"
	| "die"
	| "pick-up"
	| "emote-yes"
	| "emote-no"
	| "holding-right"
	| "holding-left"
	| "holding-both"
	| "holding-right-shoot"
	| "holding-left-shoot"
	| "holding-both-shoot"
	| "attack-melee-right"
	| "attack-melee-left"
	| "attack-kick-right"
	| "attack-kick-left"
	| "interact-right"
	| "interact-left"
	| "wheelchair-sit"
	| "wheelchair-look-left"
	| "wheelchair-look-right"
	| "wheelchair-move-forward"
	| "wheelchair-move-back"
	| "wheelchair-move-left"
	| "wheelchair-move-right";

interface GLTFAction extends THREE.AnimationClip {
	name: ActionName;
}

type GLTFResult = GLTF & {
	nodes: {
		"body-mesh": THREE.SkinnedMesh;
		"head-mesh": THREE.SkinnedMesh;
		root: THREE.Bone;
	};
	materials: {
		colormap: THREE.MeshStandardMaterial;
	};
	animations: GLTFAction[];
};

const characterMaleF = getAssetPath("models/units/character-male-f.glb");

export function CharacterMaleF(props: JSX.IntrinsicElements["group"]) {
	const group = React.useRef<THREE.Group>(null);
	const { scene, animations } = useGLTF(characterMaleF);
	const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);

	const { nodes, materials } = useGraph(clone) as GLTFResult;

	const { actions } = useAnimations(animations, group);

	// console.info(actions);

	useEffect(() => {
		actions.idle?.play();
	});

	return (
		<group ref={group} {...props} dispose={null}>
			<group name="character-male-f">
				<group name="character-male-f_1">
					<primitive object={nodes.root} />
					<skinnedMesh
						name="body-mesh"
						geometry={nodes["body-mesh"].geometry}
						material={materials.colormap}
						skeleton={nodes["body-mesh"].skeleton}
					/>
					<skinnedMesh
						name="head-mesh"
						geometry={nodes["head-mesh"].geometry}
						material={materials.colormap}
						skeleton={nodes["head-mesh"].skeleton}
					/>
				</group>
			</group>
		</group>
	);
}

useGLTF.preload(characterMaleF);
