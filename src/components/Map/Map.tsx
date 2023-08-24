import { Grid, Orientation, defineHex, spiral } from "honeycomb-grid";

import { state$ } from "../../store/state";
import { getGridSide } from "../../utils/map/getGridSide";
import { MapTile } from "./MapTile";

type MapProps = {
  tribesCount: number;
};

export const Map = ({ tribesCount }: MapProps) => {
  const gridSide = getGridSide(tribesCount);

  const HexTile = defineHex({ orientation: Orientation.POINTY });

  const grid = new Grid(HexTile, spiral({ radius: gridSide, start: [0, 0] }));

  state$.grid.set(grid);

  const selectedHexString = state$.selectedHex.use()?.toString();
  console.log(selectedHexString);

  return (
    <group>
      {grid.toArray().map((hex) => {
        const isSelected = selectedHexString === hex.toString();

        return (
          <MapTile
            hex={hex}
            isSelected={isSelected}
            key={`${hex.x}_${hex.y}`}
          />
        );
      })}
    </group>
  );
};
