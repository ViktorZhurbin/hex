import { TTribe } from "../constants/tribe";

type TUnitBase = {
  speed: number;
};

type TUnit = TUnitBase & {
  type: string;
};

type TUnitInstance = TUnit & {
  id: string;
  tribe: TTribe;
};

export type { TUnit, TUnitBase, TUnitInstance };
