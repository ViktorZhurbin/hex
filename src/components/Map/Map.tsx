import { For } from "@legendapp/state/react";

import { mapHexes$ } from "../../state/selectors/map";
import { Units } from "../Units/Units";
import { MapTile } from "./MapTile";

export const Map = () => {
  return (
    <>
      <group>
        <For each={mapHexes$} optimized>
          {(hex) => <MapTile hex$={hex} />}
        </For>
      </group>
      <Units />
    </>
  );
};
