import { Accessor, Setter, Show } from "solid-js";

import { HexState } from "../../constants/hex";
import { THex } from "../../types/map";
import { TSelectedHex } from "../HexGrid/HexGrid";
import { Unit } from "../Unit/Unit";
import styles from "./Hex.module.css";
import { getState } from "./state";

type HexProps = {
  hex: Accessor<THex>;
  isHighlighted: boolean;
  onMoveUnit: (next: THex) => void;
  selectedHex: Accessor<TSelectedHex>;
  setSelectedHex: Setter<TSelectedHex>;
};

export const Hex = (props: HexProps) => {
  let { hex, isHighlighted, onMoveUnit, selectedHex, setSelectedHex } =
    $destructure(props);

  const hasUnit = $(Boolean(hex().unitId));
  const state = $(getState(hasUnit));
  const isSelected = $(hex().id === selectedHex()?.id);

  const hasSelectedHexUnitSelected = $(selectedHex()?.state === HexState.Unit);
  const isUnitSelected = $(isSelected && hasUnit && hasSelectedHexUnitSelected);

  const handleClick = () => {
    if (!hasUnit && isHighlighted && hasSelectedHexUnitSelected) {
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
        [styles.isHighlighted]: !isSelected && isHighlighted,
        [styles.isSelected]: isSelected,
      }}
      onClick={handleClick}
    >
      <Show when={hasUnit}>
        <Unit id={hex().unitId} isSelected={isUnitSelected} />
      </Show>
    </div>
  );
};
