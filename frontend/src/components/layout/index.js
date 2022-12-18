import { useEffect, useState } from "react"
import { delay, motion } from "framer-motion"

export default function Layout({ children }) {

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  })

  const [onLink, setOnLink] = useState(false)

  function handleMouseMove(e) {
    setOnLink(false)

    setMousePosition({
      x: e.clientX,
      y: e.clientY
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
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: onLink ? 1 : 0.6,
      transition: {
        type: "spring",
        mass: 0.1,
        bounce: 1,
        damping: 4
      }
    }
  }


  return (
    <div className="">
      <motion.div
        className="w-14 h-14 flex justify-center items-center pointer-events-none top-0 left-0 border-2 border-white fixed rounded-full"
        initial={false}
        variants={variants}
        animate={"default"}>
        {
          onLink ?
            <div className="w-4 h-4 bg- text-sm bg-white rounded-full" />
            :
            null
        }
      </motion.div>
      <div className="flex w-full min-h-screen justify-center items-center">
      {children}
      </div>
    </div>
  )
}
