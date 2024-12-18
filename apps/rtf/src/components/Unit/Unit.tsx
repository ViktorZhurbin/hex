import { useHexByUnitId } from "@hex/state/src/selectors/map";
import { state$ } from "@hex/state/src/state";
import { onSelectTile } from "@hex/state/src/utils/map/onSelectTile";
import type { ThreeEvent } from "@react-three/fiber";
import { CharacterMaleF } from "../models/units/CharacterMaleF";

type UnitProps = {
	unitId: string;
};

export const Unit = ({ unitId }: UnitProps) => {
	console.log("Unit rendered");

	const hex = useHexByUnitId(unitId);
	const hexId = state$.mappings.unitIdToHexId[unitId].get();

	return (
		<CharacterMaleF
			position={[hex.x, 0.35, hex.y]}
			onClick={(event: ThreeEvent<MouseEvent>) => {
				event.stopPropagation();
				onSelectTile(hexId);
			}}
		/>
	);
};
