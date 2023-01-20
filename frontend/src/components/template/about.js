import React from 'react'
import { sanitize } from '../utils/functions'

export default function About({ data, width }) {
  
  const socialString = `<p>Find me on <a href="https://github.com/psychonaut0"><span style="color:#FB923C;"><u>Github</u></span></a> or <a href="https://www.linkedin.com/in/francesco-barbano/"><span style="color:#FB923C;"><u>Linkedin</u></span></a>.&nbsp;&nbsp;<br>Mail me on <a href="mailto:francesco.barbano@blvckhat.dev"><span style="color:#FB923C;"><u>francesco.barbano@blvckhat.dev</u></span></a>.</p>`

  return (
    <div className='w-full h-full md:pr-20 pl-8 lg:px-28'>
      <div className={`w-full sm:w-[75%] lg:w-[75%] xl:w-[65%] 2xl:w-[55%] pb-16`}>
        <h1 className='text-5xl xl:text-7xl 2xl:text-8xl pt-14 pb-10 font-bold'>
          {data.title}
        </h1>
        <div className='flex relative'>
          <div className='absolute h-full w-[1px] bg-white' />
          <article className='prose prose-invert font-light pl-6 py-6 leading-relaxed text-base lg:text-lg xl:text-xl' dangerouslySetInnerHTML={{ __html: sanitize(`${data.content} ${socialString}`) }} />
        </div>
      </div>
    </div>
  )
}
