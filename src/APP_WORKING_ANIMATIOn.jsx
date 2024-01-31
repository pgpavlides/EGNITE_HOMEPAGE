import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { CameraControls,useGLTF } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'; // Import GLTFLoader
import { MeshStandardMaterial } from 'three';
import gsap from 'gsap';

export function ExtraModels(props) {

const modelRef = useRef();
const modelRef2 = useRef();
const modelRef3 = useRef();
const modelRef4 = useRef();

useEffect(() => {
  console.log('test');
}, []);

useFrame(() => {
  // You can apply any animation logic here
  modelRef.current.rotation.x += 0.01;
  modelRef2.current.rotation.y += 0.02;
  modelRef3.current.rotation.z += 0.03;
  modelRef4.current.rotation.x += 0.01;
  modelRef4.current.rotation.y += 0.02;
  modelRef4.current.rotation.z += 0.03;
});


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



function ModelScene() {

  function Model() {
    const gltf = useLoader(GLTFLoader, 'https://staginghello.grolives.com/wp-content/uploads/2024/01/LOGO_ORIGIN_CORRECTED.glb')
    return <primitive object={gltf.scene} rotation={[1.5,0,0]} />
  }

  return (
    <Canvas>

      <CameraControls />
      <ambientLight intensity={5} />
      <ExtraModels/>
      <Model/>
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
