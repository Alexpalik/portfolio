'use client'


import { useEffect, useState, useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import localFont from 'next/font/local'
import SelectedWorks from '@/components/SelectedWorks'
import ScrollTrigger from 'gsap/ScrollTrigger'

const neueMontrealMedium = localFont({
  src: '../fonts/NeueMontreal-Medium.otf',
  weight: '500'
})
import dynamic from 'next/dynamic'




export default function Home() {
  
  
  const [scrollY, setScrollY] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const landingRef = useRef<HTMLDivElement>(null)
  
  const isMobile =  window.innerWidth <= 768

  const handleLoadingComplete = () => {
    setIsLoading(false)
    // Delay content appearance for smooth transition
    setTimeout(() => setShowContent(true), 200)
  }
  useGSAP(() => {
    if (showContent) {
      const titleElement = document.querySelector('.hero-title')
      if (titleElement) {
        const text = titleElement.textContent || ''
        const chars = text.split('').map(char => `<span style="display:inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`).join('')
        titleElement.innerHTML = chars
        
        const charElements = titleElement.querySelectorAll('span')
        gsap.from(charElements, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        })
      }
    }
  }, [showContent])
   
  

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const getRatio = (el: HTMLElement) => 
      window.innerHeight / (window.innerHeight + el.offsetHeight)
    const ctx = gsap.context(() => {
      const heroTexts = gsap.utils.toArray<HTMLElement>('.hero-text')
      // GPU hint
      heroTexts.forEach(el => (el.style.willChange = 'transform, opacity'))

      gsap.from(heroTexts, {
        y: 80,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',    // lighter than back.out
        stagger: 0.15,         // now actually staggers
        force3D: true,
        onComplete: () => heroTexts.forEach(el => (el.style.willChange = 'auto'))
      })
      
        // Parallax effect for hero background
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
    if (!isMobile){
      // Parallax for landing background
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
     gsap.utils.toArray<HTMLElement>('.text-an').forEach((el) => {
        gsap.from(el, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
            refreshPriority: 1
           
          }
        })
      })
    })
  
    return () => ctx.revert()
  }, [])
  

  return (
    <>
      
      
       {/* Your existing hero section with parallax */}
      <section className="min-h-screen h-screen relative flex md:items-end md:justify-between overflow-hidden">
        {/* Background */}
        <div 
          ref={heroBgRef}
          className="absolute inset-0 w-full h-[120%] bg" // h-[120%] makes it larger
          style={{
            backgroundImage: "url('/footer.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            top: '-10%', // Start slightly above to account for movement
          }}
        />
        
        <div className='flex flex-col items:center md:items-left justify-between h-screen w-full pt-[80px] px-[10px] md:pt-[100px] md:px-[36px]'>
           <h1 className='z-10 md:pb-[100px] top-0'>
              <div className='md:max-h-[145px]'>
                  <div className={`hero-text ${neueMontrealMedium.className}  text-[57px] md:text-[115px] text-[white]`}>
                      Greek Creative
                  </div>
              </div>
              <div className='md:max-h-[145px]'>
                <div className={`hero-text ${neueMontrealMedium.className} text-[57px] md:text-[115px] text-[white]`}>
                  Front-End Developer
                </div>
              </div>
           </h1>
           <div className='z-10 md:flex md:flex-row items-center justify-between py-[64px]'>
             <div className={`hero-text ${neueMontrealMedium.className}  mb-4 md:mb-0 text-3xl md:text-5xl font-normal text-white`}>
                  <p>
                  Folio:05
                  </p>
             </div>
             <div className={`hero-text ${neueMontrealMedium.className}  grid grid-cols-2 gap-y-2 md:flex  md:items-center md:justify-between md:gap-8 text-white`}>
                 <div className='text-xs md:text-xl'>
                     <p>
                     Availability:<br/>
                     March 2025
                     </p>
                 </div>
                 <div className='hero-text text-xs md:text-xl'>
                     <p>Contact:<br/>
                     alexandrospalikrousis@gmail.com
                     </p>
                 </div>
                 <div className='hero-text text-xs md:text-xl'>
                     <p>
                     Current location:<br/>
                     Thessaloniki, Greece
                     </p>
                 </div>
                 <div className='text-xs md:text-xl'>
                    <p>
                    Copyright:<br/>
                    ©2025 Alexandros Palikrousis
                    </p>
                 </div>
             </div>
           </div>
        </div>
      </section>
      
      {/* Black sections that appear when scrolling */}
      <div className="relative min-h-screen w-full section overflow-hidden">
      <div
       ref={landingRef}
        className="absolute inset-0 w-full h-full bg"
      style={{
        backgroundImage: "url('/LandingPicture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
       
      }}>
        <section className={`min-h-screen flex items-left justify-start px-[10px] pt-[40px] md:p-8`}>
          <div className="md:mt-[50px]">
            <h2 className={`${neueMontrealMedium.className} text-an text-5xl md:text-[115px] mb-16 white-space-nowrap line-height-[1.5]`}
            style={{color: "white"}}>Hello I am Alexander</h2>
            
            <p className="text-an text-xl md:text-4xl max-w-2xl"
            style={{color: "white"}}>
            Shopify sorcerer by day, full stack student by night.
            I transform business ideas 
            into functioning websites (and occasionally functioning 
            websites into mysterious error messages).
            My superpowers 
            include turning coffee into code, making divs do what 
            they&apos;re told. Currently learning that 
            &apos;full stack&apos; means being confused in multiple languages 
            simultaneously&apos;.
            </p>
          </div>
        </section>

        
        </div>
        </div>
        <section id="selected-works" className="min-h-screen flex px-[10px] py-[50px] md:p-8 md:pt-[100px]"
        style={{
          backgroundColor: "rgb(11,16,20)",
        }}>
           <SelectedWorks />
        </section>
        
      
        
    </>
  );
}