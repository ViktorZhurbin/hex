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

      acc[id] = { id, tribe, ...Units[type] };

      return acc;
    },
    {},
  );
};

const getInitialUnits = (tribes: TTribes[]) =>
  tribes.reduce<ReturnType<typeof getTribeUnits>>((acc, tribe) => {
    return { ...acc, ...getTribeUnits(tribe) };
  }, {});

      return acc;
    },
    {},
  );

export { getInitialUnits, getMovementArea };
