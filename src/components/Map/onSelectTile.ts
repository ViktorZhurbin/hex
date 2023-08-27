import { state$ } from "../../store/state";
import { getMoveArea } from "../../utils/units/getMoveArea";

export const onSelectTile = (hexId: string) => {
  const isSelected = hexId === state$.selectedHexId.peek();

  // click selected tile again
  if (isSelected) {
    console.log("click selected tile again", hexId);
    state$.selectedHexId.set(null);
    state$.selectedUnitId.set(null);
    return;
  }

  const unitId = state$.hexIdToUnitId[hexId].peek();
  const selectedUnitId = state$.selectedUnitId.peek();

  // click selected unit again
  if (unitId && unitId === selectedUnitId) {
    console.log("click selected unit again", hexId);
    state$.selectedUnitId.set(null);
    state$.moveArea.set(null);
    return;
  }

  // tile has unit
  if (unitId) {
    console.log("tile has unit", hexId);
    const moveArea = getMoveArea(unitId);
    state$.moveArea.set(moveArea);
    state$.selectedHexId.set(null);
    state$.selectedUnitId.set(unitId);
    return;
  }

  // unit was selected
  if (selectedUnitId) {
    console.log("unit was selected", hexId);
    const hex = state$.hexById[hexId].peek();
    const isTileInRange = state$.moveArea.peek()?.hasHex(hex);

    if (!isTileInRange) {
      console.log("tile is out of move area");
      state$.selectedHexId.set(hexId);
      state$.selectedUnitId.set(null);
      state$.moveArea.set(null);

      return;
    }

    console.log("move unit to current tile");
    // clear previous positions
    const prevHexId = state$.unitIdToHexId[selectedUnitId].peek();
    state$.hexIdToUnitId[prevHexId].set(null);
    state$.unitIdToHexId[selectedUnitId].set(null);

    // set new positions
    state$.hexIdToUnitId[hexId].set(selectedUnitId);
    state$.unitIdToHexId[selectedUnitId].set(hexId);

    // clear selections
    state$.selectedUnitId.set(null);
    state$.selectedHexId.set(null);
    state$.moveArea.set(null);

    return;
  }

  // just select a tile
  console.log("just select a tile", hexId);
  state$.selectedHexId.set(hexId);
  state$.selectedUnitId.set(null);
};
