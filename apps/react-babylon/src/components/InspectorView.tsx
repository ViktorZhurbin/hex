import { Inspector } from "@babylonjs/inspector";
import { useEffect } from "react";
import { useScene } from "react-babylonjs";

const LocalStorage = {
	ShowInspector: "showInspector",
};

const Debugger = {
	Hide: "false",
	Show: "true",
};

const inspectorOptions = { overlay: true };

export const InspectorView = () => {
	const scene = useScene();

	useEffect(() => {
		if (!scene) return;

		const shouldShow = localStorage.getItem(LocalStorage.ShowInspector);

		if (shouldShow === null || shouldShow === Debugger.Show) {
			Inspector.Show(scene, inspectorOptions);
		}
	}, [scene]);

	useEffect(() => {
		const toggleInspector = (e: KeyboardEvent): void => {
			if (!scene) return;

			if (e.shiftKey && e.ctrlKey && e.key === "I") {
				e.preventDefault();
				if (Inspector.IsVisible) {
					Inspector.Hide();
					localStorage.setItem(LocalStorage.ShowInspector, Debugger.Hide);
				} else {
					Inspector.Show(scene, inspectorOptions);
					localStorage.setItem(LocalStorage.ShowInspector, Debugger.Show);
				}
			}
		};

		window.addEventListener("keydown", toggleInspector);

		return () => {
			window.removeEventListener("keydown", toggleInspector);
		};
	}, [scene]);

	return null;
};
