import type { Tribes } from "./tribe";

export type UnitType = "typeOne" | "typeTwo";

export type UnitBase = {
	speed: number;
	type: UnitType;
};

export type UnitInstance = UnitBase & {
	id: string;
	tribe: Tribes;
};
