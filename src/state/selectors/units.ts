import { computed } from "@legendapp/state";

import { state$ } from "..";

export const unitsByTribe$ = computed(() => {
  const unitsByTribe = state$.units.unitsByTribe.get();

  return Object.values(unitsByTribe);
});
