'use client'
import React, { useLayoutEffect, useRef } from 'react'
import GridBox from './GridBox'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const gridBoxes = [
    {
        src: "/gemini1.png",
        alt: "amg",
        number: 1
    },
    null, // Empty space
    {
        src: "/gemini4.png",
        alt: "hyperloq",
        number: 2
    },
    null, // Empty space
    null, // Empty space
    {
        src: "/gemini6.png",
        alt: "4028",
        number: 3
    },
    null, // Empty space
    null, // Empty space
    null, // Empty space
    null, // Empty space
    null, // Empty space
    {
        src: "/widestep2.png",
        alt: "widestep",
        number: 4
    },
    {
        src: "/females.png",
        alt: "females",
        number: 5
    },

]

const SelectedWorks = () => {
    const rootRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        // Texts: up + fade
        gsap.from('.reveal-text', {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 85%',
            once: true,
          },
        })
    
        // Cards: animate one-by-one when each enters the viewport
    const cards = gsap.utils.toArray<HTMLElement>('.reveal-card')
    cards.forEach((el) => {
        gsap.fromTo(el,
            { clipPath: 'inset(0 0 100% 0)', opacity: 0 },   // hidden from bottom
            { clipPath: 'inset(0 0 0% 0)',  opacity: 1, duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            }
          )
    })
  }, rootRef)
      return () => ctx.revert()
    }, [])
 

  return (
    <>
     <div ref={rootRef} className="flex flex-col gap-4 items-left min-h-screen w-full">
  <div className="flex flex-col gap-30">
    <div>
      <div>
        <h2 className="reveal-text text-lg font-regular mb-4" style={{color: 'white'}}>
          Featured projects:5
        </h2>
      </div>
      <div>
        <h2 className="reveal-text text-5xl font-regular max-w-2xl" style={{color: 'white'}}>
          Selection of projects highlighting
          diverse skills in development.
        </h2>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full h-full">
      {gridBoxes.map((box, index) =>
        box ? (
          <div key={index} className="reveal-card">
            <GridBox src={box.src} alt={box.alt} number={box.number} />
          </div>
        ) : (
          <div key={index} className="md:block hidden" />
        )
      )}
    </div>
  </div>
</div>
     
    </>
    
  )
}

export default SelectedWorks