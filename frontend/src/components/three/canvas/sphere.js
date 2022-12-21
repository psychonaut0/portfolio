import { Canvas } from "@react-three/fiber";
import { Sphere, useTexture } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { Suspense } from "react";

function Scene() {
  const map = useTexture({
    map: '/materials/rock/Rock_BaseColor.jpg',
    roughnessMap: '/materials/rock/Rock_Roughness.jpg',
    normalMap: '/materials/rock/Rock_Normal.jpg',
    aoMap: '/materials/rock/Rock_AmbientOcclusion.jpg',
    displacementMap: '/materials/rock/Rock_Height.png'
  })

  return (
    <motion.mesh position={[0,0,0]} rotation={[0,0,0]} animate={{rotateY: 6.28318530718 }}  transition={{repeat:"Infinity", duration: 60}}>
      <sphereGeometry args={[1.5]} />
      <meshStandardMaterial
        {...map}
        displacementScale={0.05}
        roughness={4}
      />

    </motion.mesh>
  )
}

export default function SphereCanvas({lightPosition}) {

  return (
    <Canvas>      
      <directionalLight
        intensity={1}
        position={lightPosition}
      />
      <Suspense>
        <Scene />
      </Suspense>
    </Canvas>
  )
}