import { useMotionValue, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Home from "./home";
import Planet from "../sections/planet";
import About from "./about";
import Works from "./works";

export default function Template({ data }) {

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

  useEffect(() => {
    setactivePath(router.asPath.replace('/', ''))
  }, [])


  const options = {
    '#works': '-translate-x-[100vw]',
    '#home': 'translate-x-[0vw]',
    '#about': 'translate-x-[100vw]'
  }

  const [width, setWidth] = useState(0);
  
  const angle = 360 / data.categories.length

  let rotations = []
  let rot = -angle / 5


  data.categories.forEach(cat => {
    rotations.push(rot)
    rot = rot + angle / 10
  })

  const categoryNames = [...new Set(data.categories.map((item) => item.attributes.name))];

  const categoryRefs = useRef({});
  categoryNames.forEach((name) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    categoryRefs.current[name] = useRef(null);
  });

  const [swiper, setSwiper] = useState(null)

  function handleClick(name) {
    swiper.slideToLoop(Number(categoryRefs.current[name].current.id), 2000)
  }
  
  return (
    <motion.div onPointerMove={(e) => {
      mouseX.set(e.clientX - bounds.x - bounds.width / 2);
      mouseY.set(e.clientY - bounds.y - bounds.height / 2);
    }}
      className={`w-[300vw] transform-gpu ${activePath !== "" ? options[activePath] : options['#home']} ease-in-out duration-[3000ms] transition-all h-full flex justify-center items-center relative`}>
      <Planet setWidth={setWidth} href={'#about'} position={"left"} activePath={activePath} />
      <Planet setWidth={setWidth} href={'#works'} position={"right"} activePath={activePath} />
      <div className={`absolute flex items-center transition-all ease-in-out delay-[1500ms] duration-[3000ms] w-[32rem] h-[32rem] border-8 ${activePath === "#works" ? 'opacity-100 ' : 'opacity-0 -rotate-90'}  -right-[16rem] border-l-transparent border-t-transparent border-b-transparent rounded-full flex justify-center items-center z-20`} >
        <div className="absolute flex justify-center items-center w-full h-full flex-col">
          {data.categories.map((cat, i) => {
            return <p onClick={() => {handleClick(cat.attributes.name)}} className="absolute w-48 hover:font-semibold opacity-60 hover:opacity-100 transition-all" style={{ transform: `rotate(${rotations[i] * 1}deg) translate(${(width/2 + 110)}px) rotate(${rotations[i] * -1}deg)` }} key={i}>
              {cat.attributes.name}
            </p>
          })}
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
          <Works setSwiper={setSwiper} refs={categoryRefs} data={data.projects} />
        </div>
      </div>

    </motion.div>
  )
}
