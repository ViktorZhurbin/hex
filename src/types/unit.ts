import { TTribe } from "../constants/tribe";

type TUnit = {
  speed: number;
  type: string;
};

type TUnitInstance = TUnit & {
  id: string;
  tribe: TTribe;
};

export type { TUnit, TUnitInstance };
