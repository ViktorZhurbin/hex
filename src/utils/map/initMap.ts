import { Grid, Orientation, defineHex, spiral } from "honeycomb-grid";

import { State, state$ } from "../../state";
import { setInitialUnits } from "../units/getInitialUnits";
import { getGridSide } from "./getGridSide";

export const initMap = () => {
  const tribes = state$.units.tribes.get();
  const gridSide = getGridSide(tribes.length);

  const HexTile = defineHex({ orientation: Orientation.POINTY });

  const grid = new Grid(HexTile, spiral({ radius: gridSide, start: [0, 0] }));

  const hexById = grid.reduce<State["map"]["hexById"]>((acc, hex) => {
    acc[hex.toString()] = hex;

    return acc;
  }, {});

  state$.map.grid.set(grid);

  state$.map.hexById.set(hexById);

  setInitialUnits();
};
