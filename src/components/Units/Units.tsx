import { For } from "@legendapp/state/react";

import { unitIds$ } from "../../state/selectors/units";
import { Unit } from "../Unit/Unit";

export const Units = () => {
	return (
		<For each={unitIds$} optimized>
			{(unitId$) => <Unit unitId={unitId$.get()} />}
		</For>
	);
};
