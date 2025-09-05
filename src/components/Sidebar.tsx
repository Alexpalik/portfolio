'use client'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import  localFont  from "next/font/local";
import { usePathname } from "next/navigation";
const neueMontrealMedium = localFont({
  src: '../fonts/NeueMontreal-Medium.otf',
  weight: '500'
})




export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    const pathname = usePathname();
    const textColor = pathname === "/portfolio" ? "text-white" : "text-[rgb(11,16,20)]";
    const hamburgerColor = pathname === '/portfolio' ? 'bg-white' : 'bg-[rgb(11,16,20)]';
  return (
    <>
    <div className="top-0 w-screen h-24 flex fixed hidden md:flex z-100">
        <header className="flex items-center w-full justify-between px-10">
            <Link href="/" className="flex items-center gap-2">
              <h1 className={`${neueMontrealMedium.className} ${textColor} text-[25px] font-medium`}>
                Alexandros Palikrousis
              </h1>
            </Link>
            <div className="flex items-center gap-4 px-2">
            <Link href="/" className={`${neueMontrealMedium.className}  text-[25px] font-medium ${textColor}`}>Selected Works</Link>
            <Link href="/portfolio" className={`${neueMontrealMedium.className}  text-[25px] font-medium ${textColor}`}>Portfolio</Link> 
            
            </div>
       </header>
    </div>
    <div className="md:hidden fixed top-0  w-full h-16 z-70">
      <div className="flex justify-between items-center h-full px-[6px]">
        <div>
          <h1 className={`${neueMontrealMedium.className} ${textColor} text-[25px] font-medium z-10`}>
            Alexandros Palikrousis
          </h1>
        </div>
        <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
          <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`${hamburgerColor} block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`} />
              <span className={`${hamburgerColor} block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`} />
              <span className={`${hamburgerColor} block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
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