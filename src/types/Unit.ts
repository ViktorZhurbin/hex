import { TTribes } from "../constants/tribe";

type TUnitBase = {
  speed: number;
};

type TUnit = TUnitBase & {
  type: string;
};

type TUnitInstance = TUnit & {
  id: string;
  tribe: TTribes;
};

export type { TUnit, TUnitBase, TUnitInstance };
