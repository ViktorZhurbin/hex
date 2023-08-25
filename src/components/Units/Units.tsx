import { ring } from "honeycomb-grid";
import { useState } from "react";

import { TTribe } from "../../constants/tribe";
import { state$ } from "../../store/state";
import { TUnitInstance } from "../../types/unit";
import { getGridSide } from "../../utils/map/getGridSide";
import { getInitialUnits } from "../../utils/units/getInitialUnits";
import { Unit } from "../Unit/Unit";

export const Units = ({ tribes }: { tribes: TTribe[] }) => {
  const [units] = useState(() => getInitialUnits(tribes));

  state$.units.set(units.unitsById);

  const startPositions = getStartHexes(units.unitsByTribe);

  return units.unitsByTribe.map((tribeUnits, tribeIndex) => {
    return tribeUnits.map((unit, unitIndex) => {
      const hex = startPositions[tribeIndex][unitIndex];

      state$.hexToUnitId[hex.toString()].set(unit.id);
      state$.unitIdToHex[unit.id].set(hex);

      if (hex) {
        return <Unit key={unit.id} unitId={unit.id} />;
      }
    });
  });
};

function getStartHexes(unitsByTribe: TUnitInstance[][]) {
  const grid = state$.grid.get();
  const gridSide = getGridSide(unitsByTribe.length);

  const traverser = ring({ center: [0, 0], start: [gridSide - 1, 0] });
  const ringOfHexes = grid.traverse(traverser).toArray();

  let hexIndex = 0;
  const startHexes = unitsByTribe.map((tribeUnits) => {
    return tribeUnits.map((_, unitIndex) => {
      const hex = ringOfHexes[hexIndex];

      const isLastTribeUnit = unitIndex === tribeUnits.length - 1;
      const indexIncrease = isLastTribeUnit ? gridSide : 1;
      hexIndex += indexIncrease;

      return hex;
    });
  });

  return startHexes;
}
