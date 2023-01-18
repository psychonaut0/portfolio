import React from 'react'
import { sanitize } from '../utils/functions'

export default function About({ data, width }) {
  return (
    <div className='w-full h-full md:pr-20 pl-8 lg:px-28'>
      <div className={`w-full lg:w-[75%] xl:w-[65%] 2xl:w-[55%] pb-16`}>
        <h1 className='text-5xl xl:text-7xl 2xl:text-8xl pt-14 pb-10 font-bold'>
          {data.title}
        </h1>
        <div className='flex relative'>
          <div className='absolute h-full w-[1px] bg-white' />
          <article className='prose prose-invert font-light pl-6 py-6 leading-relaxed text-base lg:text-lg xl:text-xl' dangerouslySetInnerHTML={{ __html: sanitize(data.content) }} />
        </div>
      </div>
    </div>
  )
}
