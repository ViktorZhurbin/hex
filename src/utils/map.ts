import { THex } from "../types/map";

const getMapHex = (map: TMap, hex: Pick<THex, "row" | "col">): THex =>
  map[hex.row][hex.col];

export { getMapHex };
