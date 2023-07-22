import { Index, createSignal, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";

import type { THex } from "../../types/map";

import { TTribes } from "../../constants/tribe";
import { getIsEven, getMapHex } from "../../utils/map";
import { Hex } from "../Hex/Hex";
import styles from "./HexGrid.module.css";
import { getInitialMap, getStartUnitPositions } from "./helpers/map";
import { getInitialUnits, getMovementArea } from "./helpers/unit";

export type TSelectedHex = THex | null;
export type TSelectedUnit = THex | null;

export const HexGrid = (props: { tribes: TTribes[] }) => {
  const [map, setMap] = createStore(getInitialMap(props.tribes.length));
  const [units] = createStore(getInitialUnits(props.tribes));

  const [selectedHex, setSelectedHex] = createSignal<TSelectedHex>(null);
  const [selectedUnit, setSelectedUnit] = createSignal<TSelectedUnit>(null);

  const [moveArea, setMoveArea] = createSignal<
    ReturnType<typeof getMovementArea>
  >({});

  onMount(() => {
    const startPositions = getStartUnitPositions(props.tribes, units);

    startPositions.forEach(({ col, row, unitId }) => {
      setMap(
        produce((map) => {
          const hex = getMapHex(map, { col, row });
          hex.unitId = unitId;
        }),
      );
    });
  });

  const hexWithUnit = $(selectedUnit());
  $effect(() => {
    if (!hexWithUnit?.unitId) {
      setMoveArea({ cols: [], rows: [] });
      return;
    }

    const unit = units[hexWithUnit.unitId];

    setMoveArea(getMovementArea(hexWithUnit, unit.speed));
  });

  const handleMoveUnit = (nextHex: THex) => {
    if (!hexWithUnit || nextHex.unitId) {
      return;
    }

    if (!moveArea()[nextHex.row]?.includes(nextHex.col)) {
      return;
    }

    setMap(
      produce((map) => {
        getMapHex(map, nextHex).unitId = hexWithUnit.unitId;
        getMapHex(map, hexWithUnit).unitId = null;
      }),
    );
    setSelectedHex(null);
  };

  return (
    <div class={styles.root}>
      <Index each={map}>
        {(row, rowIndex) => {
          return (
            <div
              classList={{
                [styles.isEven]: getIsEven(rowIndex),
                [styles.row]: true,
              }}
            >
              <Index each={row()}>
                {(hex) => {
                  const isHighlighted = $(
                    moveArea()[hex().row]?.includes(hex().col),
                  );

                  return (
                    <Hex
                      hex={hex}
                      isHighlighted={isHighlighted}
                      onMoveUnit={handleMoveUnit}
                      selectedHex={selectedHex}
                      selectedUnit={selectedUnit}
                      setSelectedHex={setSelectedHex}
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
