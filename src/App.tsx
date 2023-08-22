// import { OrbitControls } from "@react-three/drei";
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
        // maxAzimuthAngle={0}
        maxDistance={50}
        // maxPolarAngle={Math.PI / 4}
        // minAzimuthAngle={0}
        minDistance={5}
        // minPolarAngle={Math.PI / 4}
        minZoom={10}
      />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default App;
