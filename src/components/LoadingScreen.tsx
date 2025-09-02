'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        gsap.to(containerRef.current, {
          x: '100%',
          duration: 1,
          ease: 'power2.inOut',
          onComplete: onLoadingComplete
        })
      }
    })

    // Animation sequence
    tl.from(linesRef.current?.children || [], {
      scaleY: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    })
    .from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)'
    }, '-=0.5')
    .to({}, { duration: 1 }) // Hold

  }, [onLoadingComplete])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-black z-[9999] flex items-center justify-center"
    >
      <div ref={linesRef} className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-full bg-white/20"
            style={{ left: `${20 + i * 15}%` }}
          />
        ))}
      </div>
      
      <h1 
        ref={textRef}
        className="text-6xl font-black text-white text-center"
      >
        ALEXANDROS PALIKROUSIS
      </h1>
    </div>
  )
}