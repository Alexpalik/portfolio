'use client'
import Link from "next/link";
import { projects } from "@/lib/projects";
import { useState } from "react";
import { X } from "lucide-react";
import { usePathname, useParams, useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const pathname = usePathname();
  const params = useParams();

  // Determine color based on route
  const isPortfolio = pathname === "/portfolio";
  const isProject = pathname?.startsWith('/projects/');

  let currentColor = 'white'; // Default to black/foreground

  if (isPortfolio) {
    currentColor = 'white';
  } else if (isProject) {
    const slug = decodeURIComponent(pathname.split('/')[2] || '');
    currentColor = projects[slug]?.textColor || 'white';
  }

  return (
    <>
      {/* Desktop Header */}
      <div className="fixed top-0 w-full h-24 hidden md:flex z-50">
        <header className="flex items-center w-full justify-between px-10" style={{ color: currentColor }}>
          <Link href="/" className="flex items-center gap-2 group">
            <h1 className="text-[25px] font-medium tracking-tight group-hover:opacity-70 transition-opacity">
              Alexandros Palikrousis
            </h1>
          </Link>
          <div className="flex items-center gap-8">
            <Link
              href="/#selected-works"
              className="text-[25px] font-medium hover:opacity-70 transition-opacity"
              onClick={(e) => {
                e.preventDefault()
                if (pathname === '/') {
                  document.getElementById('selected-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                } else {
                  router.push('/#selected-works')
                  setTimeout(() => {
                    document.getElementById('selected-works')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 100)
                }
              }}
            >Selected Works</Link>
            <Link href="/portfolio" className="text-[25px] font-medium hover:opacity-70 transition-opacity">Portfolio</Link>
          </div>
        </header>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full h-16 z-50" style={{ color: currentColor }}>
        <div className="flex justify-between items-center h-full px-4">
          <Link href="/" className="text-[20px] font-medium z-50">
            Alexandros Palikrousis
          </Link>

          <button onClick={toggleMenu} className="p-2 z-50 focus:outline-none">
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-zinc-950 transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col justify-center items-center h-full gap-8 text-white">
          <Link href="/portfolio" onClick={closeMenu} className="text-4xl font-medium hover:text-gray-400 transition-colors">Portfolio</Link>
          <Link href="/" onClick={closeMenu} className="text-4xl font-medium hover:text-gray-400 transition-colors">About</Link>
          <Link href="/" onClick={closeMenu} className="text-4xl font-medium hover:text-gray-400 transition-colors">Contact</Link>
        </div>
      </div>
    </>
  )
}