import { TUnit } from "./Unit";

type THex = {
  id: string;
  row: number;
  col: number;
  unitId?: TUnit["id"] | null;
};

export type { THex };
