import { spiral } from "honeycomb-grid";

import { state$ } from "../../store/state";
import { UnitInstance } from "../../types/Unit";

export const getMoveArea = (unitId: UnitInstance["id"]) => {
  const unit = state$.unitsById[unitId].peek();
  const hexId = state$.unitIdToHexId[unitId].peek();
  const hex = state$.hexById[hexId].peek();

  const traverser = spiral({
    radius: unit.speed,
    start: { col: hex.col, row: hex.row },
  });

  const grid = state$.grid.peek();
  const moveAreaHexes = grid.traverse(traverser);

  return moveAreaHexes;
};
