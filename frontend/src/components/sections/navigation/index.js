import { LayoutGroup, motion } from "framer-motion"
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
    <div className=" bg-gradient-to-t from-black w-full justify-center fixed bottom-0 flex z-50 space-x-14 py-6">
      <LayoutGroup
        id="navigation-menu"
      >
        {
          data.map((element, i) => {
            return <Link passHref className={`${activePath === i ? 'text-orange-400' : ''} font-light transition-all flex flex-col items-center text-lg uppercase tracking-wider hover:text-orange-400`} href={element.path} key={i}>
              <p className="py-2">
                {element.title}
              </p>
                {
                  activePath === i &&
                  <motion.div layoutId={'underline'} 
                  className="w-[120%] rounded-full h-[1px] bg-orange-400" 
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
