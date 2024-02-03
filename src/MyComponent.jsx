import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "@react-spring/web";

export function MyComponent() {
  const [deviceType, setDeviceType] = useState("desktop");

  useEffect(() => {
    // Function to determine the device type
    const handleResize = () => {
      if (window.innerWidth < 768) setDeviceType("mobile");
      else if (window.innerWidth >= 768 && window.innerWidth < 1024)
        setDeviceType("tablet");
      else setDeviceType("desktop");
    };

    // Set the initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const divStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0, // Add this line
    zIndex: 1000,
    width: "100%", // Ensure it spans the entire width
    display: "flex", // Use flexbox
    justifyContent: "center", // Center the content horizontally
    alignItems: "center", // Optional: Center the content vertically if needed
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

  // SVG content for mobile/tablet
  const mobileTabletSvg = (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 138.629 138.629"
      xmlSpace="preserve"
      style={svgStyle}
    >
      <g>
        <g>
          <path
            style={{ fill: "#010002" }}
            d="M55.926,138.191c0,0,3.502-3.064-2.626-8.316c0,0-14.382-16.194-21.385-28.449 c0,0-3.939-6.564,4.377-15.756c0,0,3.878-13.131,6.066-18.383c0,0-0.864-7.804-3.864-47.304c1.5-16.5,10.928-7.704,11.901-3.168 c1.198,0.191,5.571,43.821,10.074,48.323c3.876,3.876,7.329-50.708,9.465-56.874c3.616-8.879,9.489-1.647,9.998,1.684 c0.868,5.688-1.394,54.713-1.394,54.713s10.213-6.565,14.59,6.128c0,0,15.318,1.312,14.005,15.318c0,0,3.21,26.261-6.419,44.643 l-2.334,7.879L55.926,138.191z"
          />
          <g>
            <path
              style={{ fill: "#010002" }}
              d="M43.999,6.346c-5.523,0-10.002,4.478-10.002,10.001s4.479,10.002,10.002,10.002 s10.002-4.478,10.002-10.002S49.522,6.346,43.999,6.346z M43.999,24.278c-4.38,0-7.932-3.551-7.932-7.931 c0-4.379,3.552-7.93,7.932-7.93s7.932,3.551,7.932,7.93C51.93,20.727,48.379,24.278,43.999,24.278z"
            />
          </g>
          <g>
            <path
              style={{ fill: "#010002" }}
              d="M74.404,0c-5.523,0-10.002,4.478-10.002,10.001s4.479,10.002,10.002,10.002 c5.523,0,10.002-4.478,10.002-10.002S79.927,0,74.404,0z M74.404,17.932c-4.38,0-7.932-3.551-7.932-7.931 c0-4.379,3.552-7.93,7.932-7.93c4.38,0,7.932,3.551,7.932,7.93C82.336,14.381,78.784,17.932,74.404,17.932z"
            />
          </g>
        </g>
      </g>
    </svg>
  );

  // SVG content for desktop
  const desktopSvg = (
    <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
      width="800px" height="800px" viewBox="0 0 356.572 356.572"
      xmlSpace="preserve" style={svgStyle}>
      <g>
        <path d="M181.563,0C120.762,0,59.215,30.525,59.215,88.873V237.5c0,65.658,53.412,119.071,119.071,119.071
          c65.658,0,119.07-53.413,119.07-119.071V88.873C297.356,27.809,237.336,0,181.563,0z M274.945,237.5
          c0,53.303-43.362,96.657-96.659,96.657c-53.299,0-96.657-43.354-96.657-96.657v-69.513c20.014,6.055,57.685,15.215,102.221,15.215
          c28.515,0,59.831-3.809,91.095-14.567V237.5z M274.945,144.794c-81.683,31.233-168.353,7.716-193.316-0.364V88.873
          c0-43.168,51.489-66.46,99.934-66.46c46.481,0,93.382,20.547,93.382,66.46V144.794z M190.893,48.389v81.248
          c0,6.187-5.023,11.208-11.206,11.208c-6.185,0-11.207-5.021-11.207-11.208V48.389c0-6.186,5.021-11.207,11.207-11.207
          C185.869,37.182,190.893,42.203,190.893,48.389z M154.938,40.068V143.73c-15.879,2.802-62.566-10.271-62.566-10.271
          C80.233,41.004,154.938,40.068,154.938,40.068z"/>
      </g>
    </svg>
  );

  return (
    <>
      <div id="uppercanvas" style={divStyle}>
        <animated.div style={{ ...fadeIn, ...scale }}>
          {deviceType === "desktop" ? desktopSvg : mobileTabletSvg}
        </animated.div>
      </div>
    </>
  );
}
