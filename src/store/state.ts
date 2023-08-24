import { observable } from "@legendapp/state";
import { Grid, Hex } from "honeycomb-grid";

import { TUnitInstance } from "../types/unit";

export type State = {
  grid: Grid<Hex> | null;
  hexToUnitId: Record<string, TUnitInstance["id"]>;
  moveArea: Grid<Hex> | null;
  selectedHex: Hex | null;
  selectedUnitId: TUnitInstance["id"] | null;
  units: Record<string, TUnitInstance>;
};

export const state$ = observable<State>({
  grid: null,
  hexToUnitId: {},
  moveArea: null,
  selectedHex: null,
  selectedUnitId: null,
  units: {},
});
