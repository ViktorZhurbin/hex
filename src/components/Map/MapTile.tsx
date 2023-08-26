import { useSelector } from "@legendapp/state/react";
import { Text } from "@react-three/drei";
import { Edges } from "@react-three/drei/core/Edges";
import { ThreeEvent } from "@react-three/fiber";
import { Hex } from "honeycomb-grid";

import { HexColorsMap } from "../../constants/colors";
import { state$ } from "../../store/state";

type MapTileProps = {
  hex: Hex;
};

const TILE_POSITION_Y = 0.5;

export const MapTile = ({ hex }: MapTileProps) => {
  console.log("MapTile rendered");

  const hexString = hex.toString();
  const selectedHexString = useSelector(
    () => state$.selectedHex.get()?.toString(),
  );

  const handleClick = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    const unitId = state$.hexToUnitId[hexString].get();

    if (selectedHexString === hexString) {
      state$.selectedHex.set(null);
      return;
    }

    if (unitId) {
      state$.selectedUnitId.set(unitId);
      return;
    }

    const selectedUnitId = state$.selectedUnitId.get();

    if (selectedUnitId) {
      state$.hexToUnitId[hexString].set(selectedUnitId);
      state$.unitIdToHex[selectedUnitId].set(hex);

      state$.selectedUnitId.set(null);
      state$.selectedHex.set(null);

      return;
    }

    state$.selectedHex.set(hex);
  };

  return (
    <mesh onPointerDown={handleClick} position={[hex.x, 0, hex.y]} scale={0.99}>
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
        color={
          selectedHexString === hexString
            ? HexColorsMap.selected
            : HexColorsMap.default
        }
      />
      <Edges />
    </mesh>
  );
};
