'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { projects } from '@/lib/projects'
import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'




export default function ProjectPage() {
    const { slug } = useParams()
    const projectSlug = decodeURIComponent(slug as string)
    const project = projects[projectSlug]

    useLayoutEffect(() => {
        const els = gsap.utils.toArray<HTMLElement>('.proj-an')
        els.forEach(el => (el.style.willChange = 'transform, opacity'))
        
        const ctx = gsap.context(() => {
          gsap.from(els, {
            y: 60,
            opacity: 0,
            duration: 0.55,
            ease: 'slow.out(1.7)',
            stagger: 0.12,
            force3D: true,
            onComplete: () => els.forEach(el => (el.style.willChange = 'auto')),
          })
        })
    
        return () => ctx.revert()
      }, [])
    return (
        <>
            <div className="min-h-[100vh] h-full flex justify-between  pt-[80px] px-[10px] md:pt-[100px] md:px-[36px] md:flex-row flex-col gap-4"
             style={{backgroundColor: project.backgroundColor}}
            >
               
               <div className={`flex flex-col md:w-1/2 justify-between items-left max-h-[500px]`}
               style={{color: project.textColor}}
               >
                    <h3 className={`font-neue proj-an text-3xl font-medium mb-[10px] xl:text-[120px] align-left md:whitespace-nowrap`}>{project.title}</h3> 
                    <p className="proj-an text-[16px] md:text-2xl font-medium align-left max-w-sm">
                        {project.shortDescription}
                    </p>
                    <p className="proj-an text-[16px] md:text-[16px] font-medium align-left max-w-xl">
                        {project.fullDescription}
                    </p>
               </div>
               <div className="relative w-full md:w-1/2">
                {/* Image */}
                <div className="proj-an relative md:absolute md:right-0 md:bottom-0 bottom-[10px]">
                    <Image 
                    src={project.imageSrc} 
                    alt={project.title} 
                    width={957} 
                    height={733} 
                    className="object-cover w-full h-auto max-h-[200px] md:max-h-[100%] md:w-auto xl:w-[800px] xl:h-[533px] 2xl:w-[1000px] 2xl:h-[667px]"
                    />
                    
                    {/* Navigation boxes - positioned inside image container */}
                    <div className="absolute top-[-60px] right-4 z-10 flex gap-2">
                    {(() => {
                        const projectKeys = Object.keys(projects)
                        const currentIndex = projectKeys.indexOf(projectSlug)
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : projectKeys.length - 1
                        const nextIndex = currentIndex < projectKeys.length - 1 ? currentIndex + 1 : 0
                        
                        return (
                        <>
                            <Link 
                            href={`/projects/${projectKeys[prevIndex]}`}
                            className="w-10 h-10 border-2 flex items-center justify-center hover:bg-current/10 transition-colors"
                            style={{ borderColor: project.textColor, color: project.textColor }}
                            >
                            {String(prevIndex + 1).padStart(2, '0')}
                            </Link>
                            <div 
                            className="w-10 h-10 border-2 flex items-center justify-center bg-current/10"
                            style={{ borderColor: project.textColor, color: project.textColor }}
                            >
                            {String(currentIndex + 1).padStart(2, '0')}
                            </div>
                            <Link 
                            href={`/projects/${projectKeys[nextIndex]}`}
                            className="w-10 h-10 border-2 flex items-center justify-center hover:bg-current/10 transition-colors"
                            style={{ borderColor: project.textColor, color: project.textColor }}
                            >
                            {String(nextIndex + 1).padStart(2, '0')}
                            </Link>
                        </>
                        )
                    })()}
                    </div>
                </div>
            </div>
 
               
            </div>
        </>
    )
}