import { Vector3 } from "@react-three/fiber";
import { DoubleSide } from "three/src/constants.js";
import { Color } from "three/src/math/Color.js";

const color = new Color(0xfffff);

export const HighlightSquare = ({ position }: { position: Vector3 | null }) => {
  if (!position) {
    return null;
  }

  return (
    <mesh position={position} rotation-x={-Math.PI / 2}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color={color} side={DoubleSide} />
    </mesh>
  );
};
