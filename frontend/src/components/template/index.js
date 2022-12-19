import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { Model } from "../layout/x";
import { useMotionValue, useSpring, useTransform, motion as mot } from "framer-motion";
import { motion } from "framer-motion-3d"
import useMeasure from "react-use-measure";

export default function Template() {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [ref, bounds] = useMeasure({ scroll: false });

  function useSmoothTransform(value, springOptions, transformer) {
    return useSpring(useTransform(value, transformer), springOptions);
  }


  function Camera({ mouseX, mouseY, ...props }) {

    const spring = { stiffness: 600, damping: 30 };

    const cameraX = useSmoothTransform(mouseX, spring, (x) => (-(x / 100000)) + -0.42);
    const cameraY = useSmoothTransform(mouseY, spring, (y) => (-((-1 * y) / 100000)));

    const set = useThree(({ set }) => set);
    const camera = useThree(({ camera }) => camera);
    const size = useThree(({ size }) => size);
    const scene = useThree(({ scene }) => scene);
    const cameraRef = useRef();

    useLayoutEffect(() => {
      const { current: cam } = cameraRef;
      if (cam) {
        cam.aspect = size.width / size.height;
        cam.updateProjectionMatrix();
      }
    }, [size, props]);

    useLayoutEffect(() => {
      if (cameraRef.current) {
        const oldCam = camera;
        set(() => ({ camera: cameraRef.current }));
        return () => set(() => ({ camera: oldCam }));
      }
    }, [camera, cameraRef, set]);

    useLayoutEffect(() => {
      return cameraX.onChange(() => camera.lookAt(scene.position));
    }, [cameraX]);

    return (
      <motion.perspectiveCamera
        ref={cameraRef}
        fov={30}
        position={[cameraX, cameraY, 1.4]}
        rotation={[0, 0, 0]}
      />
    );
  }

  return (
    <mot.div onPointerMove={(e) => {
      mouseX.set(e.clientX - bounds.x - bounds.width / 2);
      mouseY.set(e.clientY - bounds.y - bounds.height / 2);
    }}
 className="w-[300vw] h-full flex justify-center items-center">
      <mot.div 
        className="w-[42rem] h-[42rem] border-gradient relative flex justify-center items-center">
        <div  className="relative w-[30%] h-[30%] flex justify-center items-center">
          <div className="absolute w-full h-full rounded-full bg-white bg-opacity-50 blur-[100px]" />
          <div className="w-full h-full rounded-full bg-white flex justify-center items-center" />
          <div className="absolute w-[200%] h-[200%] flex justify-center items-center">
            <Canvas className="w-full h-full">
              <Camera mouseX={mouseX} mouseY={mouseY} />
              <directionalLight
                position={[-5, 4, -1]}
                intensity={2.4} />
              <rectAreaLight
                width={3}
                height={3}
                color={"#404040"}
                intensity={5.6}
                position={[-2, 0, 5]}
                lookAt={[0, 0, 0]}
                penumbra={1}
                castShadow
              />
              <Suspense>
                <Model
                  mouseX={mouseX}
                  mouseY={mouseY}
                />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </mot.div>
    </mot.div>
  )
}
