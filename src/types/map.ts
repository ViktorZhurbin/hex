import { TUnitInstance } from "./unit";

type THex = {
  col: number;
  id: string;
  row: number;
  unitId?: TUnitInstance["id"] | null;
};

type TMap = THex[][];

export type { THex, TMap };
