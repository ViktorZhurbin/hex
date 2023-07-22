type TUnitBase = {
  speed: number;
};

type TUnit = TUnitBase & {
  type: string;
};

type TUnitInstance = TUnit & {
  id: string;
};

export type { TUnitBase, TUnit, TUnitInstance };
