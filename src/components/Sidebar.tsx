import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="left-0 top-0 h-screen w-24 flex flex-col fixed">
        <div className="flex flex-1 flex-col items-center justify-between py-50 pt-10">
            <Link href="/" className="px-2">
              <Image src="/logo5.png" alt="logo" width={100} height={100} />
            </Link>
            <Link href="/" className="text-black transform rotate-270 text-2xl">Work</Link>
            <Link href="/" className="text-black transform rotate-270 text-1xl">About</Link> 
            <Link href="/" className="text-black transform rotate-270 text-2xl">Contact</Link>
       </div>
    </div>
  )
}