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

  const [moveArea, setMoveArea] = createSignal<
    ReturnType<typeof getMovementArea>
  >({});

  onMount(() => {
    const startPositions = getStartUnitPositions(props.tribes, units);

    startPositions.forEach(({ col, row, unitId }) => {
      setMap(
        produce((map) => {
          const hex = getMapHex(map, { col, row });
          if (hex) {
            hex.unitId = unitId;
          }
        }),
      );
    });
  });

  const currentHex = $(selectedHex());

  const handleMoveUnit = (nextHex: THex) => {
    console.log({
      col: nextHex.col,
      moveArea: moveArea(),
      row: nextHex.row,
    });
    if (!currentHex || !moveArea()[nextHex.row]?.includes(nextHex.col)) {
      console.log(
        "handleMoveUnit",
        !moveArea()[nextHex.row]?.includes(nextHex.col),
      );
      return;
    }

    setMap(
      produce((map) => {
        const nextTile = getMapHex(map, nextHex);
        if (nextTile) {
          nextTile.unitId = currentHex?.unitId;
        }
        const prevTile = getMapHex(map, currentHex);
        if (prevTile) {
          prevTile.unitId = null;
        }
      }),
    );
  };

  const handleClickHex = (nextHex: THex) => {
    if (nextHex?.id === currentHex?.id) {
      setMoveArea({});
      setSelectedHex(null);
      return;
    }

    if (
      currentHex?.unitId &&
      !nextHex.unitId &&
      moveArea()[nextHex.row]?.includes(nextHex.col)
    ) {
      handleMoveUnit(nextHex);
      setSelectedHex(null);
      setMoveArea({});
      return;
    }

    setSelectedHex(nextHex);

    if (nextHex?.unitId) {
      const unit = units[nextHex.unitId];

      setMoveArea(getMovementArea(nextHex, unit.speed));
    } else {
      setMoveArea({});
    }
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
                      onClick={handleClickHex}
                      selectedHex={selectedHex}
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
