import { state$ } from "@/shared/state";
import { useHexByUnitId } from "@/shared/state/selectors/map";
import type { ThreeEvent } from "@react-three/fiber";
import type { UnitInstance } from "@shared/types/Unit";
import { onSelectTile } from "../WorldMap/onSelectTile";
import { CharacterMaleF } from "../models/units/CharacterMaleF";

type UnitProps = {
	unitId: UnitInstance["id"];
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
