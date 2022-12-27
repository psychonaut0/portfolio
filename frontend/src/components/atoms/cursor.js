import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"


export default function Cursor() {

 

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const [onLink, setOnLink] = useState(false)

  
  useEffect(() => {
    
    function handleMouseMove(e) {
      setOnLink(false)
      x.set(e.clientX - 20) 
      y.set(e.clientY - 20)
  
      e.path.forEach(el => {
        if (el.tagName === "A" && el.href !== "") {
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
   
      className="w-14 h-14 z-[999] flex justify-center items-center pointer-events-none border-2 border-white fixed rounded-full"
      initial={false}
      id={'cursor'}
      animate={{
        scale: onLink ? 1 : 0.6
      }}
      style={{ x, y,}}
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
            className="w-4 h-4 bg- text-sm bg-white rounded-full" />
        }
      </AnimatePresence>
    </motion.div>
  )
}
