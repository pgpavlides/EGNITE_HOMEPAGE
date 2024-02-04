import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/web";

export function MyComponent() {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setDeviceType("mobile");
      else if (window.innerWidth >= 768 && window.innerWidth < 1024) setDeviceType("tablet");
      else setDeviceType("desktop");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const divStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const svgStyle = {
    padding: "20px",
    width: "40px",
    height: "40px",
  };

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { ...config.wobbly, duration: 1500 },
    delay: 3000,
  });

  const scale = useSpring({
    to: { transform: "scale(1.1)" },
    from: { transform: "scale(0)" },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 4500,
  });

  // URLs for the SVG images
  const mobileTabletSvgUrl = "https://egnite.gr/wp-content/uploads/2024/02/touch.svg"; // Update with your actual SVG URL
  const desktopSvgUrl = "https://egnite.gr/wp-content/uploads/2024/02/click.svg"; // Update with your actual SVG URL

  return (
    <>
      <div id="uppercanvas" style={divStyle}>
        <animated.div style={{ ...fadeIn, ...scale }}>
          <img
            src={deviceType === "desktop" ? desktopSvgUrl : mobileTabletSvgUrl}
            style={svgStyle}
            alt="Responsive Icon"
          />
        </animated.div>
      </div>
    </>
  );
}
