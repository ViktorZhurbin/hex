import { TTribes, Tribes } from "../../../constants/tribe";
import { TUnitTypes, UnitTypes, Units } from "../../../constants/unit";
import { THex } from "../../../types/map";
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

const getAvailablePositions = (
  positionIndex: THex["row" | "col"],
  speed: number,
) => {
  const positions = [];
  const min = positionIndex - speed;
  const max = positionIndex + speed;

  for (let i = min; i <= max; i++) {
    if (i >= 0) {
      positions.push(i);
    }
  }

  return positions;
};

const getMovementArea = (hex: THex, speed: number) => {
  const { row, col } = hex;

  return {
    rows: getAvailablePositions(row, speed),
    cols: getAvailablePositions(col, speed),
  };
};

export { getInitialUnits, getMovementArea };
