import { TUnit } from "./Unit";

type THex = {
  coords: {
    row: number;
    col: number;
  };
  unitId: TUnit["id"] | null;
};

export type { THex };
