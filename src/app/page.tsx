'use client'
import { useEffect, useState } from 'react'
import ThreeModel from '@/components/three'
import Image from 'next/image'
export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Your existing hero section with parallax */}
      <div className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-end justify-between overflow-hidden">
        {/* Background with parallax effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/herobg-hd@2x.webp')",
            transform: `translateY(${scrollY * 0.4}px)`,
            overflow: 'hidden'
          }}
        />
        
        {/* Your existing content - unchanged */}
        <div className="w-full h-full flex flex-col justify-between relative z-10">
          <div className="relative z-10 text-center  mt-[-700px] md:mt-[-800px]">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white">
              FULL STACK DEVELOPER
            </h1>
          </div>
          <div className="flex justify-end items-center relative z-10 w-full h-full">
            <div className="hidden md:block md:w-1/2 h-96"></div>
            <div className="md:w-1/2 text-white  md:h-96  text-xl md:text-3xl p-10  md:p-0 md:pr-30 mt-[-600px]">
              <p className="!uppercase text-xl md:text-4xl">
                &ldquo;Meet Alexandros Palikrousis: Shopify sorcerer by day, 
                full stack student by night. I transform business ideas 
                into functioning websites (and occasionally functioning 
                websites into mysterious error messages). My superpowers 
                include turning coffee into code, making divs do what 
                they&rsquo;re told, and maintaining a healthy relationship 
                with Git merge conflicts. Currently learning that 
                &ldquo;full stack&rdquo; means being confused in multiple languages 
                simultaneously&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Black sections that appear when scrolling */}
      <div className="bg-black text-white !overflow-x-hidden">
        <section className="min-h-screen flex items-center justify-center p-8 ">
          <div className="md:w-1/2 pr-10 pl-10 md:mt-[50px]">
            <h2 className="text-6xl font-bold mb-16 uppercase tracking-tighter leading-none">Hello I am Alexander</h2>
            <p className="flex justify-end !uppercase  text-xl md:text-4xl">I use my passion and skills</p>
            <p className="!uppercase text-xl md:text-4xl leading-relaxed font-medium">
            to create digital products and
            experiences. National and international
            customers rely on me for design,
            implementation, and management of their
            digital products.
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

        <section className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-6xl font-bold mb-8 uppercase">Contact</h2>
            <p className="text-xl leading-relaxed">
              Get in touch...
            </p>
          </div>
        </section>
      </div>
    </>
  );
}