import Navigation from "../sections/navigation"
import Cursor from "../atoms/cursor"
import Head from "next/head"

export default function Layout({ data, children }) {




  return (
    <>
      <div className=" font-test-4 w-screen h-screen overflow-hidden animate-gradient">
        <Cursor />
        <div className="flex w-full h-full justify-center items-center">
          {children}
          <Navigation data={data.navigation} />
        </div>
      </div>
    </>
  )
}
