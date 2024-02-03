import React, { useEffect, useRef, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
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
  const canvasRef = useRef();
  const [isMultiTouch, setIsMultiTouch] = useState(false);
  const [controlsReady, setControlsReady] = useState(false);
  const [animationState, setAnimationState] = useState("starting");

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

    canvasElement.addEventListener("touchstart", handleTouchStart);
    canvasElement.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvasElement.removeEventListener("touchstart", handleTouchStart);
      canvasElement.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      updateTouchAction();
    }
  }, [updateTouchAction]);

  const [deviceType, setDeviceType] = useState(getDeviceType());

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
      // console.log('CONTROLS:',controlsReady);
      // console.log(cameraControlsRef.current);
      applySettings();
    }
  }, [controlsReady]);

  useEffect(() => {
    if (animationState === "end") {
      if (isMultiTouch) {
        document.getElementsByClassName("canvasmain")[0].style.backgroundColor =
          "purple";
      } else {
        document.getElementsByClassName("canvasmain")[0].style.backgroundColor =
          "white";
      }
    }
  }, [isMultiTouch, animationState]);

  return (
    <>
      <MyComponent />
      <Canvas
        ref={canvasRef}
        className="canvasmain"
        shadows
        camera={{ position: [20, -5, -10], fov: 60 }}
      >
        <CameraControls
          enabled={true}
          smoothTime={1.5}
          ref={cameraControlsRef}
          makeDefault
        />
        <ambientLight intensity={5} />
        <ExtraModels />
        <Logo />
      </Canvas>
    </>
  );
}
