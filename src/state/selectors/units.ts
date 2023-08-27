import { computed } from "@legendapp/state";

import { state$ } from "..";
import { UnitInstance } from "../../types/Unit";

export const unitsByTribe$ = computed(() => {
  const unitsByTribe = state$.units.unitsByTribe.get();

  return Object.values(unitsByTribe);
});

export const unitIds$ = computed(() => {
  const unitIdToHexId = state$.mappings.unitIdToHexId.get();

  return Object.keys(unitIdToHexId);
});

export const useIsUnitSelected = (unitId: UnitInstance["id"]) => {
  const selectedUnitId = state$.selection.selectedUnitId.use();

  return selectedUnitId === unitId;
};
