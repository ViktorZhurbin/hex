import { TUnitTypes, UnitTypes } from "./unit";

export const Tribes = {
  tribeOne: "tribeOne",
  tribeTwo: "tribeTwo",
} as const;

export type TTribe = keyof typeof Tribes;

export const START_UNITS_BY_TRIBE: Record<string, TUnitTypes[]> = {
  [Tribes.tribeOne]: [UnitTypes.typeOne, UnitTypes.typeTwo],
  [Tribes.tribeTwo]: [UnitTypes.typeOne, UnitTypes.typeTwo],
};
