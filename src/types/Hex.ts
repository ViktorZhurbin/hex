import { TUnitInstance } from "./Unit";

type THex = {
  id: string;
  row: number;
  col: number;
  unitId?: TUnitInstance["id"] | null;
};

export type { THex };
