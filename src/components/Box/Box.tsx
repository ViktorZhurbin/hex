import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

export function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((_, delta) => (meshRef.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      onClick={() => setActive(!active)}
      onPointerOut={() => setHover(false)}
      onPointerOver={() => setHover(true)}
      ref={meshRef}
      scale={active ? 1.5 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
