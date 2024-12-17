import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { Environment } from "@react-three/drei";
import { MapControls } from "@react-three/drei/core/MapControls";
import { Canvas } from "@react-three/fiber";
import { Units } from "./components/Units/Units";
import { WorldMap } from "./components/WorldMap/WorldMap";
import { initMap } from "./utils/map/initMap";

enableReactTracking({
	auto: true,
});

initMap();

const App = () => (
	<Canvas camera={{ fov: 40, position: [7, 7, 0] }}>
		<ambientLight />

		<WorldMap />
		<Units />

		{/* <Sky
			turbidity={8}
			rayleigh={0.6}
			mieCoefficient={0.002}
			mieDirectionalG={0.5}
			sunPosition={[1, 0.1, 0]}
		/> */}
		<Environment preset="park" background blur={1} environmentIntensity={0.1} />

		{/* map-like camera controls */}
		<MapControls
			makeDefault
			maxDistance={30}
			minDistance={3}
			minZoom={10}
			panSpeed={2}
			enableRotate={import.meta.env.DEV}
		/>
	</Canvas>
);

export default App;
