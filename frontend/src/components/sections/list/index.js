import { useRef, useState } from "react"

export default function List({ elements, path, position, swiper, activePath, width, categoryRefs }) {


  const positionOptions = {
    right: "-right-[16rem] border-l-transparent",
    center: "border-l-transparent",
    left: "-left-[16rem] border-r-transparent"
  }
  
  const [activeElement, setActiveElement] = useState('')
  const [angle, setAngle] = useState(360 / (elements.length + 2))
  const [elementsState, setElementsState] = useState(elements)

  

  function handleClick(name, index) {
    setActiveElement(name)
    if (swiper) {
      swiper.slideToLoop(Number(categoryRefs.current[name].current.id), 2000)
    }
    const selectedElement = elementsState[index]
    if (selectedElement.attributes.skills) {
      if(activeElement !== selectedElement.attributes.name){
        setAngle(360 / (elements.length + 2 + selectedElement.attributes.skills.data.length))
        let temp = [...elements]
        temp.splice(index + 1, 0, ...selectedElement.attributes.skills.data)
        console.log(temp)
        setElementsState(temp)
      }
      else{
        setElementsState(elements)
        setAngle(360 / (elements.length + 2))
        setActiveElement('')
      }
    }
  }


  let rotations = []
  let rot = -angle / (6 + elements.length)


  elementsState.forEach(cat => {
    rotations.push(rot)
    rot = rot + angle / 10
  })

  if(path === "#about"){
    console.log(elementsState)
  }


  const adder = position === "left" ? 80 : 110

  return (
    <div style={{ width: width, height: width }} className={`absolute flex items-center transition-all ease-in-out delay-[1500ms] duration-[3000ms] border-8 ${activePath === path ? 'opacity-100 ' : 'opacity-0 -rotate-90'} ${positionOptions[position]} border-t-transparent border-b-transparent rounded-full flex justify-center items-center z-20`} >
      <div className="absolute flex justify-center items-center w-full h-full flex-col">
        {elementsState.map((element, i) => {
          return <>
            <p
              onClick={() => { handleClick(element.attributes.name, i) }}
              className={`
                absolute w-max hover:font-semibold hover:opacity-100 transition-all
                ${position === "left" ? "min-w-[6rem]" : "min-w-[12rem]"} 
                ${activeElement === element.attributes.name ? 'opacity-100 font-semibold' : 'opacity-60 hover:font-semibold'}`
              }
              style={{ 
                transform: `rotate(${rotations[i] * (position === "left" ? -1 : 1)}deg)translate(${position === "left" ? "-" : ""}${(width / 2 + adder)}px) rotate(${rotations[i] * (position === "left" ? 1 : -1)}deg)` 
              }}
              key={i}>
              {element.attributes.name}
            </p>
          </>
        })}
      </div>
    </div>
  )
}
