import { useEffect, useState } from "react"
import { AnimatePresence, LayoutGroup, delay, motion } from "framer-motion"
import Navigation from "../sections/navigation"

export default function Layout({ data, children }) {

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  })

  const [onLink, setOnLink] = useState(false)

  function handleMouseMove(e) {
    setOnLink(false)

    setMousePosition({
      x: e.clientX - 20,
      y: e.clientY - 20
    })

    e.path.forEach(el => {
      if (el.tagName === "A" && el.href !== "") {
        setOnLink(true)
      }
    })
  }

  useEffect(() => {


    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }

  }, [])

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: onLink ? 1 : 0.6,
      transition: {
        type: "spring",
        mass: 0.1,
        bounce: 0,
        damping: 4
      }
    }
  }


  return (
    <LayoutGroup>
      <motion.div
        className="w-14 h-14 z-[999] flex justify-center items-center pointer-events-none border-2 border-white fixed rounded-full"
        initial={false}
        variants={variants}
        layoutId={'cursor'}
        animate={"default"}>
        <AnimatePresence>
          {
            onLink && <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",

              }}
              className="w-4 h-4 bg- text-sm bg-white rounded-full" />
          }
        </AnimatePresence>
      </motion.div>
      <div className="flex w-full min-h-screen justify-center items-center">
        {children}
        <Navigation data={data.navigation} />
      </div>
    </LayoutGroup>
  )
}
