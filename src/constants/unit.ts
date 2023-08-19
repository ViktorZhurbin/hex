import { TUnit } from "../types/unit";

export const UnitTypes = {
  typeOne: "typeOne",
  typeTwo: "typeTwo",
} as const;

export type TUnitTypes = keyof typeof UnitTypes;

export const Units: Record<TUnitTypes, TUnit> = {
  [UnitTypes.typeOne]: {
    speed: 2,
    type: UnitTypes.typeOne,
  },
  [UnitTypes.typeTwo]: {
    speed: 2,
    type: UnitTypes.typeTwo,
  },
};
