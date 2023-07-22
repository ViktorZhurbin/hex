import { Index, createSignal, onMount } from "solid-js";
import type { THex } from "../../types/map";
import { Hex } from "../Hex/Hex";
import styles from "./HexGrid.module.css";
import { createStore, produce } from "solid-js/store";
import { getInitialMap, getStartUnitPositions } from "./helpers/map";
// import { TUnitInstance } from "../../types/Unit";
import { getInitialUnits, getMovementArea } from "./helpers/unit";
import { TTribes } from "../../constants/tribe";
import { getMapHex, getIsEven } from "../../utils/map";
import { HexState } from "../../constants/hex";

export type TSelectedHex =
  | (THex & {
      state: string;
    })
  | null;

export const HexGrid = (props: { tribes: TTribes[] }) => {
  const [map, setMap] = createStore(getInitialMap(props.tribes.length));
  const [units] = createStore(getInitialUnits(props.tribes));

  const [selectedHex, setSelectedHex] = createSignal<TSelectedHex>(null);
  const [highlighted, setHighlighted] = createSignal<
    ReturnType<typeof getMovementArea>
  >({});

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

  $effect(() => {
    const hex = $(selectedHex());
    const isUnitSelected = hex?.state === HexState.Unit;

    if (!isUnitSelected || !hex?.unitId) {
      setHighlighted({ rows: [], cols: [] });
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
                [styles.row]: true,
                [styles.isEven]: getIsEven(rowIndex),
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
                      selectedHex={selectedHex}
                      setSelectedHex={setSelectedHex}
                      onMoveUnit={handleMoveUnit}
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
