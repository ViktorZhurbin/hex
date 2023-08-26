import { observable } from "@legendapp/state";
import { Grid, Hex } from "honeycomb-grid";

import { Tribes } from "../constants/tribe";
import { UnitInstance } from "../types/Unit";

export type State = {
  grid: Grid<Hex> | null;
  gridHexes: Hex[];
  hexById: Record<string, Hex>;
  hexIdToUnitId: Record<string, UnitInstance["id"]>;
  moveArea: Grid<Hex> | null;
  selectedHexId: null | string;
  selectedUnitId: UnitInstance["id"] | null;
  tribes: Tribes[];
  unitIdToHexId: Record<UnitInstance["id"], string>;
  unitsById: Record<UnitInstance["id"], UnitInstance>;
  unitsByTribe: UnitInstance[][];
};

export const state$ = observable<State>({
  grid: null,
  gridHexes: [],
  hexById: {},
  hexIdToUnitId: {},
  moveArea: null,
  selectedHexId: null,
  selectedUnitId: null,
  tribes: [Tribes.tribeOne, Tribes.tribeTwo],
  unitIdToHexId: {},
  unitsById: {},
  unitsByTribe: [],
});
