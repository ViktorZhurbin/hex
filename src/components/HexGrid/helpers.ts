import { THex } from "../../types/Hex";

const HEXES_PER_SIDE = 4;
const SIDE = Array.from(Array(HEXES_PER_SIDE));
const getRandomIndex = () => Math.floor(Math.random() * SIDE.length);

type TMap = THex[][];

const getInitialMap = (): TMap => {
  const randomIndex = getRandomIndex();

  return SIDE.map((_, row) =>
    SIDE.map((_, col) => {
      const unitId =
        row === randomIndex && col === randomIndex ? "id" : undefined;

      return {
        row,
        col,
        unitId,
        id: $uid(),
      };
    }),
  );
};

const getMapHex = (map: TMap, hex: THex) => map[hex.row][hex.col];

export { getInitialMap, getMapHex, getRandomIndex };
