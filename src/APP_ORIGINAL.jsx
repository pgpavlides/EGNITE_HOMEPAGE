import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { CameraControls,useGLTF } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'; // Import GLTFLoader
import { MeshStandardMaterial } from 'three';
import gsap from 'gsap';


const material = new MeshStandardMaterial({ color: 0x000000 });

export function Model(props) {
  const { nodes, materials } = useGLTF("/LOGO_ORIGIN_CORRECTED.glb");
  return (
    <group onClick={animateModels} {...props} dispose={null} rotation={[Math.PI / 2, 0, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.E1.geometry}
        material={material}
        position={[-2.159, 0.138, 0.012]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.G.geometry}
        material={material}
        position={[-1.204, 0.063, 0.065]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.N.geometry}
        material={material}
        position={[-0.146, 0.277, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.I.geometry}
        material={material}
        position={[0.526, 0.277, 0.037]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T.geometry}
        material={material}
        position={[1.167, 0.127, -0.095]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.E2.geometry}
        material={material}
        position={[2.127, 0.107, -0.068]}
      />
    </group>
  );
}

export function ExtraModels(props) {

const modelRef = useRef();
const modelRef2 = useRef();
const modelRef3 = useRef();
const modelRef4 = useRef();


useEffect(() => {
  const timeline = gsap.timeline();
  if (!modelRef.current) return;
  gsap.to(modelRef.current.rotation, {
    x: Math.PI,
    ease: "linear",
    repeat: -1,
    duration: 10
  });
  gsap.to(modelRef2.current.rotation, {
    x: Math.PI,
    ease: "linear",
    repeat: -1,
    duration: 10
  });
  gsap.to(modelRef3.current.rotation, {
    x: Math.PI * 2,
    y: Math.PI * 2,
    z: Math.PI * 2,
    ease: "linear",
    repeat: -1,
    duration: 20
  });
  gsap.to(modelRef4.current.rotation, {
    x: Math.PI * 2,
    y: Math.PI * 2,
    z: Math.PI * 2,
    ease: "linear",
    repeat: -1,
    duration: 20
  });

}, [])
  

  return (
    <>
      <mesh ref={modelRef}position={[4, 2, 0]} >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="black" wireframe  />
      </mesh>
      <mesh ref={modelRef2} position={[-2.6, 2.5, 0]} >
      <octahedronGeometry args={[0.5 , 0]} />
        <meshStandardMaterial color="black" wireframe  />
      </mesh>
      <mesh ref={modelRef3} position={[-5, -2, 0]} >
      <coneGeometry args={[0.2, 0.5, 8]} />
        <meshStandardMaterial color="black" wireframe  />
      </mesh>
      <mesh ref={modelRef4} position={[4.5, -1, 0]} >
      <coneGeometry args={[0.2, 0.5, 8]} />
        <meshStandardMaterial color="black" wireframe  />
      </mesh>
      <mesh position={[-5, -2, 0]} >
      <torusKnotGeometry args={[10, 3, 100, 16]} />
        <meshStandardMaterial color="black" wireframe  transparent opacity={0.1} />
      </mesh>
    </>
  )
}

useGLTF.preload("/LOGO_ORIGIN_CORRECTED.glb");



export function animateModels(props) {
  

   
  
    // Add animations to the timeline
    
  
           console.log(modelRef);

  
}

function ModelScene() {
 
  const [active, setActive] = useState(false);

  const springs = useSpring({ scale: active ? 1.5 : 1 })
  const { scale } = useSpring({ scale: active ? 1.5 : 1 })



  return (
    <Canvas>

      <CameraControls />
      <ambientLight intensity={5} />
      <Model/>
      <ExtraModels/>
     
    </Canvas>
  );
}

function App() {
  return (
    <>
      <ModelScene/>
    </>
  )
}

export default App;
