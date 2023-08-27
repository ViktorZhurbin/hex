import { useSelector } from "@legendapp/state/react";

import { Colors } from "../../constants/colors";
import { state$ } from "../../state";
import { hexesById$ } from "../../state/selectors/map";
import { UnitInstance } from "../../types/Unit";

type UnitProps = {
  unitId: UnitInstance["id"];
};

export const Unit = ({ unitId }: UnitProps) => {
  const hex = useSelector(() => {
    const hexId = state$.mappings.unitIdToHexId[unitId].get();
    const hex = hexesById$[hexId].get();

    return hex;
  });

  const selectedUnitId = state$.selection.selectedUnitId.use();
  const isSelected = selectedUnitId === unitId;

  return (
    <mesh position={[hex.x, 0.5, hex.y]}>
      <cylinderGeometry args={[0.5, 0.5, 1]} />
      <meshStandardMaterial color={isSelected ? Colors.primary : "white"} />
    </mesh>
  );
};
