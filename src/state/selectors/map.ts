import { computed } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";
import { Hex } from "honeycomb-grid";

import { state$ } from "..";
import { UnitInstance } from "../../types/Unit";

export const mapHexes$ = computed(() => state$.grid.get()?.toArray());

export const hexesById$ = computed(() =>
  state$.grid.reduce<Record<string, Hex>>((acc, hex) => {
    acc[hex.toString()] = hex;

    return acc;
  }, {}),
);

export const selectedHex$ = computed(() => {
  const selectedHexId = state$.selection.selectedHexId.get();

  return hexesById$[selectedHexId].get();
});

export const useHexByUnitId = (unitId: UnitInstance["id"]) => {
  const hex = useSelector(() => {
    const hexId = state$.mappings.unitIdToHexId[unitId].get();

    return hexesById$[hexId].get();
  });

  return hex;
};

// export const isHexHighlighted = computed(() => {
//   const moveArea = state$.selection.moveArea.get();

//   const isTileHighlighted = hex !== undefined && moveArea?.hasHex(hex);

//   return isTileHighlighted;
// });
