import { Edges, Outlines } from "@react-three/drei";
import type { Hex } from "honeycomb-grid";
import { state$ } from "../../state";
import { TileColorByState } from "./constants";

type MapTileEdgesProps = {
	hex: Hex;
};

export const MapTileEdges = ({ hex }: MapTileEdgesProps) => {
	const isSelected = state$.selection.selectedHexId.get() === hex.toString();

	const moveArea = state$.selection.moveArea.get();
	const isHighlighted = moveArea?.hasHex(hex);

	return (
		<>
			{isSelected && <Edges linewidth={4} />}
			<Outlines angle={0} thickness={1} color="white" />
			{isHighlighted && (
				<meshStandardMaterial color={TileColorByState.highlighted} />
			)}
		</>
	);
};
