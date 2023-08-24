import { observable } from "@legendapp/state";
import { Grid, Hex } from "honeycomb-grid";

import { TUnitInstance } from "../types/unit";

export type State = {
  grid: Grid<Hex> | null;
  moveArea: Grid<Hex> | null;
  selectedHex: Hex | null;
  units: Record<string, TUnitInstance>;
};

export const state$ = observable<State>({
  grid: null,
  moveArea: null,
  selectedHex: null,
  units: {},
});
