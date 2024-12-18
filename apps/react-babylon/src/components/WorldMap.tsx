import {
	type AbstractMesh,
	type MeshAssetTask,
	Vector3,
} from "@babylonjs/core";
import { mapHexes$ } from "@hex/state/src/selectors/map";
import { useEffect, useState } from "react";
import { type Task, TaskType, useAssetManager } from "react-babylonjs";

const baseUrl = import.meta.env.PUBLIC_STATIC_ASSETS_PATH;

const modelAssetTasks: Task[] = [
	{
		taskType: TaskType.Mesh,
		rootUrl: `${baseUrl}/models/hex/`,
		sceneFilename: "grass.glb",
		name: "grass",
	},
];

export const WorldMap = () => {
	const [grass, setGrass] = useState<AbstractMesh | null>(null);
	const assetManagerResult = useAssetManager(modelAssetTasks);

	useEffect(() => {
		const grassAssetTask = assetManagerResult.taskNameMap
			.grass as MeshAssetTask;

		setGrass(grassAssetTask.loadedMeshes[0]);
	});

	useEffect(() => {
		if (!grass) return;

		for (const hex of mapHexes$.get()) {
			console.log("run");
			const clone = grass.clone(hex.toString(), null);

			if (!clone) return;

			clone.position = new Vector3(hex.x, 0, hex.y);
			clone.rotation = new Vector3(0, -Math.PI / 2, 0);
			clone.scaling = new Vector3(1.73, 1, 1.73);
		}
	}, [grass]);

	return null;
};
