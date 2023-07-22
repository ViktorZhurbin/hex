import { Accessor, Setter, Show } from "solid-js";
import { SetStoreFunction, produce } from "solid-js/store";
import type { THex } from "../../types/Hex";
import { HexState } from "../../constants/hex";
import { Player } from "../Player/Player";
import styles from "./Hex.module.css";
import { getState } from "./state";
import { TSelectedHex } from "../HexGrid/HexGrid";

type HexProps = {
  hex: Accessor<THex>;
  setMap: SetStoreFunction<THex[][]>;
  selectedHex: Accessor<TSelectedHex>;
  setSelectedHex: Setter<TSelectedHex>;
};

export const Hex = (props: HexProps) => {
  let { hex, setMap, selectedHex, setSelectedHex } = $destructure(props);

  const hasUnit = $(Boolean(hex().unitId));
  const isSelected = $(hex().id === selectedHex()?.id);
  const state = $(getState(hasUnit));

  const isUnitSelected = $(
    isSelected && hasUnit && selectedHex()?.state === HexState.Unit,
  );

  const selectedHexHasUnitSelected = $(
    Boolean(selectedHex()?.unitId) && selectedHex()?.state === HexState.Unit,
  );

  const handleMoveUnit = () => {
    setMap(
      produce((s) => {
        if (!selectedHex()?.unitId) {
          return;
        }

        const nextUnitHex = s[hex().row][hex().col];
        nextUnitHex.unitId = selectedHex()?.unitId ?? null;

        const prevUnitHex = s[selectedHex()!.row][selectedHex()!.col];
        prevUnitHex.unitId = null;
      }),
    );
  };

  const handleClick = () => {
    if (!hasUnit && selectedHexHasUnitSelected) {
      handleMoveUnit();
      setSelectedHex(null);

      return;
    }

    isSelected ? state.next() : state.init();

    const nextHex = state.current ? { ...hex(), state: state.current } : null;
    setSelectedHex(nextHex);
  };

  return (
    <div
      classList={{
        [styles.hex]: true,
        [styles.selected]: isSelected,
      }}
      onClick={handleClick}
    >
      <Show when={hasUnit}>
        <Player id={hex().unitId} isSelected={isUnitSelected} />
      </Show>
    </div>
  );
};
