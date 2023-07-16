import { Accessor, Setter, Show, createEffect, createMemo } from "solid-js";
import type { THex } from "../../types/Hex";
import { Player } from "../Player/Player";
import styles from "./Hex.module.css";
import { SetStoreFunction, produce } from "solid-js/store";

type HexProps = {
  hex: Accessor<THex>;
  setMap: SetStoreFunction<THex[][]>;
  selectedHex: Accessor<THex["coords"] | null>;
  setSelectedHex: Setter<THex["coords"] | null>;
  selectedUnit: Accessor<THex["unitId"] | null>;
  setSelectedUnit: Setter<THex["unitId"] | null>;
};

export const Hex = (props: HexProps) => {
  const isSelected = createMemo(
    () =>
      props.selectedHex()?.row === props.hex().coords.row &&
      props.selectedHex()?.col === props.hex().coords.col,
  );

  createEffect(() => {
    console.log(isSelected());
  });

  const handleClickSelected = () => {
    if (props.hex().unitId) {
      props.setSelectedHex(props.hex().coords);
    } else {
      props.setSelectedHex(null);
    }
  };

  const handleClickUnselected = () => {
    if (props.selectedUnit() && !props.hex().unitId) {
      props.setMap(
        produce((s) => {
          // TODO: clear units prev position
          s[props.hex().coords.row][props.hex().coords.col].unitId =
            props.selectedUnit();
        }),
      );

      props.setSelectedUnit(null);
    }

    if (props.hex().unitId) {
      props.setSelectedUnit(props.hex().unitId);
    } else {
      props.setSelectedHex(props.hex().coords);
    }
  };

  const handleClick = () => {
    if (isSelected()) {
      handleClickSelected();
    } else {
      handleClickUnselected();
    }
  };

  const isUnitSelected = createMemo(
    () => props.hex().unitId === props.selectedUnit(),
  );

  return (
    <div
      classList={{
        [styles.hex]: true,
        [styles.current]: Boolean(props.hex().unitId),
      }}
      onClick={handleClick}
    >
      <Show when={props.hex().unitId}>
        <Player id={props.hex().unitId} isSelected={isUnitSelected} />
      </Show>
    </div>
  );
};
