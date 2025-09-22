'use client'

import React, { useRef, useEffect } from 'react'
import { gsap } from '@/utils/gsap'

function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(heroRef.current, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 0%',
          end: 'top -20%',
          scrub: true,
        }
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className='h-[300vh] flex flex-col items-center backdrop-blur-lg backdrop-brightness-75 opacity-0 translate-y-10 pt-72'
    >

      <div className=" text-center max-w-4xl">
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
        >
          Front-End Developer
        </h1>

        <h2
          className="text-2xl md:text-3xl lg:text-4xl mt-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold"
        >
          Code • Create • Innovate
        </h2>

        <p
          className="text-lg md:text-xl lg:text-2xl mt-8 text-gray-300 leading-relaxed max-w-3xl mx-auto"
        >
          3+ years experience specializing in <span className="text-purple-400 font-semibold">Next.js</span>,{' '}
          <span className="text-blue-400 font-semibold">TypeScript</span>, and modern web development.
        </p>

        <div className="flex gap-6 justify-center mt-12">
          <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
            View Projects
          </button>
          <button className="px-8 py-3 border border-white/30 rounded-full font-semibold text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
            Contact Me
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero