import React, { useEffect, useRef, useState, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

import { ExtraModels } from "./ExtraModels";
import { Logo } from "./Logo";
import { MyComponent } from "./MyComponent";

const getDeviceType = () => {
  if (window.innerWidth < 768) return "mobile";
  else if (window.innerWidth >= 768 && window.innerWidth < 1024)
    return "tablet";
  else return "desktop";
};

export function Experience({ camera }) {
  const cameraControlsRef = useRef();
  const [controlsReady, setControlsReady] = useState(false);
  const [animationState, setAnimationState] = useState("starting");
  const [deviceType, setDeviceType] = useState(getDeviceType());
  const events = useThree(state => state.events);
//   events.disconnect();

  useEffect(() => {
    const handleResize = () => {
      const newDeviceType = getDeviceType();
      setDeviceType(newDeviceType);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //================= APPLY SETTINGS =================

  const applySettings = () => {
    const camera = cameraControlsRef.current;

    if (!camera) return;

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
      setAnimationState("end");
    }, 5000);
  };
  //   const timer = setTimeout(applySettings, 300);

  //===================================================

  // Slight delay to ensure camera controls are fully initialized

  useEffect(() => {
    setTimeout(() => {
      setControlsReady(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (controlsReady) {
      applySettings();
    }
  }, [controlsReady]);

 

//   const events = useThree((state) => state.events);

  return (
    <>
     
        <CameraControls
          enabled={true}
          smoothTime={1.5}
          ref={cameraControlsRef}
          makeDefault
        />
        <ambientLight intensity={5} />
        <ExtraModels />
        <Logo />
      
    </>
  );
}
