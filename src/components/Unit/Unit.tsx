import { useObserve } from "@legendapp/state/react";
import { useState } from "react";

import { Colors } from "../../constants/colors";
import { state$ } from "../../state";
import { useHexByUnitId } from "../../state/selectors/map";
import type { UnitInstance } from "../../types/Unit";

type UnitProps = {
	unitId: UnitInstance["id"];
};

export const Unit = ({ unitId }: UnitProps) => {
	console.log("Unit rendered");

	const [isSelected, setSelected] = useState(false);

	const hex = useHexByUnitId(unitId);

	useObserve(() => {
		const selectedUnitId = state$.selection.selectedUnitId.get();

		if (selectedUnitId === unitId && !isSelected) {
			setSelected(true);
		} else if (selectedUnitId !== unitId && isSelected) {
			setSelected(false);
		}
	});

	return (
		<mesh position={[hex.x, 0.5, hex.y]}>
			<cylinderGeometry args={[0.5, 0.5, 1]} />
			<meshStandardMaterial color={isSelected ? Colors.primary : "white"} />
		</mesh>
	);
};
