import { START_UNITS_BY_TRIBE } from "../../constants/tribe";
import { Units } from "../../constants/unit";
import { State, state$ } from "../../store";

export const setInitialUnits = () => {
  const tribes = state$.tribes.get();

  const { unitsById, unitsByTribe } = tribes.reduce<{
    unitsById: State["unitsById"];
    unitsByTribe: State["unitsByTribe"];
  }>(
    (acc, tribe) => {
      const tribeUnitTypes = START_UNITS_BY_TRIBE[tribe];

      const tribeUnits = tribeUnitTypes.map((unitType) => {
        const unit = {
          id: crypto.randomUUID(),
          tribe,
          ...Units[unitType],
        };

        acc.unitsById[unit.id] = unit;

        return unit;
      });

      acc.unitsByTribe.push(tribeUnits);

      return acc;
    },
    { unitsById: {}, unitsByTribe: [] },
  );

  state$.unitsById.set(unitsById);
  state$.unitsByTribe.set(unitsByTribe);
};
