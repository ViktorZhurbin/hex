const SIDE_LENGTH_PER_TRIBE = 2;

export const getGridSide = (tribesCount: number) =>
	tribesCount * SIDE_LENGTH_PER_TRIBE;
