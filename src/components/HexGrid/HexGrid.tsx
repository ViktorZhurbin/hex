import { Index } from "solid-js";
import styles from "./HexGrid.module.css";

const HEX_PER_SIDE = 16;
const HEXES = Array.from(Array(HEX_PER_SIDE).keys());

export const HexGrid = () => {
  return (
    <div class={styles.root}>
      <Index each={HEXES}>{() => <div class={styles.hex} />}</Index>
    </div>
  );
};
