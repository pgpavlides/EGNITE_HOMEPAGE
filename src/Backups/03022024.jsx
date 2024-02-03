import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
  CameraControls,
  useGLTF,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  ScrollControls
} from "@react-three/drei";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useSpring, animated, a, config } from "@react-spring/three";

const getDeviceType = () => {
  if (window.innerWidth < 768) return "mobile";
  else if (window.innerWidth >= 768 && window.innerWidth < 1024)
    return "tablet";
  else return "desktop";
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

const AnimatedCustomSphere = () => {
  const AnimatedMeshDistortMaterial = animated(MeshDistortMaterial);
  const isOver = useRef(false);

  const { width, height } = useThree((state) => state.size);

  const [springs, api] = useSpring(
    () => ({
      scale: 1,
      position: [0, 0],
      color: "#3DB7B1",
      config: (key) => {
        switch (key) {
          case "scale":
            return {
              mass: 4,
              friction: 10,
            };
          case "position":
            return { mass: 4, friction: 220 };
          default:
            return {};
        }
      },
    }),
    []
  );

  const handleClick = useCallback(() => {
    let clicked = false;

    return () => {
      clicked = !clicked;
      api.start({
        color: clicked ? "#569AFF" : "#3DB7B1",
      });
    };
  }, []);

  const handlePointerEnter = () => {
    api.start({
      scale: 1.5,
    });
  };

  const handlePointerLeave = () => {
    api.start({
      scale: 1,
    });
  };

  const handleWindowPointerOver = useCallback(() => {
    isOver.current = true;
  }, []);

  const handleWindowPointerOut = useCallback(() => {
    isOver.current = false;

    api.start({
      position: [0, 0],
    });
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      if (isOver.current) {
        const x = (e.offsetX / width) * 2 - 1;
        const y = (e.offsetY / height) * -2 + 1;

        api.start({
          position: [x * 5, y * 2],
        });
      }
    },
    [api, width, height]
  );

  useEffect(() => {
    window.addEventListener("pointerover", handleWindowPointerOver);
    window.addEventListener("pointerout", handleWindowPointerOut);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointerover", handleWindowPointerOver);
      window.removeEventListener("pointerout", handleWindowPointerOut);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [handleWindowPointerOver, handleWindowPointerOut, handlePointerMove]);

  return (
    <animated.mesh
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick()}
      scale={springs.scale}
      position={springs.position.to((x, y) => [x, y, -4])}
    >
      <sphereGeometry args={[1.5, 64, 32]} />
      <AnimatedMeshDistortMaterial
        speed={5}
        distort={0.38}
        color={springs.color}
      />
    </animated.mesh>
  );
};

/*

========================MODEL===================

*/

export function AnimatedMesh({ geometry, material, position, delay }) {
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

function Model() {
  const { nodes } = useGLTF("./EGNITE_LOGO.glb");

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
useGLTF.preload("./EGNITE_LOGO.glb");

function MyComponent() {
  // Define the style object
  const divStyle = {
    width: '100vw',
    height: '500px',
    
    top: 0,
    left: 0,
    zIndex: 1000,
  };

  return (
    <>
    <div id="uppercanvas" style={divStyle}>
      wdaawedadw
    </div>
   
  </>
  );
}


/* 
====================MODEL SCENE===================
*/

function ModelScene({ camera }) {
  const cameraControlsRef = useRef();
  const canvasRef = useRef();
  const [isMultiTouch, setIsMultiTouch] = useState(false);

  const updateTouchAction = useCallback(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        setIsMultiTouch(true);
      }
    };

    const handleTouchEnd = (e) => {
      if (e.touches.length < 2) {
        setIsMultiTouch(false);
      }
    };

    canvasElement.addEventListener('touchstart', handleTouchStart);
    canvasElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvasElement.removeEventListener('touchstart', handleTouchStart);
      canvasElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      updateTouchAction();
    }
  }, [updateTouchAction]);

  useEffect(() => {
    // This effect updates the touch-action style based on isMultiTouch state
    const canvasElement = canvasRef.current;
    const canva2 = document.getElementsByClassName("canvasmain");
    if (canvasElement) {
      // canvasElement.style.touchAction = isMultiTouch ? 'auto !important' : 'auto';
      canvasElement.style.backgroundColor = isMultiTouch ? 'red' : 'green';

      // canva2.style.backgroundColor = isMultiTouch ? 'red' : 'green';
    }
  }, [isMultiTouch]);

  

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

  
  

  const applySettings = () => {
    const camera = cameraControlsRef.current;

    if (!camera) return;

    // First switch for setting the position based on deviceType
    switch (deviceType) {

      
        case "desktop":
          camera.mouseButtons.left = 0;
                camera.mouseButtons.right = 0;
                camera.mouseButtons.middle = 0;
                camera.mouseButtons.wheel = 0;

                camera.touches.one = 0;
                camera.touches.two = 0;
                camera.touches.three = 0;
            camera.setPosition(0, 0, 6, true);
            break;
        case "mobile":
          camera.mouseButtons.left = 0;
                camera.mouseButtons.right = 0;
                camera.mouseButtons.middle = 0;
                camera.mouseButtons.wheel = 0;

                camera.touches.one = 0;
                camera.touches.two = 0;
                camera.touches.three = 0;
               
            camera.setPosition(0, 0, 13, true);
            break;
        // No position setting needed for tablet, or default case
        case "tablet":
          camera.mouseButtons.left = 0;
                camera.mouseButtons.right = 0;
                camera.mouseButtons.middle = 0;
                camera.mouseButtons.wheel = 0;

                camera.touches.one = 0;
                camera.touches.two = 0;
                camera.touches.three = 0;
                camera.setPosition(0, 0, 13, true);
        default:
            // Optionally set a default position or leave as is for tablets and other devices
            break;
    }

    // Delay the execution of the second switch statement for 5 seconds
    setTimeout(() => {
        switch (deviceType) {
            case "desktop":
                camera.mouseButtons.left = 1;
                camera.mouseButtons.right = 0;
                camera.mouseButtons.middle = 0;
                camera.mouseButtons.wheel = 0;

                camera.touches.one = 1;
                camera.touches.two = 0;
                break;
            case "tablet":
                camera.mouseButtons.left = 0;
                camera.mouseButtons.right = 0;
                camera.mouseButtons.middle = 0;
                camera.mouseButtons.wheel = 0;

                camera.touches.one = 0;
                camera.touches.two = 1;
                camera.touches.three = 0;
                break;
            case "mobile":
                camera.mouseButtons.left = 0;
                camera.mouseButtons.right = 0;
                camera.mouseButtons.middle = 0;
                camera.mouseButtons.wheel = 0;

                camera.touches.one = 0;
                camera.touches.two = 1;
                camera.touches.three = 0;
                break;
            default:
                camera.mouseButtons.left = 0;
                camera.mouseButtons.right = 0;
                camera.mouseButtons.middle = 0;
                camera.mouseButtons.wheel = 0;

                camera.touches.one = 0;
                camera.touches.two = 0;
                camera.touches.three = 0;
                break;
        }
    }, 5000); 
    
    // 5000 milliseconds delay
};


  // Slight delay to ensure camera controls are fully initialized
  const timer = setTimeout(applySettings, 300); // 100 ms delay

  return (
    <>
    <MyComponent/>
    
      <Canvas ref={canvasRef} className="canvasmain" shadows camera={{ position: [20, -5, -10], fov: 60 }}>
        <CameraControls smoothTime={1.5} ref={cameraControlsRef} makeDefault />
        {/* <AnimatedCustomSphere/> */}
        <ambientLight intensity={5} />
        <ExtraModels />
        <Model />
      </Canvas>
    </>
  );
}

function App() {
  return <ModelScene />;
}

export default App;
