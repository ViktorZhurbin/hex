import { THex, TMap } from "../types/map";

const getMapHex = (map: TMap, hex: Pick<THex, "row" | "col">): THex =>
  map[hex.row][hex.col];

const getIsEven = (rowIndex: number) => (rowIndex + 1) % 2 === 0;

export { getMapHex, getIsEven };
