import { UnitBase } from "../types/Unit";

export enum UnitTypes {
  typeOne = "typeOne",
  typeTwo = "typeTwo",
}

export const Units: Record<UnitTypes, UnitBase> = {
  [UnitTypes.typeOne]: {
    speed: 2,
    type: UnitTypes.typeOne,
  },
  [UnitTypes.typeTwo]: {
    speed: 2,
    type: UnitTypes.typeTwo,
  },
};
