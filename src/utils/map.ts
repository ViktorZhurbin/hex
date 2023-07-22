import { THex, TMap } from "../types/map";

const getMapHex = (
  map: TMap,
  hex?: Pick<THex, "col" | "row"> | null,
): THex | undefined => {
  if (!hex) {
    return;
  }

  return map[hex.row][hex.col];
};

const getIsEven = (rowIndex: number) => (rowIndex + 1) % 2 === 0;

export { getIsEven, getMapHex };
