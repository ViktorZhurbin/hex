import { TTribes, Tribes } from "../../../constants/tribe";
import { TUnitTypes, UnitTypes, Units } from "../../../constants/unit";
import { TUnitInstance } from "../../../types/unit";

const START_UNITS_BY_TRIBE: Record<string, TUnitTypes[]> = {
  [Tribes.tribeOne]: [UnitTypes.typeOne, UnitTypes.typeTwo],
  [Tribes.tribeTwo]: [UnitTypes.typeOne, UnitTypes.typeTwo],
};

const getTribeUnits = (tribe: TTribes) => {
  return START_UNITS_BY_TRIBE[tribe].reduce<Record<string, TUnitInstance>>(
    (acc, type) => {
      const id = $uid();

      acc[id] = { id, ...Units[type] };

      return acc;
    },
    {},
  );
};

const getInitialUnitsByTribe = (tribes: TTribes[]) =>
  tribes.reduce<Record<string, ReturnType<typeof getTribeUnits>>>(
    (acc, tribe) => {
      acc[tribe] = getTribeUnits(tribe);

      return acc;
    },
    {},
  );

export { getInitialUnitsByTribe };
