'use client'
import Link from "next/link";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { useState } from "react";
import { X } from "lucide-react";
import  localFont  from "next/font/local";
import { usePathname,useParams, useRouter } from "next/navigation";

const neueMontrealMedium = localFont({
  src: '../fonts/NeueMontreal-Medium.otf',
  weight: '500'
})




export default function Sidebar() {
  const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);
    const pathname = usePathname();
    const textColor = pathname === "/portfolio" ? "text-white" : "text-[rgb(11,16,20)]";
    const hamburgerColor = pathname === '/portfolio' ? 'bg-white' : 'bg-[rgb(11,16,20)]';
    const params = useParams();
    const path = usePathname();
    const slugFromPath = path?.startsWith('/projects/') ? decodeURIComponent(path.split('/')[2] || '') : undefined;
    const baseColor = path === '/portfolio' ? '#ffffff' : 'white'; // default per your logic
    const projectColor = slugFromPath ? projects[slugFromPath]?.textColor : undefined;
    const currentColor = projectColor ?? baseColor; // always a valid CSS color string
  return (
    <>
    <div className="top-0 w-screen h-24 flex fixed hidden md:flex z-100">
        <header className="flex items-center w-full justify-between px-10">
            <Link href="/" className="flex items-center gap-2">
              <h1 className={`${neueMontrealMedium.className} text-[25px] font-medium`}
               style={{color: currentColor}}>
                Alexandros Palikrousis
              </h1>
            </Link>
            <div className="flex items-center gap-4 px-2">
            <Link 
              href="/#selected-works" 
              className={`${neueMontrealMedium.className} text-[25px] font-medium`} 
              style={{color: currentColor}}
              onClick={(e) => {
                e.preventDefault()
                
                if (pathname === '/') {
                  const element = document.getElementById('selected-works')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                } else {
                  router.push('/#selected-works')
                  // Scroll after navigation
                  setTimeout(() => {
                    const element = document.getElementById('selected-works')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }
                  }, 100)
                }
              }}
            >Selected Works</Link>
            <Link href="/portfolio" className={`${neueMontrealMedium.className}  text-[25px] font-medium`} style={{color: currentColor}}>Portfolio</Link> 
            
            </div>
       </header>
    </div>
    <div className="md:hidden fixed top-0  w-full h-16 z-70">
      <div className="flex justify-between items-center h-full px-[6px]">
        <div>
          <Link href="/" className={`${neueMontrealMedium.className} text-[25px] font-medium z-10`} style={{color: currentColor}}>
            Alexandros Palikrousis
          </Link>
        </div>
        <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300">
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span className="block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out"
                style={{ backgroundColor: currentColor, transform: isOpen ? 'rotate(45deg) translateY(4px)' : 'translateY(-2px)' }} />
          <span className="block h-0.5 w-6 rounded-sm my-0.5 transition-all duration-300 ease-out"
                style={{ backgroundColor: currentColor, opacity: isOpen ? 0 : 1 }} />
          <span className="block h-0.5 w-6 rounded-sm transition-all duration-300 ease-out"
                style={{ backgroundColor: currentColor, transform: isOpen ? 'rotate(-45deg) translateY(-4px)' : 'translateY(2px)' }} />
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
            <Link href="/portfolio" 
                className="text-white block text-2xl font-medium text-black hover:text-gray-600 transition-colors"
                onClick={closeMenu}>Porfolio</Link>
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