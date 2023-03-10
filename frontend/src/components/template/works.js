import React from 'react'
import { motion } from 'framer-motion'
import Image from "next/image"
import { FreeMode, Scrollbar, Mousewheel, Keyboard } from "swiper";
import { useAtom } from "jotai";
import { cursorState } from '../../state';
import { Swiper, SwiperSlide } from 'swiper/react';



import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/scrollbar";
import { Icon } from '../utils/functions';



export default function Works({ data, refs, setSwiper }) {
  const [cursor, setCursor] = useAtom(cursorState)


  const dividedData = data.reduce((acc, item, index) => {
    if (index % 2 === 0) {
      acc.push([item]);
    } else {
      acc[acc.length - 1].push(item);
    }
    return acc;
  }, []);

  let category = ""


  return (
    <div className='w-full flex'>

      <div className='md:w-[30%]'>
      </div>
      <div className='w-full md:w-[70%] h-screen'>
        <Swiper
          onSwiper={(swiper) => { setSwiper(swiper) }}
          onTouchEnd={(e) => { setCursor("") }}
          onTouchMove={(e) => { e.swipeDirection === "prev" ? setCursor("dragTop") : setCursor("dragBottom") }}
          onTouchMoveOpposite={(e) => { setCursor("") }}
          direction='vertical'
          freeMode={true}
          scrollbar={true}
          mousewheel={true}
          slidesPerView={2}
          keyboard={{
            enabled: true,
          }}
          loop={true}
          modules={[FreeMode, Scrollbar, Mousewheel, Keyboard]}
          className="w-full h-full"
        >          {
            dividedData.map((projects, i) => {

              return <SwiperSlide key={i}>
                <div className='w-full h-full relative  flex'>
                  {
                    projects.map((project, innerIndex) => {
                      return <div id={i} ref={refs.current[project.attributes.category.data.attributes.name]} key={innerIndex} className={`w-1/2 h-full relative group ${i === 1 && 'border-l-0 border-t-0'} border border-white`}>
                        {
                          project.attributes.thumbnail.data ?
                            project.attributes.url ?
                              <a aria-label={`View ${project.attributes.title}`} href={project.attributes.url ? project.attributes.url : project.attributes.repoUrl}>
                                <Image sizes="(max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw"
                                  alt={project.attributes.thumbnail.data.attributes.alternativeText} className="duration-500 object-cover gra group-hover:opacity-100 group-hover:grayscale-0 transition-all" fill src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.thumbnail.data.attributes.url}`} />
                              </a>
                              :
                              <Image sizes="(max-width: 768px) 100vw,
                          (max-width: 1200px) 50vw,
                          33vw"
                                alt={project.attributes.thumbnail.data.attributes.alternativeText} className="duration-500 object-cover gra group-hover:opacity-100 group-hover:grayscale-0 transition-all" fill src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${project.attributes.thumbnail.data.attributes.url}`} />
                            :
                            null
                        }
                        <div className='absolute w-full h-full group-hover:opacity-90 opacity-30 duration-500 bg-gradient-to-t from-black top-0 pointer-events-none' />
                        <div className='absolute w-full h-full group-hover:hidden radial-gradient top-0 pointer-events-none' />
                        <span className=' transition-all bg-black border-white border-t border-r  text-white text-lg lg:text-xl font-sans px-2 py-2 lg:py-4 absolute z-20 bottom-0 left-0 lg:px-4'>
                          {
                            project.attributes.url ?
                              <a href={project.attributes.url} target={"_blank"} rel="noreferrer" >
                                {project.attributes.title}
                              </a>
                              :
                              project.attributes.repoUrl ?
                                <a href={project.attributes.repoUrl} target={"_blank"} rel="noreferrer" >
                                  {project.attributes.title}
                                </a>
                                :
                                <p >
                                  {project.attributes.title}
                                </p>
                          }
                        </span>
                        {
                          project.attributes.repoUrl &&
                          <a aria-label={`Github repo of ${project.attributes.title}`} href={project.attributes.repoUrl} target={"_blank"} rel="noreferrer" className='bg-black border-white border-b border-l transition-all opacity-100 text-white text-lg lg:text-2xl font-sans px-2 py-2 lg:py-4 absolute z-20 top-0 right-0 lg:px-4 '>
                            <Icon className={"text-xl lg:text-3xl opacity-6 hover:opacity-100 transition-all"} name={'github'} />
                          </a>
                        }
                      </div>
                    })
                  }
                </div>
              </SwiperSlide>
            })
          }
        </Swiper>
      </div>
    </div>
  )
}
