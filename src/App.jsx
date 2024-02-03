// Assuming your CSS is imported somewhere in the application, for example in App.js or index.js
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { MyComponent } from "./MyComponent";
import "./index.css"; // Make sure to import the CSS file where you defined the styles

function App() {
  const [controlSwitch, setControlSwitch] = useState(false);
  const [canvasClassName, setCanvasClassName] = useState("canvasStyleDefault");

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      setControlSwitch(true);
      setCanvasClassName("canvasStyleTwoTouches");
    } else {
      setControlSwitch(false);
      setCanvasClassName("canvasStyleDefault");
    }
  };

  return (
    <>
      {/* <MyComponent /> */}
      <Canvas
        onScroll={e => console.log('onScroll')}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchStart} // This handles touch end with the same logic, consider separating if needed
        className={`canvasmain ${canvasClassName}`} // Dynamically apply class
        shadows
        camera={{ position: [20, -5, -10], fov: 60 }}
      >
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
