import { computed } from "@legendapp/state";
import { useSelector } from "@legendapp/state/react";
import type { Hex } from "honeycomb-grid";
import type { UnitInstance } from "~/types/Unit";
import { state$ } from "..";

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
