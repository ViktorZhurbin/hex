import { TUnit } from "../types/unit";

const UnitTypes = {
  typeOne: "typeOne",
  typeTwo: "typeTwo",
} as const;

type TUnitTypes = keyof typeof UnitTypes;

const Units: Record<TUnitTypes, TUnit> = {
  [UnitTypes.typeOne]: {
    speed: 1,
    type: UnitTypes.typeOne,
  },
  [UnitTypes.typeTwo]: {
    speed: 1,
    type: UnitTypes.typeTwo,
  },
};

export type { TUnitTypes };
export { UnitTypes, Units };
