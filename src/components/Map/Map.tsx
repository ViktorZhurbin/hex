import { For } from "@legendapp/state/react";

import { mapHexes$ } from "../../state/selectors/map";
import { MapTile } from "./MapTile";

export const Map = () => (
  <group>
    <For each={mapHexes$} optimized>
      {(hex$) => <MapTile hex={hex$.get()} />}
    </For>
  </group>
);
