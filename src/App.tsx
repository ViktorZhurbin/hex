import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Canvas } from "@react-three/fiber";

import "./App.css";
import { Box } from "./components/Box/Box";

function App() {
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 3] }}>
      <ambientLight />
      <pointLight position={[4, 1, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls dampingFactor={0.3} makeDefault />
    </Canvas>
  );
}

export default App;
