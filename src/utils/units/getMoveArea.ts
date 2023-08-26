import { spiral } from "honeycomb-grid";

import { state$ } from "../../store/state";
import { UnitInstance } from "../../types/Unit";

export const getMoveArea = (unitId: UnitInstance["id"]) => {
  const unit = state$.unitsById[unitId].get();
  const hexId = state$.unitIdToHexId[unitId].get();
  const hex = state$.hexById[hexId].get();

  const traverser = spiral({
    radius: unit.speed,
    start: { col: hex.col, row: hex.row },
  });

  const grid = state$.grid.get();
  const moveAreaHexes = grid.traverse(traverser);

  return moveAreaHexes;
};
