'use client'

import { useState, useLayoutEffect, useRef } from 'react'
import ContactForm from '@/components/ContactForm'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import SelectedWorks from '@/components/SelectedWorks'
import ScrollTrigger from 'gsap/ScrollTrigger'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [animationRan, setAnimationRan] = useState(false)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const landingRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useLayoutEffect(() => {
    // Check if we've already shown the loader this session
    const hasVisited = sessionStorage.getItem('hasVisited')
    if (hasVisited) {
      setIsLoading(false)
      setShowContent(true)
    }
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    sessionStorage.setItem('hasVisited', 'true')
    setShowContent(true)

    // Trigger animation immediately
    requestAnimationFrame(() => {
      const titleElement = titleRef.current
      if (titleElement) {
        const chars = titleElement.querySelectorAll('.char')
        gsap.killTweensOf(chars)

        gsap.fromTo(chars,
          {
            y: 100,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
          }
        )
        setAnimationRan(true)
      }
    })
  }

  useGSAP(() => {
    if (isLoading || !showContent || animationRan) return

    // Only run this animation if we skipped the loader (returning visitor)
    const titleElement = titleRef.current
    if (titleElement) {
      const chars = titleElement.querySelectorAll('.char')
      gsap.killTweensOf(chars)

      gsap.fromTo(chars,
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: "power4.out",
        }
      )
    }
  }, [isLoading, showContent, animationRan])

  useLayoutEffect(() => {
    if (isLoading) return

    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768
    gsap.registerPlugin(ScrollTrigger)

    const getRatio = (el: HTMLElement) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight)

    const ctx = gsap.context(() => {
      const heroTexts = gsap.utils.toArray<HTMLElement>('.hero-meta')

      // Hero meta text reveal
      gsap.from(heroTexts, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.8
      })

      // Parallax for hero background
      const heroSection = heroBgRef.current?.parentElement
      if (heroBgRef.current && heroSection) {
        gsap.fromTo(heroBgRef.current, {
          backgroundPosition: "50% 0px"
        }, {
          backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(heroSection))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true
          }
        })
      }

      // Parallax for landing background
      if (!isMobile) {
        const landingSection = landingRef.current?.parentElement
        if (landingRef.current && landingSection) {
          gsap.fromTo(landingRef.current, {
            backgroundPosition: () => `50% ${-window.innerHeight * getRatio(landingSection)}px`
          }, {
            backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(landingSection))}px`,
            ease: "none",
            scrollTrigger: {
              trigger: landingSection,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true
            }
          })
        }
      }

      // About text reveal
      gsap.utils.toArray<HTMLElement>('.text-reveal').forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          }
        })
      })
    })

    return () => ctx.revert()
  }, [isLoading])

  // Helper to split text into chars for animation
  const SplitText = ({ children, className }: { children: string, className?: string }) => {
    return (
      <span className={`inline-block overflow-hidden ${className}`}>
        {children.split('').map((char, i) => (
          <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    )
  }

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-primary text-background">
        {/* Background Image */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 w-full md:h-full opacity-70 mix-blend-overlay"
          style={{
            backgroundImage: "url('/blackbg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",

          }}
        />

        {/* Content */}
        <div className='relative z-10 flex flex-col justify-between h-[700px] md:h-full w-full pt-32 px-4 md:px-10 pb-10'>
          <div ref={titleRef}>
            {/* Mobile Title - 4 lines */}
            <h1 className='md:hidden flex flex-col font-medium leading-[0.9] tracking-tight'>
              <div className="overflow-hidden">
                <SplitText className="text-[13vw] uppercase">Greek</SplitText>
              </div>
              <div className="overflow-hidden">
                <SplitText className="text-[13vw] uppercase">Creative</SplitText>
              </div>
              <div className="overflow-hidden">
                <SplitText className="text-[13vw] uppercase">Front-End</SplitText>
              </div>
              <div className="overflow-hidden">
                <SplitText className="text-[13vw] uppercase">Developer</SplitText>
              </div>
            </h1>

            {/* Desktop Title - 2 lines */}
            <h1 className='hidden md:flex flex-col font-medium leading-[0.9] tracking-tight'>
              <div className="overflow-hidden">
                <SplitText className="text-[8vw] uppercase">Greek Creative</SplitText>
              </div>
              <div className="overflow-hidden">
                <SplitText className="text-[8vw] uppercase">Front-End Developer</SplitText>
              </div>
            </h1>
          </div>

          <div className='flex flex-col md:flex-row md:items-end justify-between gap-8 mt-20'>
            <div className="hero-meta text-xl md:text-2xl font-normal">
              <p>Folio:05</p>
            </div>

            <div className='flex flex-col md:flex md:flex-row md:gap-16 text-sm md:text-lg opacity-80'>
              <div className='hero-meta mb-4'>
                <p className="uppercase text-xs opacity-60 mb-1">Availability</p>
                <p>March 2025</p>
              </div>
              <div className='hero-meta mb-4'>
                <p className="uppercase text-xs opacity-60 mb-1">Contact</p>
                <p>alexandrospalikrousis@gmail.com</p>
              </div>
              <div className='hero-meta mb-4'>
                <p className="uppercase text-xs opacity-60 mb-1">Location</p>
                <p>Thessaloniki, Greece</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <div className="relative min-h-screen w-full overflow-hidden bg-zinc-900 text-white">
        <div
          ref={landingRef}
          className="absolute inset-0 w-full h-full opacity-60"
          style={{
            backgroundImage: "url('/test.jpg')",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <section className="relative z-10 min-h-screen flex items-center px-4 md:px-10 py-20">
          <div className="max-w-4xl">
            <h2 className="text-reveal text-5xl md:text-8xl font-medium mb-12 leading-[0.9] tracking-tight uppercase">
              Hello I am Alexander
            </h2>

            <p className="text-reveal text-xl md:text-3xl leading-relaxed font-light text-gray-200 text-balance">
              Shopify sorcerer by day, full stack student by night.
              I transform business ideas into functioning websites (and occasionally functioning websites into mysterious error messages).
              My superpowers include turning coffee into code and making divs do what they're told.
            </p>
          </div>
        </section>
      </div>

      {/* Selected Works */}
      <section id="selected-works" className="min-h-screen px-4 py-20 md:px-10 md:py-32 bg-[#0B1014]">
        <SelectedWorks />
      </section >

      {/* Contact Section */}
      < section id="contact" className="min-h-screen px-4 py-20 md:px-10 md:py-32 bg-background text-foreground flex items-center justify-center" >
        <ContactForm />
      </section >
    </>
  );
}