import { Index, Show, createMemo, createSignal } from "solid-js";
import styles from "./HexGrid.module.css";
import { Player } from "../Player/Player";

const HEX_PER_SIDE = 16;
const HEXES = Array.from(Array(HEX_PER_SIDE).keys());

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

          return (
            <div
              classList={{
                [styles.hex]: true,
                [styles.current]: isCurrentPlayerHex(),
              }}
              onClick={() => {
                if (!isCurrentPlayerHex() && isPlayerSelected()) {
                  console.log({
                    isCurrentPlayerHex,
                    isPlayerSelected: isPlayerSelected(),
                  });
                  setPlayerPosition(index);
                  setPlayerSelected(false);
                }
              }}
            >
              <Show when={isCurrentPlayerHex()}>
                <Player
                  isSelected={isPlayerSelected}
                  setSelected={setPlayerSelected}
                />
              </Show>
            </div>
          );
        }}
      </Index>
    </div>
  );
};
