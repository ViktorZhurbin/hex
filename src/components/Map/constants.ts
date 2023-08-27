import { Colors } from "../../constants/colors";

export enum TileState {
  default = "default",
  highlighted = "highlighted",
  selected = "selected",
}

export const TileColorByState = {
  [TileState.default]: Colors.green,
  [TileState.highlighted]: Colors.purple,
  [TileState.selected]: Colors.darkGreen,
};
