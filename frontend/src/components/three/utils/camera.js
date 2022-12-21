import { useThree } from "@react-three/fiber";
import { useSpring, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useLayoutEffect, useRef } from "react";

export default function Camera({ mouseX, mouseY, ...props }) {

  function useSmoothTransform(value, springOptions, transformer) {
    return useSpring(useTransform(value, transformer), springOptions);
  }



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
      position={[-0.42, 0, 1.4]}
      rotation={[0, 0, 0]}
    />
  );
}