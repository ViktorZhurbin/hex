import { Edges } from "@react-three/drei";
import { state$ } from "../../state";

type MapTileEdgesProps = {
	hexId: string;
};

export const MapTileEdges = ({ hexId }: MapTileEdgesProps) => {
	const isSelected = state$.selection.selectedHexId.get() === hexId;

	const linewidth = isSelected ? 3 : 0.75;

	return <Edges linewidth={linewidth} />;
};
