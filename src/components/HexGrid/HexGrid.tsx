import { Index, createSignal, onMount } from "solid-js";
import type { THex } from "../../types/map";
import { Hex } from "../Hex/Hex";
import styles from "./HexGrid.module.css";
import { createStore, produce } from "solid-js/store";
import { getInitialMap, getStartUnitPositions } from "./helpers/map";
// import { TUnitInstance } from "../../types/Unit";
import { getInitialUnitsByTribe } from "./helpers/unit";
import { TTribes } from "../../constants/tribe";
import { getMapHex } from "../../utils/map";

export type TSelectedHex =
  | (THex & {
      state: string;
    })
  | null;

export const HexGrid = (props: { tribes: TTribes[] }) => {
  const [map, setMap] = createStore(getInitialMap(props.tribes.length));
  const [units] = createStore(getInitialUnits(props.tribes));

  const [selectedHex, setSelectedHex] = createSignal<TSelectedHex>(null);
  // const [selectedUnit, setSelectedUnit] = createSignal<TUnitInstance | null>(null);

  onMount(() => {
    const startPositions = getStartUnitPositions(props.tribes, units);

    startPositions.forEach(({ unitId, row, col }) => {
      setMap(
        produce((map) => {
          const hex = getMapHex(map, { row, col });
          hex.unitId = unitId;
        }),
      );
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
