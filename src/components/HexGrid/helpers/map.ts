import { THex } from "../../../types/Hex";

const SIDE_LENGTH_PER_TRIBE = 3;
const getSide = (tribeCount: number) =>
  Array.from(Array(SIDE_LENGTH_PER_TRIBE * tribeCount));

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

type TMap = THex[][];

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

const getMapHex = (map: TMap, hex: Pick<THex, "row" | "col">): THex =>
  map[hex.row][hex.col];

export { getInitialMap, getMapHex, getStartPositions };
