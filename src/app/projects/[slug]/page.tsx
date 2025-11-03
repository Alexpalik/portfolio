'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { projects } from '@/lib/projects'

export default function ProjectPage() {
    const { slug } = useParams()
    const projectSlug = decodeURIComponent(slug as string)
    const project = projects[projectSlug]
    return (
        <>
            <div className="min-h-[100vh] h-full flex justify-between px-10 pt-15 md:pt-30 md:flex-row flex-col gap-4"
             style={{backgroundColor: project.backgroundColor}}
            >
               
               <div className="flex flex-col max-w-4xl justify-between items-left max-h-[500px]"
               style={{color: project.textColor}}
               >
                    <h3 className="text-4xl mb-[10px] xl:text-8xl font-[600] tracking-tighter align-left">{project.title}</h3> 
                    <p className="text-[18px] md:text-xl font-medium align-left max-w-sm">
                        {project.shortDescription}
                    </p>
                    <p className="text-[18px] md:text-xl font-medium align-left max-w-xl">
                        {project.fullDescription}
                    </p>
               </div>
               <div className="md:absolute right-0 pr-2  aspect-[940/623] bottom-0 right-0">
                  <Image src={project.imageSrc} alt={project.title} width={957} height={733} className="object-cover xl:w-[800px] h-[200px] xl:h-[533px] 2xl:w-[1000px] 2xl:h-[667px]"/>
               </div>
            </div>
        </>
    )
}