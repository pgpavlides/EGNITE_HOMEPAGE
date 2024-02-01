import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { CameraControls, useGLTF } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function ExtraModels(props) {
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
      <mesh ref={modelRef} position={[4, 2, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="black" wireframe />
      </mesh>
      <mesh ref={modelRef2} position={[-2.6, 2.5, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="black" wireframe />
      </mesh>
      <mesh ref={modelRef3} position={[-5, -2, 0]}>
        <coneGeometry args={[0.2, 0.5, 8]} />
        <meshStandardMaterial color="black" wireframe />
      </mesh>
      <mesh ref={modelRef4} position={[4.5, -1, 0]}>
        <coneGeometry args={[0.2, 0.5, 8]} />
        <meshStandardMaterial color="black" wireframe />
      </mesh>
      <mesh ref={torusref} position={[-5, -2, 0]}>
        <torusKnotGeometry args={[10, 3, 100, 16]} />
        <meshStandardMaterial
          color="black"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </>
  );
}

function Model() {

  const { camera } = useThree()


  const gltf = useLoader(GLTFLoader, "./LOGO_ORIGIN_CORRECTED.glb");
  return <primitive object={gltf.scene} rotation={[1.5, 0, 0]} />;
}

function ModelScene() {


  const getDeviceType = () => {
    if (window.innerWidth < 768) return "mobile";
    else if (window.innerWidth >= 768 && window.innerWidth < 1024)
      return "tablet";
    else return "desktop";
  };

  const cameraControlsRef = useRef();

  // Define breakpoints for device detection
  const [deviceType, setDeviceType] = useState(getDeviceType());

  useEffect(() => {
    const handleResize = () => {
      const newDeviceType = getDeviceType();
      setDeviceType(newDeviceType);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Default to desktop

  useEffect(() => {
    const applySettings = () => {
      if (!cameraControlsRef.current) return;
      console.log(cameraControlsRef.current.camera);
      switch (deviceType) {
        case "desktop":
          cameraControlsRef.current.mouseButtons.left = 1;
          cameraControlsRef.current.mouseButtons.right = 0;
          cameraControlsRef.current.mouseButtons.middle = 0;
          cameraControlsRef.current.touches.one = 0;
          cameraControlsRef.current.touches.two = 0;

          break;
        case "tablet":
          cameraControlsRef.current.mouseButtons.left = 0;
          cameraControlsRef.current.mouseButtons.right = 0;
          cameraControlsRef.current.mouseButtons.middle = 0;
          cameraControlsRef.current.touches.one = 1;
          cameraControlsRef.current.touches.two = 3;
          break;
        case "mobile":
          cameraControlsRef.current.mouseButtons.left = 1;
          cameraControlsRef.current.mouseButtons.right = 0;
          cameraControlsRef.current.mouseButtons.middle = 0;
          cameraControlsRef.current.touches.one = 0;
          cameraControlsRef.current.touches.two = 1;
          break;
        default:
          break;
      }
    };

    // Slight delay to ensure camera controls are fully initialized
    const timer = setTimeout(applySettings, 200); // 100 ms delay

    return () => clearTimeout(timer);
  }, [deviceType]);

  return (
    <Canvas>
      <CameraControls ref={cameraControlsRef} />
      <ambientLight intensity={5} />
      <ExtraModels />
      <Model />
    </Canvas>
  );
}

function App() {
  return <ModelScene />;
}

export default App;
