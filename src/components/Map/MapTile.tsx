import { ObservablePrimitiveBaseFns } from "@legendapp/state";
import { useObserve } from "@legendapp/state/react";
import { Text } from "@react-three/drei";
import { Edges } from "@react-three/drei/core/Edges";
import { ThreeEvent } from "@react-three/fiber";
import { Hex } from "honeycomb-grid";
import { useState } from "react";

import { HexColorsMap } from "../../constants/colors";
import { state$ } from "../../store/state";

type MapTileProps = {
  hex$: ObservablePrimitiveBaseFns<Hex | undefined>;
};

const TILE_POSITION_Y = 0.5;

export const MapTile = ({ hex$ }: MapTileProps) => {
  const [isSelected, setSelected] = useState(false);

  useObserve(() => {
    const isSelected = state$.selectedHexId.get() === hex$.get()?.toString();

    setSelected(isSelected);
  });

  const hex = hex$.get();

  // console.log("MapTile rendered", isSelected);

  if (!hex) {
    return null;
  }
  const hexString = hex.toString();

  const handleClick = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    const unitId = state$.hexIdToUnitId[hexString].get();

    if (isSelected) {
      state$.selectedHexId.set(null);
      return;
    }

    if (unitId) {
      state$.selectedUnitId.set(unitId);
      return;
    }

    const selectedUnitId = state$.selectedUnitId.get();

    if (selectedUnitId) {
      state$.hexIdToUnitId[hexString].set(selectedUnitId);
      state$.unitIdToHexId[selectedUnitId].set(hexString);

      state$.selectedUnitId.set(null);
      state$.selectedHexId.set(null);

      return;
    }

    state$.selectedHexId.set(hexString);
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
        color={isSelected ? HexColorsMap.selected : HexColorsMap.default}
      />
      <Edges />
    </mesh>
  );
};
