import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ManModel } from "../models/man";
import Camera from "../utils/camera";

export default function HomeCanvas({mouseX, mouseY}) {
  return (
    <Canvas className="w-full h-full">
      <Camera mouseX={mouseX} mouseY={mouseY} />
      <directionalLight
        position={[-5, 4, -1]}
        intensity={2.4}
      />
      <directionalLight
        position={[-5, -1, -1]}
        intensity={0.5}
        color={"#e47025"}
      />
      <rectAreaLight
        width={3}
        height={3}
        color={"#404040"}
        intensity={4.6}
        position={[-2, 0, 5]}
        lookAt={[0, 0, 0]}
        penumbra={1}
        castShadow
      />
      <Suspense>
        <ManModel
          mouseX={mouseX}
          mouseY={mouseY}
        />
      </Suspense>
    </Canvas>
  )
}
