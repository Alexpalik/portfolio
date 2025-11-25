'use client'
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Counter Animation
    const counter = { value: 0 }
    gsap.to(counter, {
      value: 100,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.floor(counter.value))
      },
    })

    const tl = gsap.timeline({
      onComplete: onLoadingComplete
    })

    // Initial State
    gsap.set(textRef.current, { y: 100, opacity: 0 })

    tl.to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 0.5
    })
      .to(counterRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      }, "+=0.5")
      .to(textRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in"
      }, "<")
      .to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut"
      })

  }, [onLoadingComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#1a1a1a] z-[9999] flex flex-col items-center justify-center text-white overflow-hidden"
    >
      <div className="relative overflow-hidden">
        <h1 ref={textRef} className="text-4xl md:text-7xl font-medium tracking-tight">
          Alexandros Palikrousis
        </h1>
      </div>

      <div ref={counterRef} className="absolute bottom-10 right-10 text-8xl md:text-9xl font-bold opacity-20 tabular-nums">
        {count}%
      </div>
    </div>
  )
}