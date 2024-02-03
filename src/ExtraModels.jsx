import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, a } from "@react-spring/three";
import { MeshWobbleMaterial } from "@react-three/drei";

const getDeviceType = () => {
  if (window.innerWidth < 768) return "mobile";
  else if (window.innerWidth >= 768 && window.innerWidth < 1024)
    return "tablet";
  else return "desktop";
};

const boxPosition = () => {
  const deviceType = getDeviceType();
  if (deviceType === "mobile") return [2, 2.8, 0];
  else if (deviceType === "tablet") return [3.5, 2.5, 0];
  else return [3.9, 2, 0];
};

const trianglePosition = () => {
  const deviceType = getDeviceType();
  if (deviceType === "mobile") return [-2.3, 2, 0];
  else if (deviceType === "tablet") return [-3.3, 2, 0];
  else return [-3.9, 2, 0];
};

const cone1Position = () => {
  const deviceType = getDeviceType();
  if (deviceType === "mobile") return [-2, -2, 0];
  else if (deviceType === "tablet") return [-4, -2, 0];
  else return [-5, -2, 0];
};

const cone2Position = () => {
  const deviceType = getDeviceType();
  if (deviceType === "mobile") return [2.5, -2, 0];
  else if (deviceType === "tablet") return [4.3, -2, 0];
  else return [4.8, -1.8, 0];
};
const torusPosition = () => {
  const deviceType = getDeviceType();
  if (deviceType === "mobile") return [-5, -2, 0];
  else if (deviceType === "tablet") return [-5, -2, 0];
  else return [-5, -2, 0];
};

export function ExtraModels() {
  const shapeanimations = useSpring({
    to: { scale: [1, 1, 1] },
    from: { scale: [0, 0, 0] },
    config: { mass: 5, tension: 130, friction: 50, duration: 2000 },
    delay: 2000, // Apply delay here, outside the config object
  });

  const shapeanimations2 = useSpring({
    to: { scale: [1, 1, 1] },
    from: { scale: [0, 0, 0] },
    config: { mass: 5, tension: 130, friction: 50 },
  });

  const modelRef = useRef();
  const modelRef2 = useRef();
  const modelRef3 = useRef();
  const modelRef4 = useRef();
  const torusref = useRef();

  useFrame(() => {
    modelRef.current.rotation.x += 0.001;
    modelRef2.current.rotation.y += 0.002;
    modelRef3.current.rotation.z += 0.003;
    modelRef4.current.rotation.x += 0.001;
    modelRef4.current.rotation.y += 0.002;
    modelRef4.current.rotation.z += 0.003;
    torusref.current.rotation.z += 0.0005;
  });

  return (
    <>
      <a.mesh
        scale={shapeanimations.scale}
        ref={modelRef}
        position={boxPosition()}
      >
        <boxGeometry args={[1, 1, 1]} />
        <MeshWobbleMaterial factor={1} speed={3} color={"black"} wireframe />
      </a.mesh>
      <a.mesh
        scale={shapeanimations.scale}
        ref={modelRef2}
        position={trianglePosition()}
      >
        <octahedronGeometry args={[0.5, 0]} />
        <MeshWobbleMaterial factor={1} speed={3} color={"black"} wireframe />
      </a.mesh>
      <a.mesh
        scale={shapeanimations.scale}
        ref={modelRef3}
        position={cone1Position()}
      >
        <coneGeometry args={[0.2, 0.5, 8]} />
        <MeshWobbleMaterial factor={1} speed={3} color={"black"} wireframe />
      </a.mesh>
      <a.mesh
        scale={shapeanimations.scale}
        ref={modelRef4}
        position={cone2Position()}
      >
        <coneGeometry args={[0.2, 0.5, 8]} />
        <MeshWobbleMaterial factor={1} speed={3} color={"black"} wireframe />
      </a.mesh>
      <a.mesh
        scale={shapeanimations2.scale}
        ref={torusref}
        position={torusPosition()}
      >
        <torusKnotGeometry args={[10, 3, 100, 16]} />
        <meshStandardMaterial
          scale={shapeanimations2.scale}
          color="black"
          wireframe
          transparent
          opacity={0.1}
        />
      </a.mesh>
    </>
  );
}
