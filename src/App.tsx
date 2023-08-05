import { Canvas } from "@react-three/fiber";

import "./App.css";
import { Box } from "./components/Box/Box";

function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[4, 1, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
}

export default App;
