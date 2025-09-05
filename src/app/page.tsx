'use client'


import { useEffect, useState } from 'react'
import ThreeModel from '@/components/three'
import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import localFont from 'next/font/local'
const neueMontrealMedium = localFont({
  src: '../fonts/NeueMontreal-Medium.otf',
  weight: '500'
})
export const dynamic = 'force-dynamic'

export default function Home() {
  
  
  const [scrollY, setScrollY] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          stagger: 0.05,
          ease: "back.out(1.7)"
        })
      }
    }
  }, [showContent])
   
  return (
    <>
      
      <div className={`transition-opacity duration-1000`}>
       {/* Your existing hero section with parallax */}
      <section className="min-h-screen  relative flex md:items-end md:justify-between overflow-hidden">
        {/* Background with parallax effect */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: "rgb(84, 98, 90)",
            transform: `translateY(${scrollY * 0.4}px)`,
            overflow: 'hidden'
          }}
        />
        
        <div className='flex flex-col items:center md:items-left justify-between h-screen w-full pt-[100px] px-[36px]'>
           <h1 className='z-10 pb-[100px] top-0'>
              <div>
                  <div className={`${neueMontrealMedium.className}  text-[60px] md:text-[115px] text-[rgb(11,16,20)]`}>
                      Greek Creative
                  </div>
              </div>
              <div>
                <div className={`${neueMontrealMedium.className} text-[60px] md:text-[115px] text-[rgb(11,16,20)]`}>
                  Front-End Developer
                </div>
              </div>
           </h1>
           <div className='z-10 md:flex md:flex-row items-center justify-between py-[64px]'>
             <div className={`${neueMontrealMedium.className}  mb-4 md:mb-0 text-3xl md:text-5xl font-normal`}>
                  <p>
                  Folio:05
                  </p>
             </div>
             <div className={`${neueMontrealMedium.className}  grid grid-cols-2 row-gap-2 md:flex  md:items-center md:justify-between md:gap-8`}>
                 <div className='text-sm md:text-xl'>
                     <p>
                     Availability:<br/>
                     March 2025
                     </p>
                 </div>
                 <div className='text-sm md:text-xl'>
                     <p>Contact:<br/>
                     alexandrospalikrousis@gmail.com
                     </p>
                 </div>
                 <div className='text-sm md:text-xl'>
                     <p>
                     Current location:<br/>
                     Thessaloniki, Greece
                     </p>
                 </div>
                 <div className='text-sm md:text-xl'>
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
      <div className="bg-black text-white !overflow-x-hidden"
      style={{
        backgroundImage: "url('/bg-3.jpg')",
        backgroundAttachment: "fixed" // Optional: makes background stay in place while scrolling
      }}>
        <section className="min-h-screen flex items-center justify-center p-8 ">
          <div className="md:w-1/2 pr-10 pl-10 md:mt-[50px]">
            <h2 className="text-6xl font-bold mb-16 uppercase tracking-tighter leading-none">Hello I am Alexander</h2>
            <p className="flex justify-end !uppercase  text-xl md:text-4xl">Shopify sorcerer by day</p>
            <p className="!uppercase text-xl md:text-4xl leading-relaxed font-medium">
            full stack student by night.
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
            <div className="absolute right-0  transform  mt-[200px] md:mt-[-100px] ml-[300px] md:mr-[-100px] !overflow-x-hidden">
             <ThreeModel />
            </div>
            <Image src="/img2.png" alt="About" width={600} height={600}  className="absolute right-0 transform mt-[600px] md:mt-[300px]  md:mr-[250px]"/>
            
          </div>
        </section>

        <section className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl font-bold mb-8 uppercase">Work</h2>
            <p className="text-xl leading-relaxed">
              Your projects and portfolio...
            </p>
          </div>
        </section>

        <div className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl font-bold mb-8 uppercase">Contact</h2>
            <p className="text-xl leading-relaxed mb-12">
              Let's work together! Drop me a message and I'll get back to you.
            </p>
            <ContactForm />
          </div>
          </div>
        </div>
      </div>
      
        
    </>
  );
}