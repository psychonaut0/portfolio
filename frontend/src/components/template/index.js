import { useMotionValue, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Home from "./home";
import Planet from "../sections/planet";
import About from "./about";
import Works from "./works";
import List from "../sections/list";
import Image from "next/image";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const options = {
    '#works': '-translate-x-[100vw]',
    '#home': 'translate-x-[0vw]',
    '#about': 'translate-x-[100vw]'
  }

  const [planetWidth, setPlanetWidth] = useState(0);
  const [homeCircleWidth, setHomeCircleWidth] = useState(0)

  const categoryNames = [...new Set(data.categories.map((item) => item.attributes.name))];

  const categoryRefs = useRef({});
  categoryNames.forEach((name) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    categoryRefs.current[name] = useRef(null);
  });

  const [swiper, setSwiper] = useState(null)



  return (
    <motion.div onPointerMove={(e) => {
      mouseX.set(e.clientX - bounds.x - bounds.width / 2);
      mouseY.set(e.clientY - bounds.y - bounds.height / 2);
    }}
      className={`w-[300vw] transform-gpu overflow-visible ${activePath !== "" ? options[activePath] : options['#home']} ease-in-out duration-[3000ms] transition-all h-full flex justify-center items-center relative`}>
      <Planet setWidth={setPlanetWidth} href={'#about'} position={"left"} activePath={activePath} />
      <Planet setWidth={setPlanetWidth} href={'#works'} position={"right"} activePath={activePath} />
      <List categoryRefs={categoryRefs} swiper={swiper} path={"#works"} activePath={activePath} elements={data.categories} width={planetWidth} position={"right"} />
      <List path={"#about"} activePath={activePath} elements={data.groups} width={planetWidth} position={"left"} />
      <List path={"#home"} activePath={activePath} elements={data.socials} width={homeCircleWidth} position={"center"} />
      <List path={""} activePath={activePath} elements={data.socials} width={homeCircleWidth} position={"center"} />
      <div className="w-[300vw] flex absolute items-center justify-center">
        <div className="pr-[6rem] lg:pr-[12rem] xl:pr-[14rem] 2xl:pr-[16rem] w-[100vw] h-screen overflow-auto">
          <About width={planetWidth} data={data.about} />
        </div>
        <div className="px-0 lg:px-[12rem] xl:px-[14rem] 2xl:px-[16rem] w-[100vw] flex justify-center items-center">
          <Home data={data.home} setWidth={setHomeCircleWidth} />
        </div>
        <div className="md:pl-[12rem] lg:pl-[12rem] xl:pl-[14rem] 2xl:pl-[16rem] w-[100vw] flex justify-center items-center">
          <Works width={planetWidth} data={data.projects} setSwiper={setSwiper} refs={categoryRefs} />
        </div>
      </div>

    </motion.div>
  )
}
