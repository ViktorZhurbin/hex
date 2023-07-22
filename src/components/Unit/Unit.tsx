import styles from "./Unit.module.css";
import { THex } from "../../types/Hex";

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
