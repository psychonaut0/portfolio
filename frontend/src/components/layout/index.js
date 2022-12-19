import Navigation from "../sections/navigation"
import Cursor from "../atoms/cursor"

export default function Layout({ data, children }) {




  return (
    <div className="w-screen h-screen overflow-hidden animate-gradient">
      <Cursor />
      <div className="flex w-full h-full min-h-screen justify-center items-center">
        {children}
        <Navigation data={data.navigation} />
      </div>
    </div>
  )
}
