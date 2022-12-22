import { useMotionValue, motion as mot } from "framer-motion";
import useMeasure from "react-use-measure";
import HomeCanvas from "../three/canvas/home";
import SphereCanvas from "../three/canvas/sphere";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Home from "./home";
import Planet from "../sections/planet";

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
        <Planet href={'#about'} position={"left"} activePath={activePath} />
        <Planet href={'#works'} position={"right"} activePath={activePath} />
        <Home />   
    </mot.div>
  )
}
