import { useRef, useState } from "react"

export default function List({ elements, path, position, swiper, activePath, width, categoryRefs }) {

  const positionOptions = {
    right: "-right-[16rem] border-l-transparent",
    center: "border-l-transparent",
    left: "-left-[16rem] border-r-transparent"
  }

  const [activeElement, setActiveElement] = useState('')

  function handleClick(name) {
    swiper.slideToLoop(Number(categoryRefs.current[name].current.id), 2000)
    setActiveElement(name)
  }
  const angle = 360 / elements.length

  let rotations = []
  let rot = -angle / 5

  
  elements.forEach(cat => {
    rotations.push(rot)
    rot = rot + angle / 10
  })

  const adder = position === "left" ? 80 : 110

  return (
    <div style={{width: width, height: width}} className={`absolute flex items-center transition-all ease-in-out delay-[1500ms] duration-[3000ms] border-8 ${activePath === path ? 'opacity-100 ' : 'opacity-0 -rotate-90'} ${positionOptions[position]} border-t-transparent border-b-transparent rounded-full flex justify-center items-center z-20`} >
      <div className="absolute flex justify-center items-center w-full h-full flex-col">
        {elements.map((element, i) => {
          return <p onClick={() => { handleClick(element.attributes.name) }} className={`absolute w-max ${position === "left" ? "min-w-[6rem]" : "min-w-[12rem]"}  hover:font-semibold ${activeElement === element.attributes.name ? 'opacity-100 font-semibold' : 'opacity-60 hover:font-semibold'}  hover:opacity-100 transition-all`} style={{ transform: `rotate(${rotations[i] * 1}deg) translate(${position === "left" ? "-" : ""}${(width / 2 + adder)}px) rotate(${rotations[i] * -1}deg)` }} key={i}>
            {element.attributes.name}
          </p>
        })}
      </div>
    </div>
  )
}
