import { ring } from "honeycomb-grid";

import { state$ } from "~/state";
import { unitsByTribe$ } from "~/state/selectors/units";
import { getGridSide } from "../map/getGridSide";

export const placeInitialUnits = () => {
	const unitsByTribe = unitsByTribe$.get();
	const gridSide = getGridSide(unitsByTribe.length);

	const grid = state$.grid.get();
	const traverser = ring({ center: [0, 0], start: [gridSide - 1, 0] });
	const ringOfHexes = grid.traverse(traverser).toArray();

	let hexIndex = 0;

	for (const tribeUnits of unitsByTribe) {
		tribeUnits.forEach((unit, unitIndex) => {
			const hex = ringOfHexes[hexIndex];
			const hexId = hex.toString();

			state$.mappings.hexIdToUnitId[hexId].set(unit.id);
			state$.mappings.unitIdToHexId[unit.id].set(hexId);

			const isLastTribeUnit = unitIndex === tribeUnits.length - 1;
			const indexIncrease = isLastTribeUnit ? gridSide : 1;
			hexIndex += indexIncrease;
		});
	}
};
