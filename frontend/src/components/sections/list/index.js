import { useRef, useState } from "react"
import { Icon } from "../../utils/functions"
import { AnimatePresence, motion } from "framer-motion"

export default function List({ elements, path, position, swiper, activePath, width, categoryRefs }) {

  const positionOptions = {
    right: `-right-[16rem] lg:-right-[9rem] xl:-right-[14rem] 2xl:-right-[16rem]`,
    center: ``,
    left: `-left-[14rem] lg:-left-[9rem] -left-[12rem] lg:-left-[12rem] xl:-left-[14rem] 2xl:-left-[16rem]`
  }

  const borderOptions = {
    right: "border-l-transparent",
    center: "border-transparent",
    left: "border-r-transparent"
  }

  const [activeElement, setActiveElement] = useState('')
  const [angle, setAngle] = useState(60)
  const [elementsState, setElementsState] = useState(elements)



  function handleClick(name, index) {
    setActiveElement(name)
    if (swiper) {
      swiper.slideToLoop(Number(categoryRefs.current[name].current.id), 2000)
    }
    const selectedElement = elementsState[index]
    if (selectedElement.attributes.type === 'back') {
      setElementsState(elements)
      setAngle(60)
      setActiveElement('')
    }
    else {
      if (selectedElement.attributes.skills) {
        const skillArray = selectedElement.attributes.skills.data.map(skill => ({ ...skill, type: 'skill' }))
        if (activeElement !== selectedElement.attributes.name) {
          let temp = [...elements]
          const position = (index - (index > 3 && (elementsState.length - elements.length))) + 1
          temp = [selectedElement, ...skillArray, { attributes: { name: "Back", type: 'back', iconName: 'back' } }]
          setElementsState(temp)
        }
        else {
          setElementsState(elements)
          setActiveElement('')
        }
      }
    }

  }

  let rotations = []
  let rot = -angle + 40 - elementsState.length * 4


  elementsState.forEach(element => {
    if (element.type === "skill") {
      rot = rot + angle / 6
    }
    else {
      rot = rot + angle / 4
    }
    rotations.push(rot)
  })

  const adder = position === "left" ? 100 : 110
  const subElement = 20


  return (
    width > 10 ? <div style={{ width: width > 10 ? width : 0, height: width > 10 ? width : 0 }} className={`hidden absolute sm:flex items-center transition-all ease-in-out delay-[1500ms] duration-[3000ms]  ${activePath === path ? 'opacity-100 ' : 'opacity-0 -rotate-90'} ${positionOptions[position]} rounded-full flex justify-center items-center`}>
      <div className={`absolute pointer-events-none z-[999] w-full h-full rounded-full border-white border-[4px] border-t-transparent border-b-transparent ${borderOptions[position]}`} />
      <div className="absolute flex justify-center items-center w-full h-full flex-col">
        <AnimatePresence
          key={`el_${path}`}
        >
          {elementsState.map((element, i) => {
            return <motion.div
              onClick={element.type !== "skill" ? () => { handleClick(element.attributes.name, i) } : null}
              className={`
                absolute z-[999] w-max transition-all font-mono
                ${position === "left" ? "min-w-[6rem]" : "min-w-[12rem]"} 
                ${(activeElement === element.attributes.name) ? 'opacity-100 font-semibold' : (element.type !== "skill") && "opacity-60"}
                ${(element.type === "skill") ? `opacity-100` : "cursor-pointer hover:font-semibold hover:opacity-100 text-lg"}
              `}
              style={{
                transform: `${width > 10 && `rotate(${rotations[i] * (position === "left" ? -1 : 1)}deg) translate(${position === "left" ? "-" : ""}${((width < 10 ? 100 : width) / 2 + adder + (element.type === "skill" ? subElement : 0))}px) rotate(${rotations[i] * (position === "left" ? 1 : -1)}deg)`}`
              }}
              key={`${path}${i}`}>
              {
                path === "#about" ?
                  <span className={`transition-all flex items-center ${activeElement === element.attributes.name ? '-translate-x-14 border-b border-b-white' : 0}`}>
                    {element.attributes.name !== "Back" ? activeElement !== element.attributes.name ? `.0${i}// ` : '' : ''} {activeElement === element.attributes.name ? "~/" : ""}<Icon className={"p-2"} name={element.attributes.iconName} size={"2rem"} />{element.attributes.name}
                  </span>
                  :
                  path === "#works" ?
                    <>
                      {`.0${i}// `}{element.attributes.name}
                    </>
                    :
                    <a className="flex items-center" href={element.attributes.url} target={"_blank"} rel="noreferrer">
                      <Icon className={"p-2"} name={element.attributes.iconName} size={"2.5rem"} /> {element.attributes.name}
                    </a>
              }
            </motion.div>
          })}
        </AnimatePresence>
      </div>
    </div>
      :
      <AnimatePresence key={`el_${path}`}>
        <div className={`${positionOptions[position]} absolute z-[999] hidden sm:flex flex-col space-y-4 h-full py-20`}>
          {elementsState.map((element, i) => {
            return <motion.div
              onClick={element.type !== "skill" ? () => { handleClick(element.attributes.name, i) } : null}
              className={`
           w-max transition-all font-mono
           
          ${position === "left" ? "min-w-[6rem]" : "min-w-[12rem]"} 
          ${(activeElement === element.attributes.name) ? 'opacity-100 font-semibold' : (element.type !== "skill") && "opacity-60"}
          ${(element.type === "skill") ? `opacity-100` : "cursor-pointer hover:font-semibold hover:opacity-100 text-lg"}
        `}
              key={`${path}${i}`}>
              {
                path === "#about" ?
                  <span className={`transition-all flex items-center ${activeElement === element.attributes.name ? '-translate-x-4 border-b border-b-white' : 0}`}>
                    {element.attributes.name !== "Back" ? activeElement !== element.attributes.name ? `.0${i}// ` : '' : ''} {activeElement === element.attributes.name ? "~/" : ""}<Icon className={"p-2"} name={element.attributes.iconName} size={"2rem"} />{element.attributes.name}
                  </span>
                  :
                  path === "#works" ?
                    <>
                      {`.0${i}// `}{element.attributes.name}
                    </>
                    :
                    path === "" ?
                    <a className="flex items-center" href={element.attributes.url} target={"_blank"} rel="noreferrer">
                      <Icon className={"p-2"} name={element.attributes.iconName} size={"2.5rem"} /> {element.attributes.name}
                    </a>
                    :
                    <a className="flex items-center" href={element.attributes.url} target={"_blank"} rel="noreferrer">
                      <Icon className={"p-2"} name={element.attributes.iconName} size={"2.5rem"} /> {element.attributes.name}
                    </a>
              }
            </motion.div>
          })}
        </div>
      </AnimatePresence>
  )
}
