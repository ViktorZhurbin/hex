import { computed } from "@legendapp/state";
import { Hex } from "honeycomb-grid";

import { state$ } from "..";

export const mapHexes$ = computed(() => state$.grid.get()?.toArray());

export const hexesById$ = computed(() =>
  state$.grid.reduce<Record<string, Hex>>((acc, hex) => {
    acc[hex.toString()] = hex;

    return acc;
  }, {}),
);
