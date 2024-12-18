import { observable } from "@legendapp/state";
import type { Grid, Hex } from "honeycomb-grid";
import { Tribes } from "./types/tribe";
import type { UnitInstance } from "./types/unit";

export type State = {
	grid: Grid<Hex> | null;
	mappings: {
		hexIdToUnitId: Record<string, UnitInstance["id"]>;
		unitIdToHexId: Record<string, string>;
	};
	selection: {
		moveArea: Grid<Hex> | null;
		selectedHexId: null | string;
		selectedUnitId: UnitInstance["id"] | null;
	};
	units: {
		tribes: Tribes[];
		unitsById: Record<string, UnitInstance>;
		unitsByTribe: Record<string, UnitInstance[]>;
	};
};

export const state$ = observable<State>({
	grid: null,
	mappings: {
		hexIdToUnitId: {},
		unitIdToHexId: {},
	},
	selection: {
		moveArea: null,
		selectedHexId: null,
		selectedUnitId: null,
	},
	units: {
		tribes: [Tribes.tribeOne, Tribes.tribeTwo],
		unitsById: {},
		unitsByTribe: {},
	},
});
