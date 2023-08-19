// import { OrbitControls } from "@react-three/drei";
import { MapControls } from "@react-three/drei/core/MapControls";
import { Canvas } from "@react-three/fiber";

import { Map } from "./components/Map/Map";
// import { Plane } from "./components/Plane/Plane";

function App() {
  return (
    <Canvas
      camera={
        {
          // isPerspectiveCamera: true,
          // position: [0, 0, 0],
        }
      }
    >
      {/* <Plane /> */}
      <ambientLight />
      <pointLight position={[4, 1, 10]} />
      <Map tribesCount={2} />
      {/* map-like camera controls */}
      <MapControls makeDefault maxDistance={50} minDistance={5} />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default App;
