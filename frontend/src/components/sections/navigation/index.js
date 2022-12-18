import { AnimatePresence, AnimateSharedLayout, LayoutGroup, motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from "react"


export default function Navigation({ data }) {

  const router = useRouter()
  const [activePath, setActivePath] = useState(0)

  useEffect(() => {
    const onHashChangeStart = (url) => {
      data.map((element, i) => {
        if (url.replace('/', '') === element.path) {
          setActivePath(i)
        }
      })

    }
    router.events.on("hashChangeStart", onHashChangeStart)

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    }
  }, [router.events, data])

  return (
    <div className="fixed bottom-0 flex z-50 space-x-20 py-10">
      <LayoutGroup
        id="navigation-menu"
      >
        {
          data.map((element, i) => {
            return <Link passHref className={`${activePath === i ? 'text-orange-400' : ''} transition-all flex flex-col items-center font-bold text-xl uppercase tracking-widest hover:text-orange-400`} href={element.path} key={i}>
              <p className="py-1">
                {element.title}
              </p>
                {
                  activePath === i &&
                  <motion.div layoutId={'underline'} 
                  className="w-[110%] rounded-full h-[2px] bg-orange-400" 
                  transition={{
                    type: "spring"
                  }}/>
                }
            </Link>
          })
        }
      </LayoutGroup>
    </div>
  )
}
