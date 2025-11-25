import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface GridBoxProps {
  src: string
  alt: string
  number: number
}

const GridBox = ({ src, alt, number }: GridBoxProps) => {
  return (
    <Link href={`/projects/${alt}`} className="aspect-3/2 cursor-pointer relative block group w-full h-full overflow-hidden">
      <Image src={src} alt={alt} width={600} height={600}
        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105" />
      <div className="absolute inset-0 left-0 top-0 text-white text-2xl font-medium pl-4 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">{number}</div>
    </Link>
  )
}

export default GridBox