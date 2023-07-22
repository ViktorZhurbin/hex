import { Accessor, Show } from "solid-js";

import { THex } from "../../types/map";
import { TSelectedHex } from "../HexGrid/HexGrid";
import { Unit } from "../Unit/Unit";
import styles from "./Hex.module.css";

type HexProps = {
  hex: Accessor<THex>;
  isHighlighted: boolean;
  onClick: (hex: THex) => void;
  selectedHex: Accessor<TSelectedHex>;
};

export const Hex = (props: HexProps) => {
  let { hex, isHighlighted, onClick, selectedHex } = $destructure(props);

  const hasUnit = $(Boolean(hex().unitId));
  const isSelected = $(hex().id === selectedHex()?.id);
  const isUnitSelected = $(
    isHighlighted && selectedHex()?.unitId === hex().unitId,
  );

  return (
    <div
      classList={{
        [styles.hex]: true,
        [styles.isHighlighted]: !isSelected && isHighlighted,
        [styles.isSelected]: isSelected,
      }}
      onClick={() => onClick(hex())}
    >
      <Show when={hasUnit}>
        <Unit id={hex().unitId} isSelected={isUnitSelected} />
      </Show>
    </div>
  );
};
