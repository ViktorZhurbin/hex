import { Colors } from "../../constants/colors";
import { useHexByUnitId } from "../../state/selectors/map";
import { useIsUnitSelected } from "../../state/selectors/units";
import { UnitInstance } from "../../types/Unit";

type UnitProps = {
  unitId: UnitInstance["id"];
};

export const Unit = ({ unitId }: UnitProps) => {
  const hex = useHexByUnitId(unitId);
  const isSelected = useIsUnitSelected(unitId);

  return (
    <mesh position={[hex.x, 0.5, hex.y]}>
      <cylinderGeometry args={[0.5, 0.5, 1]} />
      <meshStandardMaterial color={isSelected ? Colors.primary : "white"} />
    </mesh>
  );
};
