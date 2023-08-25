import { Text } from "@react-three/drei";
import { Edges } from "@react-three/drei/core/Edges";
import { Hex } from "honeycomb-grid";

import { HexColorsMap } from "../../constants/colors";
import { state$ } from "../../store/state";

type MapTileProps = {
  hex: Hex;
  isSelected: boolean;
};

const TILE_POSITION_Y = 0.5;

export const MapTile = ({ hex, isSelected }: MapTileProps) => {
  const hexString = hex.toString();

  const handleClick = () => {
    const unitId = state$.hexToUnitId[hexString].get();

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
      {import.meta.env.DEV && (
      <Text
        fontSize={0.4}
        position={[0.2, TILE_POSITION_Y, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      >
        {hexString}
      </Text>
      )}
      <cylinderGeometry args={[1, 1, TILE_POSITION_Y, 6]} />
      <meshStandardMaterial
        color={isSelected ? HexColorsMap.selected : HexColorsMap.default}
      />
      <Edges />
    </mesh>
  );
};
