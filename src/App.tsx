import { MapControls } from "@react-three/drei/core/MapControls";
import { Canvas } from "@react-three/fiber";

import { Plane } from "./components/Plane/Plane";

function App() {
  return (
    <Canvas
      camera={{
        isPerspectiveCamera: true,
        position: [1, 2, 0],
      }}
    >
      <ambientLight />
      <pointLight position={[4, 1, 10]} />
      <Plane />

      <MapControls makeDefault maxDistance={50} minDistance={10} />
    </Canvas>
  );
}

export default App;
