'use client'
import React, { useLayoutEffect, useRef } from 'react'
import GridBox from './GridBox'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const gridBoxes = [
  { src: "/gemini1.png", alt: "amg", number: 1 },
  null,
  { src: "/gemini4.png", alt: "hyperloq", number: 2 },
  null, null,
  { src: "/gemini6.png", alt: "4028", number: 3 },
  null, null, null, null, null,
  { src: "/widestep2.png", alt: "widestep", number: 4 },
  { src: "/females.png", alt: "females", number: 5 },
]

const SelectedWorks = () => {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Texts: up + fade
      gsap.from('.reveal-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      // Cards: animate one-by-one
      const cards = gsap.utils.toArray<HTMLElement>('.reveal-card')
      cards.forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
          {
            clipPath: 'inset(0 0 0% 0)', opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true }
          }
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="flex flex-col gap-16 min-h-screen w-full text-white">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="reveal-text text-lg font-normal mb-4 opacity-70">
            Featured projects:5
          </h2>
          <h2 className="reveal-text text-4xl md:text-6xl font-normal max-w-3xl leading-tight">
            Selection of projects highlighting diverse skills in development.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full h-full auto-rows-fr">
        {gridBoxes.map((box, index) =>
          box ? (
            <div key={index} className="reveal-card w-full h-full min-h-[300px]">
              <GridBox src={box.src} alt={box.alt} number={box.number} />
            </div>
          ) : (
            <div key={index} className="md:block hidden" />
          )
        )}
      </div>
    </div>
  )
}

export default SelectedWorks