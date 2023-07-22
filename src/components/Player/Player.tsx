import styles from "./Player.module.css";
import { THex } from "../../types/Hex";

type PlayerProps = {
  id: THex["unitId"];
  isSelected: boolean;
};

export const Player = (props: PlayerProps) => {
  return (
    <div
      classList={{ [styles.root]: true, [styles.selected]: props.isSelected }}
    />
  );
};
