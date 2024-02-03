import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";


function AnimatedMesh({ geometry, material, position, delay }) {
    // Animation for each mesh with a unique delay
    const animationProps = useSpring({
      to: { scale: [1, 1, 1] },
      from: { scale: [0, 0, 0] },
      config: { mass: 5, tension: 130, friction: 50 },
      delay: delay, // Apply the provided delay for each mesh
    });
  
    return (
      <a.mesh
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        position={position}
        scale={animationProps.scale}
      />
    );
  }
  
 export function Logo() {
    const { nodes } = useGLTF("https://staginghello.grolives.com/wp-content/uploads/2024/02/EGNITE_LOGO.glb");
  
    // Define base delay and increment for each mesh
    const baseDelay = 10; // milliseconds
    const delayIncrement = 450; // additional delay for each subsequent mesh
  
    const [hovered, setHovered] = useState(false);
  
    return (
      <group rotation={[1.5, 0, 0]} dispose={null}>
        <AnimatedMesh
          geometry={nodes.E1.geometry}
          material={nodes.E1.material}
          position={[-2.159, 0.138, 0.012]}
          delay={baseDelay}
        />
        <AnimatedMesh
          geometry={nodes.G.geometry}
          material={nodes.G.material}
          position={[-1.204, 0.063, 0.065]}
          delay={baseDelay + delayIncrement}
        />
        <AnimatedMesh
          geometry={nodes.N.geometry}
          material={nodes.N.material}
          position={[-0.146, 0.277, 0.003]}
          delay={baseDelay + 2 * delayIncrement}
        />
        <AnimatedMesh
          geometry={nodes.I.geometry}
          material={nodes.I.material}
          position={[0.526, 0.277, 0.037]}
          delay={baseDelay + 3 * delayIncrement}
        />
        <AnimatedMesh
          geometry={nodes.T.geometry}
          material={nodes.T.material}
          position={[1.167, 0.127, -0.095]}
          delay={baseDelay + 4 * delayIncrement}
        />
        <AnimatedMesh
          geometry={nodes.E2.geometry}
          material={nodes.E2.material}
          position={[2.127, 0.107, -0.068]}
          delay={baseDelay + 5 * delayIncrement}
        />
      </group>
    );
  }
  
  // Preload the model for performance
  useGLTF.preload("https://staginghello.grolives.com/wp-content/uploads/2024/02/EGNITE_LOGO.glb");