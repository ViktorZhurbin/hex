import { THex } from "../../types/map";
import styles from "./Unit.module.css";

type UnitProps = {
  id: THex["unitId"];
  isSelected: boolean;
};

export const Unit = (props: UnitProps) => {
  return (
    <div
      classList={{ [styles.root]: true, [styles.selected]: props.isSelected }}
    />
  );
};
