import React, { useEffect, useRef } from 'react'
import SphereCanvas from '../../three/canvas/sphere'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Planet({ activePath, position, href, setWidth }) {

  const positionOffset = {
    right: `${activePath === href ? "-right-[9rem] lg:-right-[9rem]" : "-right-[12rem] lg:-right-[12rem]"} xl:-right-[14rem] 2xl:-right-[16rem]`,
    left: `${activePath === href ? "-left-[9rem] lg:-left-[9rem]" : "-left-[12rem] lg:-left-[12rem]"} -left-[12rem] lg:-left-[12rem] xl:-left-[14rem] 2xl:-left-[16rem]`
  }

  const ref = useRef(null)

  function handleScrollEvent() {
    setWidth(ref.current.offsetWidth);
  }

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleScrollEvent);
    return () => {
      window.removeEventListener("resize", handleScrollEvent)
    }
  }, []);

  return (
    <div ref={ref} className={` transition-all duration-1000 lg:w-[24rem] lg:h-[24rem] xl:w-[28rem] xl:h-[28rem] 2xl:w-[32rem] 2xl:h-[32rem] border border-white rounded-full absolute flex justify-center items-center ${positionOffset?.[position]} border-opacity-40`}>
      <Link className="absolute rounded-full z-50 flex justify-center  w-[55%] h-[55%] items-center" href={href === activePath ? '#home' : href}>
        <motion.div initial={{ scale: 1, borderWidth: 10 }}
          whileHover={{
            scale: 1.05,
            transition: {
              type: "spring",
              mass: 0.5,
              bounce: 1,
              damping: 8
            }
          }}
          transition={{
            type: "spring",
            mass: 0.5,
            bounce: 1,
            damping: 8
          }}
          className="w-full h-full border-opacity-30 absolute border-white rounded-full" />
      </Link>
      <div className={`transition-all duration-[3000ms] absolute w-full h-full opacity-80 ${href === activePath ? `${position === "left" && 'scale-[-1]'}` : `${position === "right" && 'scale-[-1]'}`}`}>
        <SphereCanvas lightPosition={[1, 0, 0]} />
      </div>
    </div>
  )
}
