import { TUnitInstance } from "./unit";

type THex = {
  id: string;
  row: number;
  col: number;
  unitId?: TUnitInstance["id"] | null;
};

type TMap = THex[][];

export type { THex, TMap };
