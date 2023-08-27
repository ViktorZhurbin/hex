import { For } from "@legendapp/state/react";

import { state$ } from "../../store";
import { Units } from "../Units/Units";
import { MapTile } from "./MapTile";

export const Map = () => {
  return (
    <>
      <group>
        <For each={state$.gridHexes} optimized>
          {(hex) => <MapTile hex$={hex} />}
        </For>
      </group>
      <Units />
    </>
  );
};
