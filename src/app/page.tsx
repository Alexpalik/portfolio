'use client'


import { useEffect, useState, useLayoutEffect } from 'react'
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
     
  
      // Existing scroll-triggered animations
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
  
  // only after hero texts started animating
const [showHeavy, setShowHeavy] = useState(false)
useEffect(() => {
  if (!showContent) return
  const id = setTimeout(() => setShowHeavy(true), 300) // small delay
  return () => clearTimeout(id)
}, [showContent])
  
  return (
    <>
      
      
       {/* Your existing hero section with parallax */}
      <section className="min-h-screen  relative flex md:items-end md:justify-between overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: "rgb(84, 98, 90)",
          }}
        />
        
        <div className='flex flex-col items:center md:items-left justify-between h-screen w-full pt-[80px] px-[10px] md:pt-[100px] md:px-[36px]'>
           <h1 className='z-10 md:pb-[100px] top-0'>
              <div className='md:max-h-[145px]'>
                  <div className={`hero-text ${neueMontrealMedium.className}  text-[57px] md:text-[115px] text-[rgb(11,16,20)]`}>
                      Greek Creative
                  </div>
              </div>
              <div className='md:max-h-[145px]'>
                <div className={`hero-text ${neueMontrealMedium.className} text-[57px] md:text-[115px] text-[rgb(11,16,20)]`}>
                  Front-End Developer
                </div>
              </div>
           </h1>
           <div className='z-10 md:flex md:flex-row items-center justify-between py-[64px]'>
             <div className={`hero-text ${neueMontrealMedium.className}  mb-4 md:mb-0 text-3xl md:text-5xl font-normal`}>
                  <p>
                  Folio:05
                  </p>
             </div>
             <div className={`hero-text ${neueMontrealMedium.className}  grid grid-cols-2 gap-y-2 md:flex  md:items-center md:justify-between md:gap-8`}>
                 <div className='text-xs md:text-xl'>
                     <p>
                     Availability:<br/>
                     March 2025
                     </p>
                 </div>
                 <div className='hero-texttext-xs md:text-xl'>
                     <p>Contact:<br/>
                     alexandrospalikrousis@gmail.com
                     </p>
                 </div>
                 <div className='hero-texttext-xs md:text-xl'>
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
      <div className="!overflow-x-hidden"
      style={{
        backgroundColor: "rgb(11, 16, 20)",
       
      }}>
        <section className="min-h-screen flex items-cenqter justify-center p-8 ">
          <div className="md:w-1/2 md:mt-[50px]">
            <h2 className="text-an text-6xl font-bold mb-16"
            style={{color: "rgb(84, 98, 90)"}}>Hello I am Alexander</h2>
            
            <p className="text-an text-xl md:text-4xl"
            style={{color: "rgb(84, 98, 90)"}}>
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
          <div className="max-w-4xl mx-auto text-center !overflow-x-hidden">
         
           
            
          </div>
        </section>

        <section id="selected-works" className="min-h-screen flex p-8 pt-[450px] md:pt-[100px]">
           <SelectedWorks />
        </section>
        </div>
        
      
        
    </>
  );
}