import { observable } from "@legendapp/state";
import { Grid, Hex } from "honeycomb-grid";

import { Tribes } from "../constants/tribe";
import { UnitInstance } from "../types/Unit";

export type State = {
  map: {
    grid: Grid<Hex> | null;
    hexById: Record<string, Hex>;
    hexes: Hex[];
  };
  mappings: {
    hexIdToUnitId: Record<string, UnitInstance["id"]>;
    unitIdToHexId: Record<UnitInstance["id"], string>;
  };
  selection: {
    moveArea: Grid<Hex> | null;
    selectedHexId: null | string;
    selectedUnitId: UnitInstance["id"] | null;
  };
  units: {
    tribes: Tribes[];
    unitsById: Record<UnitInstance["id"], UnitInstance>;
    unitsByTribe: UnitInstance[][];
  };
};

export const state$ = observable<State>({
  map: {
    grid: null,
    hexById: {},
    hexes: [],
  },
  mappings: {
    hexIdToUnitId: {},
    unitIdToHexId: {},
  },
  selection: {
    moveArea: null,
    selectedHexId: null,
    selectedUnitId: null,
  },
  units: {
    tribes: [Tribes.tribeOne, Tribes.tribeTwo],
    unitsById: {},
    unitsByTribe: [],
  },
});
