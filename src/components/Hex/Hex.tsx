import { Accessor, Setter, Show, createMemo } from "solid-js";
import type { THex } from "../../types/Hex";
import { Player } from "../Player/Player";
import styles from "./Hex.module.css";
import { SetStoreFunction, produce } from "solid-js/store";

type HexProps = {
  hex: Accessor<THex>;
  setMap: SetStoreFunction<THex[][]>;
  selectedHex: Accessor<{ hex: THex | null; count: number }>;
  setSelectedHex: Setter<{ hex: THex | null; count: number }>;
};

export const Hex = (props: HexProps) => {
  const isHexSelected = createMemo(
    () => props.hex().id === props.selectedHex()?.hex?.id,
  );

  const isUnitSelected = createMemo(
    () =>
      props.hex().unitId === props.selectedHex()?.hex?.unitId &&
      props.selectedHex().count === 1,
  );

  const handleUnselect = () => {
    props.setSelectedHex({ hex: null, count: 0 });
  };

  const handleClickHexWithUnit = () => {
    if (props.selectedHex().count === 0) {
      props.setSelectedHex({ hex: props.hex(), count: 1 });
    } else if (props.selectedHex().count === 1) {
      props.setSelectedHex({ hex: props.hex(), count: 2 });
    } else if (props.selectedHex().count === 2) {
      handleUnselect();
    }
  };

  const handleMoveUnit = () => {
    console.log("handleMoveUnit");
    props.setMap(
      produce((s) => {
        const nextUnitHex = s[props.hex().row][props.hex().col];
        nextUnitHex.unitId = props.selectedHex()?.hex?.unitId ?? null;

        const prevUnitHex =
          s[props.selectedHex()!.hex!.row][props.selectedHex()!.hex!.col];
        prevUnitHex.unitId = null;
      }),
    );
  };

  const handleClickHexWithoutUnit = () => {
    if (isHexSelected()) {
      handleUnselect();
      return;
    }

    if (props.selectedHex()?.hex?.unitId) {
      handleMoveUnit();
      handleUnselect();
    } else {
      props.setSelectedHex({ hex: props.hex(), count: 1 });
    }
  };

  const handleClick = () => {
    if (props.hex().unitId) {
      handleClickHexWithUnit();
    } else {
      handleClickHexWithoutUnit();
    }
  };

  return (
    <div
      classList={{
        [styles.hex]: true,
        [styles.selected]: isHexSelected(),
      }}
      onClick={handleClick}
    >
      <Show when={props.hex().unitId}>
        <Player id={props.hex().unitId} isSelected={isUnitSelected} />
      </Show>
    </div>
  );
};
