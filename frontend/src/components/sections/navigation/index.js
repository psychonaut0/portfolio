import { LayoutGroup, motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useState } from "react"


export default function Navigation({ data }) {

  const router = useRouter()
  const [activePath, setActivePath] = useState(1)

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

  useEffect(() => {
    data.map((element, i) => {
      if (router.asPath.replace('/', '') === element.path) {
        setActivePath(i)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="text-white font-mono justify-center items-center fixed bottom-0 flex py-2 lg:py-4 xl:py-6">
      <div className="pointer-events-none absolute w-screen h-full bg-gradient-to-t from-black" />
      <LayoutGroup
        id="navigation-menu"
      >
        {
          data.map((element, i) => {
            return <Link passHref className={`${activePath === i ? 'text-orange-400' : 'text-white'} px-7 font-light transition-all flex flex-col items-center justify-center text-sm lg:text-base xl:text-lg uppercase tracking-wider hover:text-orange-400 relative`} href={element.path} key={i}>
              <p className="py-1 xl:py-2">
                {element.title}
              </p>
              {
                activePath === i &&
                <motion.div layoutId={'underline'}
                  className="w-[120%] rounded-full h-[1px] bg-orange-400"
                  transition={{
                    type: "spring"
                  }} />
              }
            </Link>
          })
        }
      </LayoutGroup>
    </div>
  )
}
