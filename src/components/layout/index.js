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
      if (el.tagName === "A") {
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
      scale: onLink ? 1.2 : 0.6,
      backgroundColor: onLink ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
      transition: {
        type: "spring",
        mass: 0.1,
        bounce: 1,
        damping: 3
      }
    }
  }


  return (
    <div className="">
      <motion.div
        className="w-14 h-14 flex justify-center items-center pointer-events-none top-0 left-0 border-2 border-white fixed rounded-full"
        initial={false}
        variants={variants}
        animate={"default"}

      >
        {
          onLink ?
            <div className="text-black text-sm" >
              Visit
            </div>
            :
            null
        }
      </motion.div>
      {children}
    </div>
  )
}
