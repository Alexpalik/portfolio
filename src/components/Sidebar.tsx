'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
  return (
    <>
    <div className="left-0 top-0 h-screen w-24 flex flex-col fixed hidden md:flex">
        <div className="flex flex-1 flex-col items-center justify-between py-50 pt-10">
            <Link href="/" className="px-2">
              <Image src="/logo5.png" alt="logo" width={100} height={100} />
            </Link>
            <Link href="/" className="text-black transform rotate-270 text-2xl">Work</Link>
            <Link href="/" className="text-black transform rotate-270 text-2xl">About</Link> 
            <Link href="/" className="text-black transform rotate-270 text-2xl">Contact</Link>
       </div>
    </div>
    <div className="md:hidden fixed top-0 bg-black w-full h-16 z-70">
      <div className="flex justify-end items-center h-full">
        <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
          <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`} />
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`} />
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`} />
            </div>
        </button>
        {isOpen && (
          <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50" 
          onClick={closeMenu} 
        />
        )}
        <div className={`lg:hidden fixed bg-black z-50 top-0 right-0 h-full w-80 max-w-full transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-end p-4 text-4xl text-white"><X onClick={closeMenu} className="cursor-pointer w-7 h-7"/></div>
          <nav className="flex flex-col gap-4 p-4">
            <Link href="/" 
                className="text-white block text-2xl font-medium text-black hover:text-gray-600 transition-colors"
                onClick={closeMenu}>Work</Link>
            <Link href="/" 
                className="text-white block text-2xl font-medium text-black hover:text-gray-600 transition-colors"
                onClick={closeMenu}>About</Link> 
            <Link href="/" 
                className="text-white block text-2xl font-medium text-black hover:text-gray-600 transition-colors"
                onClick={closeMenu}>Contact</Link>
          </nav>
        </div>
      </div>
    </div>
    </>
  )
}