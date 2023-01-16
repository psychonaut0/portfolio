import Navigation from "../sections/navigation"
import Cursor from "../atoms/cursor"

export default function Layout({ data, children }) {




  return (
    <div className="w-screen h-screen max-h-[1200px] overflow-x-hidden animate-gradient">
      <Cursor />
      <div className="flex w-full h-full justify-center items-center">
        {children}
        <Navigation data={data.navigation} />
      </div>
    </div>
  )
}
