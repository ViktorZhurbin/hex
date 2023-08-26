import { observable } from "@legendapp/state";
import { Grid, Hex } from "honeycomb-grid";

import { TTribe, Tribes } from "../constants/tribe";
import { TUnitInstance } from "../types/unit";

export type State = {
  grid: Grid<Hex> | null;
  gridHexes: Hex[];
  hexById: Record<string, Hex>;
  hexIdToUnitId: Record<string, TUnitInstance["id"]>;
  moveArea: Grid<Hex> | null;
  selectedHexId: null | string;
  selectedUnitId: TUnitInstance["id"] | null;
  tribes: TTribe[];
  unitIdToHexId: Record<TUnitInstance["id"], string>;
  unitsById: Record<TUnitInstance["id"], TUnitInstance>;
  unitsByTribe: TUnitInstance[][];
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
