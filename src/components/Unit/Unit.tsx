import { Cylinder } from "@react-three/drei/core/shapes";
import { MeshProps } from "@react-three/fiber";

type UnitProps = MeshProps;

export const Unit = ({ position }: UnitProps) => {
  const handleClick: MeshProps["onClick"] = () => {
    console.log("clicked unit");
  };

  return (
    <mesh onClick={handleClick} position={position}>
      <Cylinder args={[0.5, 0.5, 1]} />
      <meshStandardMaterial />
    </mesh>
  );
};
