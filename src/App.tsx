import { MapControls } from "@react-three/drei/core/MapControls";
import { Canvas } from "@react-three/fiber";

import { Map } from "./components/Map/Map";
import { Units } from "./components/Units/Units";
import { Tribes } from "./constants/tribe";
// import { Plane } from "./components/Plane/Plane";

const tribes = [Tribes.tribeOne, Tribes.tribeTwo];

function App() {
  return (
    <Canvas
      camera={{
        // isPerspectiveCamera: true,
        position: [10, 10, 0],
      }}
    >
      {/* <Plane /> */}
      <ambientLight />
      <pointLight position={[4, 1, 10]} />
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
