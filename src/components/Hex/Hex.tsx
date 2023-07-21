import { Accessor, Setter, Show, createMemo } from "solid-js";
import { SetStoreFunction, produce } from "solid-js/store";
import type { THex } from "../../types/Hex";
import { HexState } from "../../constants/hex";
import { Player } from "../Player/Player";
import styles from "./Hex.module.css";

type HexProps = {
  hex: Accessor<THex>;
  setMap: SetStoreFunction<THex[][]>;
  selectedHex: Accessor<{ hex: THex; step: number } | null>;
  setSelectedHex: Setter<{ hex: THex; step: number } | null>;
};

export const Hex = (props: HexProps) => {
  const hasUnit = createMemo(() => Boolean(props.hex().unitId));

  const isHexSelected = createMemo(
    () => props.hex().id === props.selectedHex()?.hex?.id,
  );

  const isUnitSelected = createMemo(
    () =>
      Boolean(props.selectedHex()?.hex?.unitId) &&
      props.hex().unitId === props.selectedHex()?.hex?.unitId &&
      props.selectedHex()?.step === HexState.UnitSelected,
  );

  const nextStep = createMemo(() => {
    if (!isHexSelected()) {
      return hasUnit() ? HexState.UnitSelected : HexState.GroundSelected;
    }

    if (isHexSelected() && hasUnit()) {
      if (props.selectedHex()?.step === HexState.UnitSelected) {
        return HexState.GroundSelected;
      }
    }

    return HexState.Idle;
  });

  const handleMoveUnit = () => {
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

  const handleClick = () => {
    if (
      !hasUnit() &&
      props.selectedHex()?.hex?.unitId &&
      props.selectedHex()?.step === HexState.UnitSelected
    ) {
      handleMoveUnit();
      props.setSelectedHex(null);

      return;
    }

    const nextValue =
      nextStep() === HexState.Idle
        ? null
        : { hex: props.hex(), step: nextStep() };

    props.setSelectedHex(nextValue);
  };

  return (
    <div
      classList={{
        [styles.hex]: true,
        [styles.selected]: isHexSelected(),
      }}
      onClick={handleClick}
    >
      <Show when={hasUnit()}>
        <Player id={props.hex().unitId} isSelected={isUnitSelected} />
      </Show>
    </div>
  );
};
