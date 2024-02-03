import React from 'react'

export function AnimatedCustomSphere(props) {
    

    return (
        <>
            
        </>
    )
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