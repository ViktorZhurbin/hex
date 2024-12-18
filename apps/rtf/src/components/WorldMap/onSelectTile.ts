import { state$ } from "@/shared/state";
import { hexesById$ } from "@/shared/state/selectors/map";
import type { UnitInstance } from "@/shared/types/Unit";
import { getMoveArea } from "@/shared/utils/units/getMoveArea";

export const onSelectTile = (hexId: string) => {
	const isSelected = hexId === state$.selection.selectedHexId.peek();

	// click selected tile again
	if (isSelected) {
		clearTileSelection(hexId);
		return;
	}

	const unitId = state$.mappings.hexIdToUnitId[hexId].peek();
	const selectedUnitId = state$.selection.selectedUnitId.peek();

	// click selected unit again
	if (unitId && unitId === selectedUnitId) {
		clearUnitSelection();
		return;
	}

	// tile has unit
	if (unitId) {
		selectUnit(hexId, unitId);
		return;
	}

	// unit was selected
	if (selectedUnitId) {
		handleSelectedUnit(hexId, selectedUnitId);
		return;
	}

	// just select a tile
	selectTile(hexId);
};

function clearTileSelection(hexId: string) {
	console.log("click selected tile again", hexId);
	state$.selection.selectedHexId.set(null);
	state$.selection.selectedUnitId.set(null);
}

function clearUnitSelection() {
	console.log("clear unit selection");
	state$.selection.selectedUnitId.set(null);
	state$.selection.moveArea.set(null);
}

function selectUnit(hexId: string, unitId: string) {
	console.log("tile has unit", hexId);
	const moveArea = getMoveArea(unitId);
	state$.selection.moveArea.set(moveArea);
	state$.selection.selectedHexId.set(null);
	state$.selection.selectedUnitId.set(unitId);
}

function selectTile(hexId: string) {
	console.log("select a tile", hexId);
	state$.selection.selectedHexId.set(hexId);
	state$.selection.selectedUnitId.set(null);
}

function handleSelectedUnit(hexId: string, selectedUnitId: UnitInstance["id"]) {
	console.log("unit was selected", hexId);
	const hex = hexesById$[hexId].peek();
	const isTileInRange = state$.selection.moveArea.peek()?.hasHex(hex);

	if (!isTileInRange) {
		console.log("tile is out of move area");
		state$.selection.moveArea.set(null);
		selectTile(hexId);
		return;
	}

	moveUnit(hexId, selectedUnitId);
}

function moveUnit(hexId: string, selectedUnitId: UnitInstance["id"]) {
	console.log("move unit to current tile");

	// clear previous positions
	const prevHexId = state$.mappings.unitIdToHexId[selectedUnitId].peek();
	state$.mappings.hexIdToUnitId[prevHexId].set(null);
	state$.mappings.unitIdToHexId[selectedUnitId].set(null);

	// set new positions
	state$.mappings.hexIdToUnitId[hexId].set(selectedUnitId);
	state$.mappings.unitIdToHexId[selectedUnitId].set(hexId);

	// clear selections
	state$.selection.selectedUnitId.set(null);
	state$.selection.selectedHexId.set(null);
	state$.selection.moveArea.set(null);
}
