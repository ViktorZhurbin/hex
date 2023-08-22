import { Vector3 } from "@react-three/fiber";
import { DoubleSide } from "three/src/constants.js";

export const HighlightSquare = ({ position }: { position: Vector3 | null }) => {
  if (!position) {
    return null;
  }

  return (
    <mesh position={position} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color={"white"} side={DoubleSide} />
    </mesh>
  );
};
