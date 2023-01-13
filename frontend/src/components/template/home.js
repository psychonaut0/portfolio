import { motion } from "framer-motion"
import HomeCanvas from "../three/canvas/home"
import { useLayoutEffect, useRef } from "react";


export default function Home({ setWidth }) {

  const ref = useRef(null)

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    //setHeight(boxRef.current.offsetHeight);
  }, [setWidth]);

  return (
    <motion.div
      ref={ref}
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
      <div className="relative w-[50%] h-[50%] flex justify-center items-center">
        <div className="absolute w-full h-full rounded-full bg-white bg-opacity-50 blur-[100px]" />
        <div className="w-full h-full rounded-full bg-white flex justify-center items-center" />
        <div className="absolute w-[200%] h-[200%] flex justify-center items-center">
          <HomeCanvas />
        </div>
      </div>
    </motion.div>
  )
}
