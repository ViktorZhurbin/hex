import { Accessor, Setter, Show } from "solid-js";
import type { THex } from "../../types/Hex";
import { HexState } from "../../constants/hex";
import { Player } from "../Player/Player";
import styles from "./Hex.module.css";
import { getState } from "./state";
import { TSelectedHex } from "../HexGrid/HexGrid";

type HexProps = {
  hex: Accessor<THex>;
  selectedHex: Accessor<TSelectedHex>;
  setSelectedHex: Setter<TSelectedHex>;
  onMoveUnit: (next: THex) => void;
};

export const Hex = (props: HexProps) => {
  let { hex, selectedHex, setSelectedHex, onMoveUnit } = $destructure(props);

  const hasUnit = $(Boolean(hex().unitId));
  const state = $(getState(hasUnit));
  const isSelected = $(hex().id === selectedHex()?.id);

  const hasSelectedHexUnitSelected = $(selectedHex()?.state === HexState.Unit);
  const isUnitSelected = $(isSelected && hasUnit && hasSelectedHexUnitSelected);

  const handleClick = () => {
    if (!hasUnit && hasSelectedHexUnitSelected) {
      onMoveUnit(hex());

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
