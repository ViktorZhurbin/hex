import { Index, createSignal, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";
import styles from "./HexGrid.module.css";
import { Hex } from "../Hex/Hex";
import type { THex } from "../../types/Hex";

const HEXES_PER_SIDE = 4;

const SIDE = Array.from(Array(HEXES_PER_SIDE));

const initialMap: THex[][] = SIDE.map((_, rowIndex) =>
  SIDE.map((_, colIndex) => {
    return {
      coords: {
        row: rowIndex,
        col: colIndex,
      },
      unitId: null,
    };
  }),
);

export const HexGrid = () => {
  const [map, setMap] = createStore(initialMap);
  const [selectedHex, setSelectedHex] = createSignal<THex["coords"] | null>(
    null,
  );
  const [selectedUnit, setSelectedUnit] = createSignal<THex["unitId"] | null>(
    null,
  );

  onMount(() => {
    setMap(
      produce((s) => {
        s[0][0].unitId = "id";
      }),
    );
  });

  return (
    <div class={styles.root}>
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
                {(hex) => {
                  return (
                    <Hex
                      hex={hex}
                      setMap={setMap}
                      selectedHex={selectedHex}
                      setSelectedHex={setSelectedHex}
                      selectedUnit={selectedUnit}
                      setSelectedUnit={setSelectedUnit}
                    />
                  );
                }}
              </Index>
            </div>
          );
        }}
      </Index>
    </div>
  );
};
