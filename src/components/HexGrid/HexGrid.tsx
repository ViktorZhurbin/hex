import { Index, createSignal, onMount } from "solid-js";
import { createStore, produce } from "solid-js/store";

import type { THex } from "../../types/map";

import { HexState } from "../../constants/hex";
import { TTribes } from "../../constants/tribe";
import { TUnitInstance } from "../../types/unit";
import { getIsEven, getMapHex } from "../../utils/map";
import { Hex } from "../Hex/Hex";
import styles from "./HexGrid.module.css";
import { getInitialMap, getStartUnitPositions } from "./helpers/map";
import { getInitialUnits, getMovementArea } from "./helpers/unit";

export type TSelectedHex = (THex & { state: string }) | null;

export const HexGrid = (props: { tribes: TTribes[] }) => {
  const [map, setMap] = createStore(getInitialMap(props.tribes.length));
  const [units] = createStore(getInitialUnits(props.tribes));

  const [selectedHex, setSelectedHex] = createSignal<TSelectedHex>(null);
  const [selectedUnit, setSelectedUnit] = createSignal<TUnitInstance | null>(
    null,
  );
  const [highlighted, setHighlighted] = createSignal<
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

  $effect(() => {
    const hex = $(selectedHex());
    const isUnitSelected = hex?.state === HexState.Unit;

    if (!isUnitSelected || !hex?.unitId) {
      setHighlighted({ cols: [], rows: [] });
      return;
    }

    const unit = units[hex.unitId];

    setHighlighted(getMovementArea(hex, unit.speed));
  });

  const handleMoveUnit = (nextHex: THex) => {
    const prevHex = selectedHex();

    if (!prevHex?.unitId || nextHex.unitId) {
      return;
    }

    if (
      !highlighted().rows.includes(nextHex.row) ||
      !highlighted().cols.includes(nextHex.col)
    ) {
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
                [styles.isEven]: getIsEven(rowIndex),
                [styles.row]: true,
              }}
            >
              <Index each={row()}>
                {(hex) => {
                  const isHighlighted = $(
                    highlighted()[hex().row]?.includes(hex().col),
                  );

                  return (
                    <Hex
                      hex={hex}
                      isHighlighted={isHighlighted}
                      onMoveUnit={handleMoveUnit}
                      selectedHex={selectedHex}
                      setSelectedHex={setSelectedHex}
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
