import { HexState } from "../../constants/hex";

type TGetState = {
  current: null | string;
  init: () => void;
  next: () => void;
  startingPoint: string;
};

export const getState = (hasUnit: boolean): TGetState => ({
  current: null,
  init() {
    this.current = this.startingPoint;
  },
  next() {
    switch (this.current) {
      case null:
        this.init();
        break;
      case HexState.Unit:
        this.current = HexState.Ground;
        break;
      case HexState.Ground:
        this.current = null;
        break;
    }
  },
  startingPoint: hasUnit ? HexState.Unit : HexState.Ground,
});
