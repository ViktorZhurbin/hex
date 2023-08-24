import { TUnitInstance } from "./unit";

type THex = {
  id?: string;
  unitId?: TUnitInstance["id"] | null;
};

type HexWithUnitId = THex & {
  unitId: TUnitInstance["id"];
};

export type { HexWithUnitId, THex };
