import React from 'react'
import { sanitize } from '../utils/functions'

export default function About({ data }) {
  return (
    <div className='w-full flex flex-col px-28'>
      <div className='w-[55%] flex space-y-8 flex-col'>
        <h1 className='text-7xl font-bold'>
          {data.title}
        </h1>
        <div className='flex relative'>
          <div className='absolute h-full w-[1px] bg-white' />
          <article className='prose prose-invert font-light pl-6 py-6 leading-relaxed text-xl' dangerouslySetInnerHTML={{ __html: sanitize(data.content) }} />
        </div>
      </div>
    </div>
  )
}
