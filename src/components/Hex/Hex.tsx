import { Accessor, Setter, Show } from "solid-js";
import { HexState } from "../../constants/hex";
import { Unit } from "../Unit/Unit";
import styles from "./Hex.module.css";
import { getState } from "./state";
import { TSelectedHex } from "../HexGrid/HexGrid";
import { THex } from "../../types/map";

type HexProps = {
  hex: Accessor<THex>;
  isHighlighted: boolean;
  selectedHex: Accessor<TSelectedHex>;
  setSelectedHex: Setter<TSelectedHex>;
  onMoveUnit: (next: THex) => void;
};

export const Hex = (props: HexProps) => {
  let { hex, isHighlighted, selectedHex, setSelectedHex, onMoveUnit } =
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
        [styles.isSelected]: isSelected,
        [styles.isHighlighted]: !isSelected && isHighlighted,
      }}
      onClick={handleClick}
    >
      <Show when={hasUnit}>
        <Unit id={hex().unitId} isSelected={isUnitSelected} />
      </Show>
    </div>
  );
};
