import { Accessor } from "solid-js";
import styles from "./Player.module.css";

type PlayerProps = {
  isSelected: Accessor<boolean>;
};

export const Player = (props: PlayerProps) => {
  return (
    <div
      classList={{ [styles.root]: true, [styles.selected]: props.isSelected() }}
    />
  );
};
