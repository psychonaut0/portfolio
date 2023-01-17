import { motion } from "framer-motion"
import HomeCanvas from "../three/canvas/home"
import { useEffect, useRef, useState } from "react";
import { sanitize } from "../utils/functions";
import Link from "next/link";


export default function Home({ setWidth, data }) {
  const ref = useRef(null)

  const [height, setHeight] = useState(0)

  function handleScrollEvent() {
    setWidth(ref.current.offsetWidth);  
    if(window.innerHeight < 480) {
      setHeight(window.innerHeight /3);
    }
    else if(window.innerHeight < 530) {
      setHeight(window.innerHeight /5);
    }
    else if(window.innerHeight < 620) {
      setHeight(window.innerHeight /10);
    }
    else{
      setHeight(0);
    }
  }



  useEffect(() => {
    window.addEventListener('resize', handleScrollEvent);
    return () => {
        window.removeEventListener("resize", handleScrollEvent)
    }
}, [])

  return (
    <motion.div
      ref={ref}
      className="w-[30rem] h-[30rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem] 2xl:w-[42rem] 2xl:h-[42rem] border-gradient relative flex justify-center items-center">
      <div style={{top: `${height}px`}} className="pl-16 transition-all absolute w-96 -left-64">
        <p className="text-[100px] font-black">
          {data.title}
        </p>
        <div className="h-[12px] relative -top-6 w-[20%] bg-white" />
        <div className="leading-relaxed font-light">
          <div className="font-light prose prose-invert" dangerouslySetInnerHTML={{ __html: sanitize(data.content) }} />
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
