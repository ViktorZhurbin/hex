import { Cylinder } from "@react-three/drei/core/shapes";
import { MeshProps } from "@react-three/fiber";

type UnitProps = MeshProps;

export const Unit = ({ position }: UnitProps) => {
  return (
    <mesh position={position}>
      <Cylinder args={[0.5, 0.5, 1]} />
    </mesh>
  );
};
