import { Edges } from "@react-three/drei/core/Edges";
import { Hex } from "honeycomb-grid";

export const MapTile = ({ hex }: { hex: Hex }) => {
  return (
    <mesh position={[hex.x, 0, hex.y]} scale={0.99}>
      <cylinderGeometry args={[1, 1, 0.5, 6]} />
      <meshStandardMaterial />
      <Edges />
    </mesh>
  );
};
