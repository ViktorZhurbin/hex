import { SIDE_LENGTH_PER_TRIBE } from "../../constants/grid";

export const getGridSide = (tribesCount: number) =>
  tribesCount * SIDE_LENGTH_PER_TRIBE;
