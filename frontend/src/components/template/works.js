import React from 'react'
import { motion } from 'framer-motion'

export default function Works() {

  const grid = [
    'zio',
    'pera',
    'feccia',
    'violenta',
    'zio',
    'pera',
    'feccia',
    'violenta',
    'zio',
    'pera',
    'feccia',
    'violenta',
    'zio',
    'pera',
    'feccia',
    'violenta',
    'zio',
    'pera',
    'feccia',
    'violenta',
    'zio',
    'pera',
    'feccia',
    'violenta',
    'zio',
    'pera',
    'feccia',
    'violenta',
    'zio',
    'pera',
    'feccia',
    'violenta',
    'zio',
    'pera',
    'feccia',
    'violenta',
    'zio',
    'pera',
    'feccia',
    'violenta',
    'zio',
    'pera',
    'feccia',
    'violenta',
    'zio',
    'pera',
    'feccia',
    'violenta'
  ]

  const list = [
    'zio',
    'pera',
    'feccia',
    'violenta',
  ]

  return (
    <div className='w-full flex'>

      <div className='w-[40%]'>
      </div>
      <div className='relative w-[60%] h-full'>
        <motion.div

          className='w-full grid grid-cols-2 gap-0 divide-x divide-y h-screen scrollbar-hide overflow-y-scroll duration-1000'>
          {
            grid.map((el, i) => {
              return <div key={i} className=' p-48 flex justify-center items-center'>
                {el}
              </div>
            })
          }
        </motion.div>
      </div>
    </div>
  )
}
