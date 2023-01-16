import { motion } from "framer-motion"
import HomeCanvas from "../three/canvas/home"
import { useEffect, useRef } from "react";
import { sanitize } from "../utils/functions";
import Link from "next/link";


export default function Home({ setWidth, data }) {
  const ref = useRef(null)

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
    //setHeight(boxRef.current.offsetHeight);
  }, [setWidth]);

  return (
    <motion.div
      ref={ref}
      className="w-[42rem] h-[42rem] border-gradient relative flex justify-center items-center">
      <div className="absolute w-96 top-2 -left-64">
        <p className="text-[100px] font-black">
          {data.title}
        </p>
        <div className="h-[12px] relative -top-6 w-[20%] bg-white" />
        <div className="leading-relaxed font-light">
          <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: sanitize(data.content) }} />
          <span>
            Check out some of my <Link className="text-orange-400 underline" href={"#works"}>works</Link>.
          </span>
        </div>
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
