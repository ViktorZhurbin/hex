import { Colors } from "../../constants/colors";
import { state$ } from "../../store/state";
import { TUnitInstance } from "../../types/unit";

type UnitProps = {
  unitId: TUnitInstance["id"];
};

export const Unit = ({ unitId }: UnitProps) => {
  const hex = state$.unitIdToHex[unitId].use();

  const selectedUnitId = state$.selectedUnitId.use();
  const isSelected = selectedUnitId === unitId;

  return (
    <mesh position={[hex.x, 0.5, hex.y]}>
      <cylinderGeometry args={[0.5, 0.5, 1]} />
      <meshStandardMaterial color={isSelected ? Colors.primary : "white"} />
    </mesh>
  );
};
