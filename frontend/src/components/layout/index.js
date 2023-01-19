import Navigation from "../sections/navigation"
import Cursor from "../atoms/cursor"
import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Seo from "../configs/seo"

export default function Layout({ data, children }) {

  const router = useRouter()
  const [activePath, setactivePath] = useState('')

  useEffect(() => {
    setactivePath(router.asPath.replace('/', ''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <>
      <div className=" font-test-4 w-screen h-screen overflow-hidden animate-gradient">
        <Seo data={data} />
        <Cursor />
        <div className="flex w-full h-full justify-center items-center">
          {children}
          <Navigation data={data.navigation} />
        </div>
      </div>
    </>
  )
}
