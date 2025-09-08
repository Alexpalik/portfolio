'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function ProjectPage() {
    const { slug } = useParams()
    return (
        <>
            <div className="min-h-[105vh] flex justify-between px-10 pt-15 md:pt-30 md:flex-row flex-col gap-4"
             style={{backgroundColor: "rgb(232, 84, 55)"}}
            >
               
               <div className="flex flex-col max-w-4xl justify-between items-left max-h-[500px]">
                    <h3 className="text-4xl font-medium align-left">4028 Store</h3> 
                    <p className="text-xl font-medium align-left max-w-sm">Ras l'bock is a microbrewery based in
                        Quebec, Canada, created by three friends
                        who are attached to their community and
                        who wanted to have fun in life.
                    </p>
                    <p className="text-xl font-medium align-left max-w-xl">Ras l'bock is a microbrewery based in
                        Quebec, Canada, created by three friends
                        who are attached to their community and
                        who wanted to have fun in life.Ras l'bock is a microbrewery based in
                        Quebec, Canada, created by three friends
                        who are attached to their community and
                        who wanted to have fun in life.</p>
               </div>
               <div className="md:absolute right-0 pr-2 md:mt-[200px]">
                  <Image src="/gemini1.png" alt="4028" width={957} height={634} className="object-cover"/>
               </div>
            </div>
        </>
    )
}