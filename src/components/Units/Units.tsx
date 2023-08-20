import { ring } from "honeycomb-grid";
import { useEffect, useState } from "react";

import { TTribe } from "../../constants/tribe";
import { state$ } from "../../store/state";
import { getGridSide } from "../../utils/map/getGridSide";
import { getInitialUnits } from "../../utils/units/getInitialUnits";
import { Unit } from "../Unit/Unit";

export const Units = ({ tribes }: { tribes: TTribe[] }) => {
  const [units] = useState(() => getInitialUnits(tribes));

  useEffect(() => {
    state$.units.set(units.allUnits);
  }, [units.allUnits]);

  const startPositions = getStartHexes(tribes);

  return units.unitsByTribe.map((tribeUnits, tribeIndex) => {
    return tribeUnits.map((unit, unitIndex) => {
      const hex = startPositions[tribeIndex][unitIndex];

      return hex && <Unit key={unit.id} position={[hex.x, 0.5, hex.y]} />;
    });
  });
};

function getStartHexes(tribes: TTribe[]) {
  const { unitsByTribe } = getInitialUnits(tribes);

  const grid = state$.grid.get();
  const gridSide = getGridSide(tribes.length);

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
