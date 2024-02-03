import {useRef} from 'react'
import {useFrame} from "@react-three/fiber"
import {useSpring, a} from '@react-spring/three'
import {MeshWobbleMaterial} from '@react-three/drei'

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
        <a.mesh scale={shapeanimations.scale} ref={modelRef} position={[4, 2, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <MeshWobbleMaterial factor={1} speed={3} color={"black"} wireframe />
        </a.mesh>
        <a.mesh
          scale={shapeanimations.scale}
          ref={modelRef2}
          position={[-2.6, 2.5, 0]}
        >
          <octahedronGeometry args={[0.5, 0]} />
          <MeshWobbleMaterial factor={1} speed={3} color={"black"} wireframe />
        </a.mesh>
        <a.mesh
          scale={shapeanimations.scale}
          ref={modelRef3}
          position={[-5, -2, 0]}
        >
          <coneGeometry args={[0.2, 0.5, 8]} />
          <MeshWobbleMaterial factor={1} speed={3} color={"black"} wireframe />
        </a.mesh>
        <a.mesh
          scale={shapeanimations.scale}
          ref={modelRef4}
          position={[4.5, -1, 0]}
        >
          <coneGeometry args={[0.2, 0.5, 8]} />
          <MeshWobbleMaterial factor={1} speed={3} color={"black"} wireframe />
        </a.mesh>
        <a.mesh
          scale={shapeanimations2.scale}
          ref={torusref}
          position={[-5, -2, 0]}
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
