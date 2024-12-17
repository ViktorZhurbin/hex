import { useObserve } from "@legendapp/state/react";
// import { Text } from "@react-three/drei";
import type { Hex } from "honeycomb-grid";
import { useState } from "react";

import { state$ } from "../../state";
import { Grass } from "../models/hex/Grass";
import { MapTileEdges } from "./MapTileEdges";
import { TileState } from "./constants";
import { onSelectTile } from "./onSelectTile";

type MapTileProps = {
	hex: Hex;
};

const TILE_POSITION_Z = 0.8;

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
		<>
			<Grass
				scale={1.73}
				position={[hex.x, -TILE_POSITION_Z, hex.y]}
				onClick={(event) => {
					event.stopPropagation();
					onSelectTile(hexId);
				}}
			>
				<MapTileEdges hexId={hexId} />
			</Grass>
			{/* {import.meta.env.DEV && (
				<Text
					fontSize={0.4}
					position={[0.2, TILE_POSITION_Z, 0]}
					rotation={[-Math.PI / 2, 0, Math.PI / 2]}
				>
					{hexId}
				</Text>
			)}
			<cylinderGeometry args={[1, 1, TILE_POSITION_Z, 6]} />
			<meshStandardMaterial color={TileColorByState[state]} />
			<Edges /> */}
		</>
	);
};
