import { Accessor, Setter } from "solid-js";
import styles from "./Player.module.css";

type PlayerProps = {
  isSelected: Accessor<boolean>;
  setSelected: Setter<boolean>;
};

export const Player = (props: PlayerProps) => {
  return (
    <div
      classList={{ [styles.root]: true, [styles.selected]: props.isSelected() }}
      onClick={() => props.setSelected((state) => !state)}
    />
  );
};
