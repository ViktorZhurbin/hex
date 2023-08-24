import { enableReactUse } from "@legendapp/state/config/enableReactUse";
import { MapControls } from "@react-three/drei/core/MapControls";
import { Canvas } from "@react-three/fiber";

import { Map } from "./components/Map/Map";
import { Plane } from "./components/Plane/Plane";
import { Units } from "./components/Units/Units";
import { Tribes } from "./constants/tribe";

const tribes = [Tribes.tribeOne, Tribes.tribeTwo];

function App() {
  enableReactUse();

  return (
    <Canvas camera={{ fov: 40, position: [10, 10, 0] }}>
      <ambientLight />

      <Plane />
      <Map tribesCount={tribes.length} />
      <Units tribes={tribes} />

      {/* map-like camera controls */}
      <MapControls
        enableRotate={false}
        makeDefault
        maxDistance={50}
        minDistance={5}
        minZoom={10}
        panSpeed={2}
      />
    </Canvas>
  );
}

export default App;
