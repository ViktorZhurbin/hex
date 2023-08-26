import { UnitInstance } from "./Unit";

type THex = {
  id?: string;
  unitId?: UnitInstance["id"] | null;
};

type HexWithUnitId = THex & {
  unitId: UnitInstance["id"];
};

export type { HexWithUnitId, THex };
