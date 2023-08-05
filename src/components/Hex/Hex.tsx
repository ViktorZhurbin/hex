import { Edges } from "@react-three/drei/core/Edges";
// import { Hex as THex } from "honeycomb-grid";
// import { Shape, Vector2 } from "three/src/Three.js";
// import { Vector3 } from "three/src/math/Vector3.js";

export function Hex(/* hex: THex */) {
  // const shape = hex.corners.map(({ x, y }) => [x, y]);
  // const vertices = hex.corners.map(({ x, y }) => new Vector2(x, y));

  return (
    <group>
      <mesh>
        {/* <shapeGeometry args={[vertices]} /> */}
        {/* <geometry vertices={vertices} /> */}
        <meshStandardMaterial transparent />
        <Edges />
      </mesh>
    </group>
  );
}
