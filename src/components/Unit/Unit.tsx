import { MeshProps } from "@react-three/fiber";

import { Colors } from "../../constants/colors";
import { state$ } from "../../store/state";
import { TUnitInstance } from "../../types/unit";

type UnitProps = MeshProps & {
  unit: TUnitInstance;
};

export const Unit = ({ position, unit }: UnitProps) => {
  const selectedUnitId = state$.selectedUnitId.use();
  const isSelected = selectedUnitId === unit.id;

  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.5, 0.5, 1]} />
      <meshStandardMaterial color={isSelected ? Colors.primary : "white"} />
    </mesh>
  );
};
