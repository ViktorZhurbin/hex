import { ObservablePrimitiveBaseFns } from "@legendapp/state";
import { useObserve } from "@legendapp/state/react";
import { Text } from "@react-three/drei";
import { Edges } from "@react-three/drei/core/Edges";
import { ThreeEvent } from "@react-three/fiber";
import { Hex } from "honeycomb-grid";
import { useState } from "react";

import { state$ } from "../../store/state";
import { getMoveArea } from "../../utils/units/getMoveArea";
import { TileColorByState, TileState } from "./helpers";

type MapTileProps = {
  hex$: ObservablePrimitiveBaseFns<Hex | undefined>;
};

const TILE_POSITION_Y = 0.5;

export const MapTile = ({ hex$ }: MapTileProps) => {
  console.log("MapTile rendered");

  const [state, setState] = useState(TileState.default);

  const hex = hex$.get();

  useObserve(() => {
    const moveArea = state$.moveArea.get();

    const isTileHighlighted = hex !== undefined && moveArea?.hasHex(hex);
    const isTileSelected = state$.selectedHexId.get() === hex?.toString();

    if (isTileHighlighted) {
      setState(TileState.highlighted);
    } else if (isTileSelected) {
      setState(TileState.selected);
    } else {
      setState(TileState.default);
    }
  });

  if (!hex) {
    return null;
  }

  const hexString = hex.toString();

  const handleClick = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const isSelected = hexString === state$.selectedHexId.get();

    // click selected tile again
    if (isSelected) {
      console.log("click selected tile again", hexString);
      state$.selectedHexId.set(null);
      state$.selectedUnitId.set(null);
      return;
    }

    const unitId = state$.hexIdToUnitId[hexString].get();
    const selectedUnitId = state$.selectedUnitId.get();

    // click selected unit again
    if (unitId && unitId === selectedUnitId) {
      console.log("click selected unit again", hexString);
      state$.selectedUnitId.set(null);
      state$.moveArea.set(null);
      return;
    }

    // tile has unit
    if (unitId) {
      console.log("tile has unit", hexString);
      const moveArea = getMoveArea(unitId);
      state$.moveArea.set(moveArea);
      state$.selectedHexId.set(null);
      state$.selectedUnitId.set(unitId);
      return;
    }

    // unit was selected
    if (selectedUnitId) {
      console.log("unit was selected", hexString);
      const isTileInRange = state$.moveArea.get()?.hasHex(hex);

      if (!isTileInRange) {
        console.log("tile is out of move area");
        state$.selectedHexId.set(hexString);
        state$.selectedUnitId.set(null);
        state$.moveArea.set(null);

        return;
      }

      console.log("move unit to current tile");
      // clear previous positions
      const prevHexId = state$.unitIdToHexId[selectedUnitId].get();
      state$.hexIdToUnitId[prevHexId].set(null);
      state$.unitIdToHexId[selectedUnitId].set(null);

      // set new positions
      state$.hexIdToUnitId[hexString].set(selectedUnitId);
      state$.unitIdToHexId[selectedUnitId].set(hexString);

      // clear selections
      state$.selectedUnitId.set(null);
      state$.selectedHexId.set(null);
      state$.moveArea.set(null);

      return;
    }

    // just select a tile
    console.log("just select a tile", hexString);
    state$.selectedHexId.set(hexString);
    state$.selectedUnitId.set(null);
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
      <meshStandardMaterial color={TileColorByState[state]} />
      <Edges />
    </mesh>
  );
};
