import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { cursorState } from "../../state"


export default function Cursor() {



  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const [onLink, setOnLink] = useState(false)


  const [cursor, setCursor] = useAtom(cursorState)


  useEffect(() => {

    function handleMouseMove(e) {
      setOnLink(false)
      x.set(e.clientX - 25)
      y.set(e.clientY - 25)

      e.composedPath().forEach(el => {
        if (el.tagName === "A" && el.href !== "") {
          setOnLink(true)
        }
        if (el.onclick !== null && el.id !== "__next") {
          setOnLink(true)
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }

  }, [x, y])

  const variants = {
    default: {
      transition: {
        type: "spring",
      }
    }
  }

  return (
    <motion.div
      className="w-14 h-14 z-[999] hidden md:flex justify-center items-center pointer-events-none border-2 border-white rounded-full fixed"
      initial={false}
      id={'cursor'}
      animate={{
        scale: onLink ? 1 : 0.6,
        height: cursor !== "" ? "5rem" : "3.5rem"
      }}
      style={{ x, y, }}
      transition={{
        type: "spring",
        mass: 0.5,
        bounce: 1,
        damping: 6
      }}
    >
      <AnimatePresence>
        {
          onLink && <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              type: "spring",
              mass: 0.5,
              bounce: 1,
              damping: 8
            }}
            className="w-4 h-4 bg-white rounded-full" />
        }

      </AnimatePresence>
      <AnimatePresence>
        {
          cursor === "dragBottom" && <motion.div
            initial={{
              matginTop: "0rem"
            }}
            animate={{
              marginTop: "1rem"
            }}
            className="w-1 h-2 bg-white rounded-full absolute"
          />
        }
        {
          cursor === "dragTop" && <motion.div
            initial={{
              marginBottom: "0rem"
            }}
            animate={{
              marginBottom: "1rem"
            }}
            className="w-1 h-2 bg-white rounded-full absolute"
          />
        }
      </AnimatePresence>
    </motion.div>
  )
}
