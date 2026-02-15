'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Professional WhatsApp link
  const whatsappUrl = "https://wa.me/917067699504?text=Hi%20Floormistri%2C%20I%20saw%20your%20website%20and%20want%20to%20get%20a%20quote%20for%20a%20flooring%20project."

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-600 rounded-lg shadow-inner"></div>
          <span className="text-2xl font-black text-gray-900 tracking-tighter">
            Floormistri<span className="text-amber-600">.</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-bold text-gray-600">
          <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-600 transition">Portfolio</button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-amber-600 transition">Contact</button>
          
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer" 
            className="bg-amber-600 text-white px-6 py-2.5 rounded-xl hover:bg-amber-700 transition shadow-md"
          >
            Get Quote
          </a>
        </div>
      </div>
    </nav>
  )
}