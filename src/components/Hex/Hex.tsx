import { Accessor, Setter, Show } from "solid-js";

import { THex } from "../../types/map";
import { TSelectedHex, TSelectedUnit } from "../HexGrid/HexGrid";
import { Unit } from "../Unit/Unit";
import styles from "./Hex.module.css";

type HexProps = {
  hex: Accessor<THex>;
  isHighlighted: boolean;
  onMoveUnit: (next: THex) => void;
  selectedHex: Accessor<TSelectedHex>;
  selectedUnit: Accessor<TSelectedUnit>;
  setSelectedHex: Setter<TSelectedHex>;
  setSelectedUnit: Setter<TSelectedUnit>;
};

export const Hex = (props: HexProps) => {
  let {
    hex,
    isHighlighted,
    onMoveUnit,
    selectedHex,
    selectedUnit,
    setSelectedHex,
    setSelectedUnit,
  } = $destructure(props);

  const hasUnit = $(Boolean(hex().unitId));
  const isSelected = $(hex().id === selectedHex()?.id);
  const isUnitSelected = $(selectedUnit()?.unitId === hex().unitId);

  const handleClick = () => {
    if (!hasUnit && isHighlighted && selectedUnit()) {
      onMoveUnit(hex());

      return;
    }

    if (hex().unitId) {
      setSelectedUnit(hex());
      setSelectedHex(null);
      return;
    }

    setSelectedHex(isSelected ? null : hex());
    setSelectedUnit(null);
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
