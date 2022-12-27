import { useMotionValue, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Home from "./home";
import Planet from "../sections/planet";
import About from "./about";
import Works from "./works";

export default function Template({data}) {

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [ref, bounds] = useMeasure({ scroll: false });

  const router = useRouter()
  const [activePath, setactivePath] = useState('')

  useEffect(() => {

    const onHashChangeStart = (url) => {
      setactivePath(url.replace('/', ''))
    }

    router.events.on("hashChangeStart", onHashChangeStart)

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart)
    }
  }, [router.events])

  const options = {
    '#works': '-translate-x-[100vw]',
    '#home': 'translate-x-[0vw]',
    '#about': 'translate-x-[100vw]'
  }


  return (
    <motion.div onPointerMove={(e) => {
      mouseX.set(e.clientX - bounds.x - bounds.width / 2);
      mouseY.set(e.clientY - bounds.y - bounds.height / 2);
    }}
      className={`w-[300vw] transform-gpu ${activePath !== "" ? options[activePath] : options['#home']} ease-in-out duration-[3000ms] transition-all h-full flex justify-center items-center relative`}>
      <Planet href={'#about'} position={"left"} activePath={activePath} />
      <Planet href={'#works'} position={"right"} activePath={activePath} />
      <div className={`absolute flex items-center transition-all ease-in-out delay-[1500ms] duration-[3000ms] w-[32rem] h-[32rem] border-8 ${activePath === "#works" ? 'opacity-100 ' : 'opacity-0 -rotate-90'}  -right-[16rem] border-l-transparent border-t-transparent border-b-transparent rounded-full`} >
      <div className="absolute flex flex-col space-y-8 -right-10">
        <p>
          al
        </p>
        <p>
          a
        </p>
        <p>
          a
        </p>
        <p>
          a
        </p>
        <p>
          a
        </p>
        <p>
          a
        </p>
      </div>
      </div>
      <div className="w-[300vw] flex absolute">
        <div className="pr-[16rem] w-[100vw] flex justify-center items-center">
          <About />
        </div>
        <div className="px-[16rem] w-[100vw] flex justify-center items-center">
          <Home />
        </div>
        <div className="pl-[16rem] w-[100vw] flex justify-center items-center ">
          <Works data={data.projects} />
        </div>
      </div>

    </motion.div>
  )
}
