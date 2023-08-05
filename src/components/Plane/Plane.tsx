import { Vector3 } from "@react-three/fiber";
import { ThreeEvent } from "@react-three/fiber/dist/declarations/src/core/events";
import { useState } from "react";
import { DoubleSide } from "three/src/constants.js";

import { HighlightSquare } from "./HighlightSquare/HighlightSquare";

const GRID_SIZE: [width: number, height: number] = [20, 20];

export const Plane = () => {
  const [highlightPosition, setHighlightPosition] = useState<Vector3 | null>(
    null,
  );

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    const highlightPos = e.intersections[0].point
      .floor()
      .addScalar(0.5)
      .setY(0)
      .toArray();

    setHighlightPosition(highlightPos);
  };

  return (
    <>
      <mesh onPointerMove={handlePointerMove} rotation-x={-Math.PI / 2}>
        <planeGeometry args={GRID_SIZE} />
        <meshStandardMaterial side={DoubleSide} visible={false} />
      </mesh>
      <gridHelper args={GRID_SIZE} />
      <HighlightSquare position={highlightPosition} />
    </>
  );
};
