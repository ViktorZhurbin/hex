import { ObservablePrimitiveBaseFns } from "@legendapp/state";
import { useObserve } from "@legendapp/state/react";
import { Text } from "@react-three/drei";
import { Edges } from "@react-three/drei/core/Edges";
import { ThreeEvent } from "@react-three/fiber";
import { Hex } from "honeycomb-grid";
import { useState } from "react";

import { state$ } from "../../store/state";
import { TileColorByState, TileState } from "./helpers";
import { onSelectTile } from "./onSelectTile";

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
      if (state !== TileState.default) {
        setState(TileState.default);
      }
    }
  });

  if (!hex) {
    return null;
  }

  const hexId = hex.toString();

  const handleClick = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    onSelectTile(hexId);
  };

  return (
    <mesh onPointerDown={handleClick} position={[hex.x, 0, hex.y]} scale={0.99}>
      {import.meta.env.DEV && (
        <Text
          fontSize={0.4}
          position={[0.2, TILE_POSITION_Y, 0]}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        >
          {hexId}
        </Text>
      )}
      <cylinderGeometry args={[1, 1, TILE_POSITION_Y, 6]} />
      <meshStandardMaterial color={TileColorByState[state]} />
      <Edges />
    </mesh>
  );
};
