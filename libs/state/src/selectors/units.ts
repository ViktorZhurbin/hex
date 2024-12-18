import { computed } from "@legendapp/state";
import { state$ } from "../state";

export const unitsByTribe$ = computed(() => {
	const unitsByTribe = state$.units.unitsByTribe.get();

	return Object.values(unitsByTribe);
});

export const unitIds$ = computed(() => {
	const unitIdToHexId = state$.mappings.unitIdToHexId.get();

	return Object.keys(unitIdToHexId);
});
