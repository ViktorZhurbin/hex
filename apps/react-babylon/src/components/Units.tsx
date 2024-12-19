import {
	type AbstractMesh,
	type MeshAssetTask,
	Vector3,
} from "@babylonjs/core";
import { hexesById$ } from "@hex/state/src/selectors/map";
import { unitIds$ } from "@hex/state/src/selectors/units";
import { state$ } from "@hex/state/src/state";
import { useEffect, useState } from "react";
import {
	type Task,
	TaskType,
	useAssetManager,
	useScene,
} from "react-babylonjs";

const baseUrl = import.meta.env.PUBLIC_STATIC_ASSETS_PATH;

const modelAssetTasks: Task[] = [
	{
		taskType: TaskType.Mesh,
		rootUrl: `${baseUrl}/models/units/`,
		sceneFilename: "character-male-f.glb",
		name: "maleF",
	},
];

export const Units = () => {
	const [maleF, setMaleF] = useState<AbstractMesh | null>(null);
	const assetManagerResult = useAssetManager(modelAssetTasks);
	const scene = useScene();

	useEffect(() => {
		const assetTask = assetManagerResult.taskNameMap.maleF as MeshAssetTask;

		console.log({ assetTask });

		setMaleF(assetTask.loadedMeshes[0]);
	});

	useEffect(() => {
		if (!maleF) return;

		for (const unitId of unitIds$.get()) {
			console.log("run");
			const hexId = state$.mappings.unitIdToHexId[unitId].get();
			const hex = hexesById$[hexId].get();

			const clone = maleF.clone(unitId.toString(), null);

			if (!clone) return;

			clone.position = new Vector3(hex.x, 0.35, hex.y);
			clone.rotation = new Vector3(0, -Math.PI / 2, 0);
			// clone.scaling = new Vector3(1.73, 1, 1.73);
		}

		maleF.dispose();
	}, [maleF]);

	useEffect(() => {
		if (!scene || !maleF) return;

		const idleAnimation = scene.getAnimationGroupByName("idle");

		idleAnimation?.start(true);
	}, [scene, maleF]);

	return null;
};
