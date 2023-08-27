import { state$ } from "../../state";
import { hexesById$ } from "../../state/selectors/map";
import { getMoveArea } from "../../utils/units/getMoveArea";

export const onSelectTile = (hexId: string) => {
  const isSelected = hexId === state$.selection.selectedHexId.peek();

  // click selected tile again
  if (isSelected) {
    console.log("click selected tile again", hexId);
    state$.selection.selectedHexId.set(null);
    state$.selection.selectedUnitId.set(null);
    return;
  }

  const unitId = state$.mappings.hexIdToUnitId[hexId].peek();
  const selectedUnitId = state$.selection.selectedUnitId.peek();

  // click selected unit again
  if (unitId && unitId === selectedUnitId) {
    console.log("click selected unit again", hexId);
    state$.selection.selectedUnitId.set(null);
    state$.selection.moveArea.set(null);
    return;
  }

  // tile has unit
  if (unitId) {
    console.log("tile has unit", hexId);
    const moveArea = getMoveArea(unitId);
    state$.selection.moveArea.set(moveArea);
    state$.selection.selectedHexId.set(null);
    state$.selection.selectedUnitId.set(unitId);
    return;
  }

  // unit was selected
  if (selectedUnitId) {
    console.log("unit was selected", hexId);
    const hex = hexesById$[hexId].peek();
    const isTileInRange = state$.selection.moveArea.peek()?.hasHex(hex);

    if (!isTileInRange) {
      console.log("tile is out of move area");
      state$.selection.selectedHexId.set(hexId);
      state$.selection.selectedUnitId.set(null);
      state$.selection.moveArea.set(null);

      return;
    }

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

    return;
  }

  // just select a tile
  console.log("just select a tile", hexId);
  state$.selection.selectedHexId.set(hexId);
  state$.selection.selectedUnitId.set(null);
};
