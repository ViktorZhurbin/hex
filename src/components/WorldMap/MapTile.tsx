import { useObserve } from "@legendapp/state/react";
import { Text } from "@react-three/drei";
import { Edges } from "@react-three/drei/core/Edges";
import type { Hex } from "honeycomb-grid";
import { useState } from "react";

import { state$ } from "../../state";
import { TileColorByState, TileState } from "./constants";
import { onSelectTile } from "./onSelectTile";

type MapTileProps = {
	hex: Hex;
};

const TILE_POSITION_Y = 0.5;

export const MapTile = ({ hex }: MapTileProps) => {
	console.log("MapTile rendered");

	const [state, setState] = useState(TileState.default);

	const hexId = hex.toString();

	useObserve(() => {
		const moveArea = state$.selection.moveArea.get();

		const isTileHighlighted = moveArea?.hasHex(hex);
		const isTileSelected = state$.selection.selectedHexId.get() === hexId;

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

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<mesh
			onClick={(event) => {
				event.stopPropagation();
				onSelectTile(hexId);
			}}
			position={[hex.x, 0, hex.y]}
			scale={0.99}
		>
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
