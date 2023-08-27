import { Grid, Orientation, defineHex, spiral } from "honeycomb-grid";

import { State, state$ } from "../../store";
import { setInitialUnits } from "../units/getInitialUnits";
import { getGridSide } from "./getGridSide";

export const initMap = () => {
  const tribes = state$.tribes.get();
  const gridSide = getGridSide(tribes.length);

  const HexTile = defineHex({ orientation: Orientation.POINTY });

  const grid = new Grid(HexTile, spiral({ radius: gridSide, start: [0, 0] }));

  const hexById = grid.reduce<State["hexById"]>((acc, hex) => {
    acc[hex.toString()] = hex;

    return acc;
  }, {});

  state$.grid.set(grid);
  state$.gridHexes.set(grid.toArray());

  state$.hexById.set(hexById);

  setInitialUnits();
};
