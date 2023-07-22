import { Index, createSignal, onMount } from "solid-js";
import type { THex } from "../../types/Hex";
import { Hex } from "../Hex/Hex";
import styles from "./HexGrid.module.css";
import { createStore, produce } from "solid-js/store";
import { getMapHex, initialMap } from "./helpers";

export type TSelectedHex =
  | (THex & {
      state: string;
    })
  | null;

export const HexGrid = () => {
  const [map, setMap] = createStore(initialMap);

  const [selectedHex, setSelectedHex] = createSignal<TSelectedHex>(null);

  onMount(() => {
    setMap(
      $produce((s) => {
        s[0][0].unitId = "id";
      }),
    );
  });

  const handleMoveUnit = (nextHex: THex) => {
    const prevHex = selectedHex();

    if (!prevHex?.unitId || nextHex.unitId) {
      return;
    }

    setMap(
      produce((map) => {
        getMapHex(map, nextHex).unitId = prevHex.unitId;
        getMapHex(map, prevHex).unitId = null;
      }),
    );
    setSelectedHex(null);
  };

  return (
    <div class={styles.root}>
      <div>{selectedHex()?.state}</div>
      <Index each={map}>
        {(row, rowIndex) => {
          return (
            <div
              classList={{
                [styles.row]: true,
                [styles.isEven]: (rowIndex + 1) % 2 === 0,
              }}
            >
              <Index each={row()}>
                {(hex) => (
                  <Hex
                    hex={hex}
                    selectedHex={selectedHex}
                    setSelectedHex={setSelectedHex}
                    onMoveUnit={handleMoveUnit}
                  />
                )}
              </Index>
            </div>
          );
        }}
      </Index>
    </div>
  );
};
