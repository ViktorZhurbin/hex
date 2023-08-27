import { ring } from "honeycomb-grid";

import { state$ } from "../../state";
import { UnitInstance } from "../../types/Unit";
import { getGridSide } from "../../utils/map/getGridSide";
import { Unit } from "../Unit/Unit";

export const Units = () => {
  const unitsByTribe = state$.units.unitsByTribe.get();

  const startPositions = getStartHexes(unitsByTribe);

  return unitsByTribe.map((tribeUnits, tribeIndex) => {
    return tribeUnits.map((unit, unitIndex) => {
      const hex = startPositions[tribeIndex][unitIndex];
      const hexId = hex.toString();

      state$.mappings.hexIdToUnitId[hexId].set(unit.id);
      state$.mappings.unitIdToHexId[unit.id].set(hexId);

      if (hex) {
        return <Unit key={unit.id} unitId={unit.id} />;
      }
    });
  });
};

function getStartHexes(unitsByTribe: UnitInstance[][]) {
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
