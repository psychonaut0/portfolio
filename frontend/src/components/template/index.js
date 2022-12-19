import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import { useMotionValue, useSpring, useTransform, motion as mot } from "framer-motion";
import { motion } from "framer-motion-3d"
import useMeasure from "react-use-measure";
import HomeCanvas from "../three/canvas/home";

export default function Template() {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [ref, bounds] = useMeasure({ scroll: false });




  return (
    <mot.div onPointerMove={(e) => {
      mouseX.set(e.clientX - bounds.x - bounds.width / 2);
      mouseY.set(e.clientY - bounds.y - bounds.height / 2);
    }}
      className="w-[300vw] translate-x-[0vw] ease-in-out duration-[3000ms] transition-all h-full flex justify-center items-center relative">
        <div className="w-[32rem] h-[32rem] border border-white rounded-full absolute -left-[16rem] border-opacity-40">

        </div>
        <div className="w-[32rem] h-[32rem] border border-white rounded-full absolute -right-[16rem] border-opacity-40">

        </div>
      <mot.div
        className="w-[42rem] h-[42rem] border-gradient relative flex justify-center items-center">
        <div className="absolute w-96 top-2 -left-64">
          <p className="text-[100px] font-black">
            Hello.
          </p>
          <div className="h-[12px] relative -top-6 w-[20%] bg-white" />
          <p className="leading-relaxed font-light">
            Donut pudding sugar plum apple pie croissant soufflé cotton candy tiramisu jelly-o. Tootsie roll cookie cheesecake bonbon tootsie roll candy sesame snaps candy pastry.
          </p>
        </div>
        <div className="relative w-[30%] h-[30%] flex justify-center items-center">
          <div className="absolute w-full h-full rounded-full bg-white bg-opacity-50 blur-[100px]" />
          <div className="w-full h-full rounded-full bg-white flex justify-center items-center" />
          <div className="absolute w-[300%] h-[300%] flex justify-center items-center">
            <HomeCanvas mouseX={mouseX} mouseY={mouseY} />
          </div>
        </div>
      </mot.div>
    </mot.div>
  )
}
