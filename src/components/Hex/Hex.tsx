import { Accessor, Show } from "solid-js";
import { Player } from "../Player/Player";
import styles from "./Hex.module.css";

type HexProps = {
  hasUnit: Accessor<boolean>;
  isUnitSelected: Accessor<boolean>;
  isShifted: boolean;
  onClick: () => void;
};

export const Hex = (props: HexProps) => {
  return (
    <div
      classList={{
        [styles.hex]: true,
        [styles.shifted]: props.isShifted,
        [styles.current]: props.hasUnit(),
      }}
      onClick={() => {
        if (!props.hasUnit() && props.isUnitSelected()) {
          props.onClick();
        }
      }}
    >
      <Show when={props.hasUnit()}>
        <Player isSelected={props.isUnitSelected} />
      </Show>
    </div>
  );
};
