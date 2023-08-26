import { UnitTypes } from "./unit";

export enum Tribes {
  tribeOne = "tribeOne",
  tribeTwo = "tribeTwo",
}

export const START_UNITS_BY_TRIBE: Record<string, UnitTypes[]> = {
  [Tribes.tribeOne]: [UnitTypes.typeOne, UnitTypes.typeTwo],
  [Tribes.tribeTwo]: [UnitTypes.typeOne, UnitTypes.typeTwo],
};
