import { TTribes } from "../../../constants/tribe";
import { TMap } from "../../../types/map";
import { getInitialUnitsByTribe } from "./unit";

const SIDE_LENGTH_PER_TRIBE = 3;
const getSide = (tribeCount: number) =>
  Array.from(Array(SIDE_LENGTH_PER_TRIBE * tribeCount));

const getInitialMap = (tribeCount = 1): TMap => {
  const side = getSide(tribeCount);

  return side.map((_, row) =>
    side.map((_, col) => ({
      row,
      col,
      id: $uid(),
    })),
  );
};

const getStartPositions = (tribeCount: number) => {
  const positions = [[1, 1]];

  for (let index = 0; index < tribeCount; index++) {
    const [prevRow, prevCol] = positions[index];

    const row = prevRow + SIDE_LENGTH_PER_TRIBE;
    const col = prevCol + SIDE_LENGTH_PER_TRIBE;

    positions.push([row, col]);
  }

  return positions;
};

const getStartUnitPositions = (
  tribes: TTribes[],
  unitsByTribe: ReturnType<typeof getInitialUnitsByTribe>,
) => {
  const startPositions = getStartPositions(tribes.length);

  return tribes.reduce<{ unitId: string; row: number; col: number }[]>(
    (acc, tribe, index) => {
      const tribeUnitIds = Object.keys(unitsByTribe[tribe]);
      const [startRow, startCol] = startPositions[index];

      tribeUnitIds.forEach((unitId, index) => {
        const isEven = index > 0 && index % 2 === 0;
        const offset = isEven ? index + 1 : index - 1;

        acc.push({
          unitId,
          col: startCol + offset,
          row: startRow + offset,
        });
      });

      return acc;
    },
    [],
  );
};

export { getInitialMap, getStartPositions, getStartUnitPositions };
