import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Canvas } from "@react-three/fiber";

import { Plane } from "./components/Plane/Plane";

function App() {
  return (
    <Canvas
      camera={{
        aspect: window.innerWidth / window.innerHeight,
        far: 1000,
        fov: 45,
        isPerspectiveCamera: true,
        near: 1,
        position: [15, 20, 20],
      }}
    >
      <ambientLight />
      <pointLight position={[4, 1, 10]} />
      <Plane />

      <OrbitControls dampingFactor={0.3} makeDefault />
    </Canvas>
  );
}

export default App;
