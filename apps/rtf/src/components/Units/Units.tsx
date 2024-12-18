import { unitIds$ } from "@hex/state/src/selectors/units";
import { For } from "@legendapp/state/react";
import { Unit } from "../Unit/Unit";

export const Units = () => {
	return (
		<For each={unitIds$} optimized>
			{(unitId$) => <Unit unitId={unitId$.get()} />}
		</For>
	);
};
