import { Tribes } from "../types/tribe";
import type { UnitType } from "../types/unit";

export const START_UNITS_BY_TRIBE: Record<Tribes, UnitType[]> = {
	[Tribes.tribeOne]: ["typeOne", "typeTwo"],
	[Tribes.tribeTwo]: ["typeOne", "typeTwo"],
};
