import React from 'react'
import { motion } from 'framer-motion'
import Image from "next/image"

export default function Works({ data }) {
  console.log(data)

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

      <div className='w-[30%]'>
      </div>
      <div className='relative w-[70%] h-full'>
        <motion.div

          className='w-full grid grid-cols-2 gap-0 h-screen scrollbar-hide overflow-y-scroll duration-1000'>
          {
            data.map((project, i) => {
              return <div key={i} className=' odd:border-r-0 border-t-0 group relative border border-white border-opacity-20 p-40 flex justify-center items-center'>
                {
                  project.attributes.thumbnail.data &&
                  <Image alt={'proj'} className="duration-500 object-cover opacity-70 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all" fill src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.thumbnail.data.attributes.url}`} />
                }
                <div className='absolute w-full h-full group-hover:opacity-90 opacity-30 duration-500 bg-gradient-to-t from-black top-0 pointer-events-none' />
                <div className='absolute w-full h-full radial-gradient top-0 pointer-events-none' />
                <a href={project.attributes.url} target={"_blank"} rel="noreferrer" className='transition-all opacity-0 group-hover:opacity-100 text-white text-2xl font-sans py-4 absolute z-20 bottom-0 left-0 px-4'>
                  {project.attributes.title}
                </a>
                {
                  project.attributes.repoUrl &&
                  <a href={project.attributes.repoUrl} target={"_blank"} rel="noreferrer" className='transition-all opacity-0 group-hover:opacity-100 text-white text-2xl font-sans py-4 absolute z-20 bottom-0 right-0 px-4'>
                    g
                  </a>
                }
              </div>
            })
          }
        </motion.div>
      </div>
    </div>
  )
}
