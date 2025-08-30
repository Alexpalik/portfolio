'use client'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScrolling() {
  useEffect(() => {
    // Check if it's mobile
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    if (isMobile) {
      // Use native smooth scrolling on mobile
      document.documentElement.style.scrollBehavior = 'smooth'
      return
    }

    // Initialize Lenis only on desktop
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return null
}