"use client"
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import PreloaderLink from "./PreloaderLink";

export default function Header() {
  const pathname = usePathname();
  
  const menuItems = [
    { name: 'Jobs', href: '/jobs' },
    { name: 'Companies', href: '/companies' },
    { name: 'Courses', href: '/courses' },
    { name: 'Services', href: '/services' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'For Employers', href: '/employers' }
  ];

  return (
    <header className="sticky top-0 z-[999999999] pb-2 pt-1 shadow-xs backdrop-blur-md bg-[#f5f9fb] border-b border-[#CDCDCD]">
      <nav className="container flex items-center justify-between">
        <PreloaderLink href="/" className="flex">
          <Image src="/logo-new.png" alt="Logo" width={280} height={60} />
        </PreloaderLink>
        
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <PreloaderLink key={item.name} href={item.href} className={`relative pb-0.5 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-prime after:transition-all after:duration-300 hover:after:w-full ${
              pathname === item.href 
                ? 'text-prime after:w-full' 
                : 'text-black hover:text-prime after:w-0'
            }`}>
              {item.name}
            </PreloaderLink>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2.5 rounded-full bg-white text-prime border-prime border">
            <Search size={20} />
          </button>
          <PreloaderLink href="/login" className="text-prime font-medium px-6 py-2 rounded-full border-prime border">
            Login
          </PreloaderLink>
          <PreloaderLink href="/register" className="bg-prime text-white px-4 py-2 rounded-full hover:bg-prime/90 font-medium border-prime border">
            Join For Free
          </PreloaderLink>
        </div>
      </nav>
    </header>
  );
}