import "./App.css";

import { Vector3 } from "@babylonjs/core";
import { initMap } from "@hex/state/src/utils/map/initMap";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { Suspense } from "react";
import { AssetManagerContextProvider, Engine, Scene } from "react-babylonjs";
import { Camera } from "./components/Camera";
import { InspectorView } from "./components/InspectorView";
import { WorldMap } from "./components/WorldMap";

enableReactTracking({
	auto: true,
});

initMap();

const App = () => {
	return (
		<div>
			<Engine
				antialias
				adaptToDeviceRatio
				canvasId="root-canvas"
				engineOptions={{ stencil: true }}
			>
				<Scene>
					<InspectorView />

					<Camera />

					<hemisphericLight
						name="light1"
						intensity={0.7}
						direction={Vector3.Up()}
					/>

					<AssetManagerContextProvider>
						<Suspense fallback={"Loading..."}>
							<WorldMap />
						</Suspense>
					</AssetManagerContextProvider>
				</Scene>
			</Engine>
		</div>
	);
};

export default App;
