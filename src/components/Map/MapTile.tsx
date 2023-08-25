import { Edges } from "@react-three/drei/core/Edges";
import { Hex } from "honeycomb-grid";

import { HexColorsMap } from "../../constants/colors";
import { state$ } from "../../store/state";

type MapTileProps = {
  hex: Hex;
  isSelected: boolean;
};

export const MapTile = ({ hex, isSelected }: MapTileProps) => {
  const handleClick = () => {
    const unitId = state$.hexToUnitId[hex.toString()].get();

    if (unitId) {
      state$.selectedUnitId.set(unitId);
      return;
    }

    const selectedUnitId = state$.selectedUnitId.get();

    if (selectedUnitId) {
      state$.hexToUnitId[hex.toString()].set(selectedUnitId);
      state$.unitIdToHex[selectedUnitId].set(hex);
      state$.selectedUnitId.set(null);
      state$.selectedHex.set(null);
    } else {
      state$.selectedHex.set(hex);
    }
  };

  return (
    <mesh onClick={handleClick} position={[hex.x, 0, hex.y]} scale={0.99}>
      <cylinderGeometry args={[1, 1, 0.5, 6]} />
      <meshStandardMaterial
        color={isSelected ? HexColorsMap.selected : HexColorsMap.default}
      />
      <Edges />
    </mesh>
  );
};
