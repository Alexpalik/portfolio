'use client'

import { useEffect, useRef, useState } from 'react'

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [render, setRender] = useState(false)
  useEffect(() => {
    setRender(true)
    const isMobile = window.innerWidth <= 768
    if (isMobile){
        setRender(false)
    }
    // Skip on touch devices or reduced motion
    if ('ontouchstart' in window || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY
    const speed = 0.15 // lower = smoother/slower

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const raf = () => {
      // lerp towards target
      x += (targetX - x) * speed
      y += (targetY - y) * speed
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      }
      requestAnimationFrame(raf)
    }

    window.addEventListener('mousemove', onMove)
    const id = requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(id)
    }
  }, [])

  return render && (
    <>
      <div
      ref={dotRef}
      aria-hidden
      className="fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] h-3 w-3 rounded-full none"
      style={{
        backgroundColor: '#22d3ee', // cyan-400
        boxShadow: '0 0 12px rgba(34,211,238,0.8)',
        mixBlendMode: 'normal',
      }}
    />
    </>
    
  )
}