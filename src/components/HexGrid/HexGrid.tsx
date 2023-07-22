import { Index, createSignal, onMount } from "solid-js";
import type { THex } from "../../types/Hex";
import { Hex } from "../Hex/Hex";
import styles from "./HexGrid.module.css";
import { createStore, produce } from "solid-js/store";
import { getMapHex, getInitialMap, getStartPositions } from "./helpers/map";
// import { TUnitInstance } from "../../types/Unit";
import { getInitialUnitsByTribe } from "./helpers/unit";
import { TTribes } from "../../constants/tribe";

export type TSelectedHex =
  | (THex & {
      state: string;
    })
  | null;

export const HexGrid = (props: { tribes: TTribes[] }) => {
  const [map, setMap] = createStore(getInitialMap(props.tribes.length));
  const [unitsByTribe, setUnitsByTribe] = createStore(
    getInitialUnitsByTribe(props.tribes),
  );

  onMount(() => {
    const startPositions = getStartPositions(props.tribes.length);
    props.tribes.forEach((tribe, index) => {
      const tribeUnitIds = Object.keys(unitsByTribe[tribe]);
      const [startRow, startCol] = startPositions[index];

      tribeUnitIds.forEach((unitId, index) => {
        const isEven = index > 0 && index % 2 === 0;
        const offset = isEven ? index + 1 : index - 1;

        setMap(
          produce((map) => {
            const col = startCol + offset;
            const row = startRow + offset;
            const hex = getMapHex(map, { row, col });
            hex.unitId = unitId;
          }),
        );
      });
    });
  });

  const [selectedHex, setSelectedHex] = createSignal<TSelectedHex>(null);
  // const [selectedUnit, setSelectedUnit] = createSignal<TUnitInstance | null>(null);

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
