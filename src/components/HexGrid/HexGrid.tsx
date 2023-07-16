import { Index, createMemo, createSignal } from "solid-js";
import styles from "./HexGrid.module.css";
import { Hex } from "../Hex/Hex";

const ROWS = 4;
const HEXES_PER_ROW = 4;

const HEXES = Array.from(Array(HEXES_PER_ROW * ROWS).keys());

export const HexGrid = () => {
  const [playerPosition, setPlayerPosition] = createSignal(0);
  const [isPlayerSelected, setPlayerSelected] = createSignal(false);

  return (
    <div class={styles.root}>
      <Index each={HEXES}>
        {(_, index) => {
          const isCurrentPlayerHex = createMemo(
            () => index === playerPosition(),
          );
          const isEvenRow =
            index === HEXES_PER_ROW ||
            Math.floor(index / HEXES_PER_ROW) % 2 > 0;

          return (
            <Hex
              hasUnit={isCurrentPlayerHex}
              isUnitSelected={isPlayerSelected}
              isShifted={isEvenRow}
              onClick={() => {
                if (!isCurrentPlayerHex() && isPlayerSelected()) {
                  setPlayerPosition(index);
                  setPlayerSelected(false);
                }
              }}
            />
          );
        }}
      </Index>
    </div>
  );
};
