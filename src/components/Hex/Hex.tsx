import { Accessor, Setter, Show, createMemo } from "solid-js";
import { SetStoreFunction, produce } from "solid-js/store";
import type { THex } from "../../types/Hex";
import { HexState } from "../../constants/hex";
import { Player } from "../Player/Player";
import styles from "./Hex.module.css";
import { getState } from "./state";

type HexProps = {
  hex: Accessor<THex>;
  setMap: SetStoreFunction<THex[][]>;
  selectedHex: Accessor<{ hex: THex; state: string } | null>;
  setSelectedHex: Setter<{ hex: THex; state: string } | null>;
};

export const Hex = (props: HexProps) => {
  const hasUnit = createMemo(() => Boolean(props.hex().unitId));

  const isSelected = createMemo(
    () => props.hex().id === props.selectedHex()?.hex?.id,
  );

  const state = createMemo(() => getState(hasUnit()));

  const isUnitSelected = createMemo(
    () =>
      isSelected() && hasUnit() && props.selectedHex()?.state === HexState.Unit,
  );

  const selectedHexHasUnitSelected = createMemo(
    () =>
      Boolean(props.selectedHex()?.hex?.unitId) &&
      props.selectedHex()?.state === HexState.Unit,
  );

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
    if (!hasUnit() && selectedHexHasUnitSelected()) {
      handleMoveUnit();
      props.setSelectedHex(null);

      return;
    }

    isSelected() ? state().next() : state().init();
    const nextValue = state().current
      ? { hex: props.hex(), state: state().current as string }
      : null;

    props.setSelectedHex(nextValue);
  };

  return (
    <div
      classList={{
        [styles.hex]: true,
        [styles.selected]: isSelected(),
      }}
      onClick={handleClick}
    >
      <Show when={hasUnit()}>
        <Player id={props.hex().unitId} isSelected={isUnitSelected} />
      </Show>
    </div>
  );
};
