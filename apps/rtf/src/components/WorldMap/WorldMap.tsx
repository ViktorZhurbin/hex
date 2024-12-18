import { mapHexes$ } from "@hex/state/src/selectors/map";
import { For } from "@legendapp/state/react";
import { MapTile } from "./MapTile";

export const WorldMap = () => (
	<group>
		<For each={mapHexes$} optimized>
			{(hex$) => <MapTile hex={hex$.get()} />}
		</For>
	</group>
);
