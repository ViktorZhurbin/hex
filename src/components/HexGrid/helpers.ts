import { THex } from "../../types/Hex";

const HEXES_PER_SIDE = 4;

const SIDE = Array.from(Array(HEXES_PER_SIDE));

type TMap = THex[][];

const initialMap: TMap = SIDE.map((_, rowIndex) =>
  SIDE.map((_, colIndex) => {
    return {
      id: $uid(),
      row: rowIndex,
      col: colIndex,
    };
  }),
);

const getMapHex = (map: TMap, hex: THex) => map[hex.row][hex.col];

export { initialMap, getMapHex };
