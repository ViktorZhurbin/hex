import { TTribes, Tribes } from "../../../constants/tribe";
import { TUnitTypes, UnitTypes, Units } from "../../../constants/unit";
import { THex } from "../../../types/map";
import { TUnitInstance } from "../../../types/unit";
import { getIsEven } from "../../../utils/map";

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
  positionIndex: THex["col" | "row"],
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
  const rows = getAvailablePositions(hex.row, speed);

  return rows.reduce<Record<string, number[]>>((acc, row) => {
    const isOdd = !getIsEven(row);
    const isSelectedRow = row === hex.row;
    let cols = getAvailablePositions(hex.col, speed);

    if (!isSelectedRow) {
      // hex has only two adjusting hexes above and below it
      // for odd rows we need to slice the first element
      // even rows are shifted right, so we slice the last element
      cols = isOdd ? cols.slice(1) : cols.slice(0, cols.length - 1);
    }

    acc[row] = cols;

    return acc;
  }, {});
};

export { getInitialUnits, getMovementArea };
