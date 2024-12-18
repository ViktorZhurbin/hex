import { Colors } from "@/shared/constants/colors";
import { state$ } from "@/shared/state";
import { useSelector } from "@legendapp/state/react";
import { Edges, Outlines /* , Text */ } from "@react-three/drei";
import type { Hex } from "honeycomb-grid";
import { Grass } from "../models/hex/Grass";
import { onSelectTile } from "./onSelectTile";

type MapTileProps = {
	hex: Hex;
};

export const MapTile = ({ hex }: MapTileProps) => {
	console.info("MapTile rendered");

	const hexId = hex.toString();

	const isHighlighted = useSelector(() => {
		const moveArea = state$.selection.moveArea.get();

		return !!moveArea?.hasHex(hex);
	});

	const isSelected = useSelector(
		() => state$.selection.selectedHexId.get() === hexId,
	);

	return (
		<>
			<Grass
				scale={1.73}
				rotation={[0, -Math.PI / 2, 0]}
				position={[hex.x, 0, hex.y]}
				onClick={(event) => {
					event.stopPropagation();
					onSelectTile(hexId);
				}}
			>
				<Edges
					visible={isSelected || isHighlighted}
					scale={[0.9, 1.05, 0.9]}
					linewidth={5}
					color={isSelected ? Colors.white : Colors.blue}
				/>
				<Outlines angle={0} thickness={1} color="white" />
				{/* {import.meta.env.DEV && (
					<Text
						fontSize={0.2}
						position={[0, 0.25, 0]}
						rotation={[-Math.PI / 2, 0, Math.PI / 2]}
					>
						{hexId}
					</Text>
				)} */}
			</Grass>
		</>
	);
};
