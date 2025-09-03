'use client'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400','500', '600', '700'],
  variable: '--font-montserrat'
})


import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!boxRef.current || !textRef.current) return

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: onLoadingComplete
    })

    // Set initial states
    gsap.set(boxRef.current, {
      opacity: 0,
      x: "100%",  // Start from right side
      width: "0px",
      height: "10px",
      transformOrigin: "bottom center",  // Expand from right
    })

    gsap.set(textRef.current, {
      opacity: 1  // Make sure text container is visible
    })

    // Animation sequence
    tl
      // Box slides in from right
      .to(boxRef.current, {
        x: "0%",
        opacity: 1,
        duration: 0.01,
        ease: "power2.out"
      })
      // Box expands width
      .to(boxRef.current, {
        width: "100%",
        duration: 0.4,
        ease: "power2.inOut"
      }, "0.5" )
      // Box expands height
      .to(boxRef.current, {
        height: "300px",
        duration: 0.8,
        ease: "back.out(1.2)"
      }, "-=0.2")
      // Text appears
      .from(".char", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        transformOrigin: "center center"
      }, "-=0.2")
      .to({}, { duration: 0.5 })
      .to(".char",{
        opacity: 0
      })
      .to(boxRef.current, {
        width: "100vw",
        height: "100vh",
        left: 0,
        top: 0,
        right: "auto",
        bottom: "auto",
        transform: "translate(0, 0)",
        duration: 1.2,
        ease: "power2.inOut"
      }, "-=0.3")
      

  }, [onLoadingComplete])

  const splitText = (text: string, className: string) => {
    console.log('Splitting text:', text); // Add this line
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className={`${className}`}
        
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-white z-[9999] overflow-hidden"
    >
      {/* Black box */}
      <div 
        ref={boxRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black flex items-center justify-center opacity-0"
      >
        {/* Text content */}
        <div ref={textRef} className="text-center opacity-0">
          <h1 className={`text-4xl md:text-7xl font-black text-white tracking-wider leading-tight ${montserrat.className}`}>
            {splitText("ALEXANDROS PALIKROUSIS", "char")}
          </h1>
        </div>
      </div>
    </div>
  )
}