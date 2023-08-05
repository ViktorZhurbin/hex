export type HexIdString = `${string}_${string}`;
export type HexIdArray = [number, number];

const divider = "_";
export const HexId = {
  fromArray: ([row, col]: number[]): HexIdString => `${row}${divider}${col}`,
  toArray: (hexId: HexIdString | string) =>
    hexId.split(divider).map(Number) as HexIdArray,
};
