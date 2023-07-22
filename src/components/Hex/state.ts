import { HexState } from "../../constants/hex";

type TGetState = {
  current: string | null;
  startingPoint: string;
  init: () => void;
  next: () => void;
};

export const getState = (hasUnit: boolean): TGetState => ({
  current: null,
  startingPoint: hasUnit ? HexState.Unit : HexState.Ground,
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
});
