'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { projects } from '@/lib/projects'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function ProjectPage() {
    const { slug } = useParams()
    const projectSlug = decodeURIComponent(slug as string)
    const project = projects[projectSlug]
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Animate text elements
            gsap.from('.proj-an', {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.1,
                delay: 0.2
            })

            // Animate image
            gsap.from('.proj-img', {
                scale: 0.9,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',
                delay: 0.4
            })
        }, containerRef)

        return () => ctx.revert()
    }, [])

    if (!project) return null

    const projectKeys = Object.keys(projects)
    const currentIndex = projectKeys.indexOf(projectSlug)
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projectKeys.length - 1
    const nextIndex = currentIndex < projectKeys.length - 1 ? currentIndex + 1 : 0
    const prevSlug = projectKeys[prevIndex]
    const nextSlug = projectKeys[nextIndex]

    return (
        <div
            ref={containerRef}
            className="min-h-screen w-full flex flex-col md:flex-row pt-24 md:pt-0"
            style={{ backgroundColor: project.backgroundColor, color: project.textColor }}
        >
            {/* Left Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-10 md:py-20 z-10">
                <div className="max-w-xl">
                    <Link href="/#selected-works" className="proj-an inline-flex items-center gap-2 mb-8 opacity-60 hover:opacity-100 transition-opacity">
                        <ArrowLeft size={20} />
                        <span className="text-sm uppercase tracking-widest">Back to Works</span>
                    </Link>

                    <h1 className="proj-an text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.9] mb-8 tracking-tight">
                        {project.title}
                    </h1>

                    <p className="proj-an text-xl md:text-2xl font-medium opacity-90 mb-8 leading-relaxed">
                        {project.shortDescription}
                    </p>

                    <p className="proj-an text-base md:text-lg opacity-80 leading-relaxed max-w-lg">
                        {project.fullDescription}
                    </p>

                    {/* Navigation */}
                    <div className="proj-an flex items-center gap-4 mt-16">
                        <Link
                            href={`/projects/${prevSlug}`}
                            className="w-12 h-12 border border-current rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
                            aria-label="Previous Project"
                        >
                            <ArrowLeft size={20} />
                        </Link>
                        <span className="font-medium tabular-nums text-lg">
                            {String(currentIndex + 1).padStart(2, '0')} / {String(projectKeys.length).padStart(2, '0')}
                        </span>
                        <Link
                            href={`/projects/${nextSlug}`}
                            className="w-12 h-12 border border-current rounded-full flex items-center justify-center hover:bg-black/10 transition-colors"
                            aria-label="Next Project"
                        >
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Right Image */}
            <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative flex items-center justify-center">
                <div className="proj-img w-full h-full md:h-[60%] md:w-[80%] relative shadow-2xl">
                    <Image
                        src={project.imageSrc}
                        alt={project.title}
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
            </div>
        </div>
    )
}