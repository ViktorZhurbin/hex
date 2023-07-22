import { Index, createSignal, createUniqueId, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import type { THex } from "../../types/Hex";
import { Hex } from "../Hex/Hex";
import styles from "./HexGrid.module.css";

const HEXES_PER_SIDE = 4;

const SIDE = Array.from(Array(HEXES_PER_SIDE));

const initialMap: THex[][] = SIDE.map((_, rowIndex) =>
  SIDE.map((_, colIndex) => {
    return {
      id: createUniqueId(),
      row: rowIndex,
      col: colIndex,
      cell: [rowIndex, colIndex],
      unitId: null,
    };
  }),
);

export const HexGrid = () => {
  const [map, setMap] = createStore(initialMap);
  const [selectedHex, setSelectedHex] = createSignal<{
    hex: THex;
    state: string;
  } | null>(null);

  onMount(() => {
    setMap(
      produce((s) => {
        s[0][0].unitId = "id";
      }),
    );
  });

  return (
    <div class={styles.root}>
      <div>{selectedHex()?.state}</div>
      <Index each={map}>
        {(row, rowIndex) => {
          return (
            <div
              classList={{
                [styles.row]: true,
                [styles.rowEven]: (rowIndex + 1) % 2 === 0,
              }}
            >
              <Index each={row()}>
                {(hex) => (
                  <Hex
                    hex={hex}
                    setMap={setMap}
                    selectedHex={selectedHex}
                    setSelectedHex={setSelectedHex}
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
