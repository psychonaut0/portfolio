import { useMotionValue, motion as mot } from "framer-motion";
import useMeasure from "react-use-measure";
import HomeCanvas from "../three/canvas/home";
import SphereCanvas from "../three/canvas/sphere";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Template() {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [ref, bounds] = useMeasure({ scroll: false });

  const router = useRouter()
  const [activePath, setactivePath] = useState('')

  useEffect(() => {

    const onHashChangeStart = (url) => {
      setactivePath(url.replace('/',''))
    }

    router.events.on("hashChangeStart", onHashChangeStart)
    
    return () => {
      router.events.off("hashChangeStart", onHashChangeStart)
    }
  }, [router.events])
  
  console.log('activePath', activePath)


  const options = {
    '#works': '-translate-x-[100vw]',
    '#home': 'translate-x-[0vw]',
    '#about': 'translate-x-[100vw]'
  }


  return (
    <mot.div onPointerMove={(e) => {
      mouseX.set(e.clientX - bounds.x - bounds.width / 2);
      mouseY.set(e.clientY - bounds.y - bounds.height / 2);
    }}
      className={`w-[300vw] transform-gpu ${activePath !== "" ? options[activePath]: options['#home']} ease-in-out duration-[3000ms] transition-all h-full flex justify-center items-center relative`}>
      <div className={`w-[32rem] h-[32rem] border border-white rounded-full absolute -left-[16rem] border-opacity-40 flex items-center justify-center`}>
        <Link className="absolute rounded-full z-10 flex justify-center  w-[55%] h-[55%] items-center" href={"#about" === activePath ? '#home' : '#about'}>
          <mot.div initial={{ scale: 1, borderWidth: 10 }}
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
        <div className={`transition-all duration-[3000ms] absolute w-full h-full opacity-80  ${'#about' === activePath ? 'scale-[-1]' : ''}`}>
          <SphereCanvas lightPosition={[1, 0, 0]} />
        </div>
      </div>
      <div className={`transition-all duration-1000 w-[32rem] h-[32rem] border border-white rounded-full absolute flex justify-center items-center -right-[16rem] border-opacity-40`}>
        <Link className="absolute rounded-full z-10 flex justify-center  w-[55%] h-[55%] items-center" href={"#works" === activePath ? '#home' : '#works'}>
          <mot.div initial={{ scale: 1, borderWidth: 10 }}
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
        <div className={`transition-all duration-[3000ms] absolute w-full h-full opacity-80 ${'#works' === activePath ? '' : 'scale-[-1]'}`}>
          <SphereCanvas lightPosition={[1, 0, 0]} />
        </div>
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
        <div className="relative w-[50%] h-[50%] flex justify-center items-center">
          <div className="absolute w-full h-full rounded-full bg-white bg-opacity-50 blur-[100px]" />
          <div className="w-full h-full rounded-full bg-white flex justify-center items-center" />
          <div className="absolute w-[200%] h-[200%] flex justify-center items-center">
            <HomeCanvas mouseX={mouseX} mouseY={mouseY} />
          </div>
        </div>
      </mot.div>
    </mot.div>
  )
}
