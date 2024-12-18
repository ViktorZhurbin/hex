import { SIDE_LENGTH_PER_TRIBE } from "~/constants/map";

export const getGridSide = (tribesCount: number) =>
	tribesCount * SIDE_LENGTH_PER_TRIBE;
