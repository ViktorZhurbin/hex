import { unitIds$ } from "../../state/selectors/units";
import { Unit } from "../Unit/Unit";

export const Units = () => {
  const unitIds = unitIds$.get();

  return unitIds.map((unitId) => {
    return <Unit key={unitId} unitId={unitId} />;
  });
};
