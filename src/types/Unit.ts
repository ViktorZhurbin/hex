import type { Tribes } from "../constants/tribe";

export type UnitBase = {
	speed: number;
	type: string;
};

export type UnitInstance = UnitBase & {
	id: string;
	tribe: Tribes;
};
