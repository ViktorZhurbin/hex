import { useSelector } from "@legendapp/state/react";

import { Colors } from "../../constants/colors";
import { state$ } from "../../store";
import { UnitInstance } from "../../types/Unit";

type UnitProps = {
  unitId: UnitInstance["id"];
};

export const Unit = ({ unitId }: UnitProps) => {
  const hex = useSelector(() => {
    const hexId = state$.unitIdToHexId[unitId].get();
    const hex = state$.hexById[hexId].get();

    return hex;
  });

  const selectedUnitId = state$.selectedUnitId.use();
  const isSelected = selectedUnitId === unitId;

  return (
    <mesh position={[hex.x, 0.5, hex.y]}>
      <cylinderGeometry args={[0.5, 0.5, 1]} />
      <meshStandardMaterial color={isSelected ? Colors.primary : "white"} />
    </mesh>
  );
};
