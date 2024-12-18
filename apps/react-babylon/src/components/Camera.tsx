import { Tools, Vector3 } from "@babylonjs/core";
import { SIDE_LENGTH_PER_TRIBE } from "@hex/state/src/constants/map";

export const Camera = () => {
	const radius = SIDE_LENGTH_PER_TRIBE * 9;

	return (
		<arcRotateCamera
			name="camera1"
			alpha={Tools.ToRadians(0)}
			beta={Tools.ToRadians(45)}
			radius={radius}
			target={Vector3.Zero()}
			lowerAlphaLimit={0}
			upperAlphaLimit={0}
			lowerBetaLimit={0.5}
			upperBetaLimit={1.2}
			lowerRadiusLimit={6}
			upperRadiusLimit={radius + 6}
		/>
	);
};
