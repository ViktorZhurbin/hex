import { spiral } from "honeycomb-grid";

import { state$ } from "../../state";
import { hexesById$ } from "../../state/selectors/map";
import type { UnitInstance } from "../../types/Unit";

export const getMoveArea = (unitId: UnitInstance["id"]) => {
	const unit = state$.units.unitsById[unitId].peek();
	const hexId = state$.mappings.unitIdToHexId[unitId].peek();
	const hex = hexesById$[hexId].peek();

	const traverser = spiral({
		radius: unit.speed,
		start: { col: hex.col, row: hex.row },
	});

	const grid = state$.grid.peek();
	const moveAreaHexes = grid.traverse(traverser);

	return moveAreaHexes;
};
