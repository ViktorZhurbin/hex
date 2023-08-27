import { Grid, Orientation, defineHex, spiral } from "honeycomb-grid";

import { state$ } from "../../state";
import { placeInitialUnits } from "../units/placeInitialUnits";
import { setInitialUnits } from "../units/setInitialUnits";
import { getGridSide } from "./getGridSide";

export const initMap = () => {
  const tribes = state$.units.tribes.get();
  const gridSide = getGridSide(tribes.length);

  const HexTile = defineHex({ orientation: Orientation.POINTY });

  const grid = new Grid(HexTile, spiral({ radius: gridSide, start: [0, 0] }));

  state$.grid.set(grid);

  setInitialUnits();
  placeInitialUnits();
};
