import { Index, createSignal, onMount } from "solid-js";
import type { THex } from "../../types/Hex";
import { Hex } from "../Hex/Hex";
import styles from "./HexGrid.module.css";
import { createStore, produce } from "solid-js/store";

const HEXES_PER_SIDE = 4;

const SIDE = Array.from(Array(HEXES_PER_SIDE));

const initialMap: THex[][] = SIDE.map((_, rowIndex) =>
  SIDE.map((_, colIndex) => {
    return {
      id: $uid(),
      row: rowIndex,
      col: colIndex,
      cell: [rowIndex, colIndex],
    };
  }),
);

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
      produce((s) => {
        s[nextHex.row][nextHex.col].unitId = prevHex.unitId;
        s[prevHex.row][prevHex.col].unitId = null;
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
