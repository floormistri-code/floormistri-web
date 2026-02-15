import React from 'react';
import { Phone } from 'lucide-react';

const Navbar = () => {
  const myPhone = "+91 70676 99504";
  const whatsappLink = "https://wa.me/917067699504?text=Hi%20Floormistri%2C%20I%20am%20looking%20for%20a%20flooring%20quote.";

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900">
          Floormistri<span className="text-amber-600">.</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          <a href="#services" className="hover:text-amber-600 transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-amber-600 transition-colors">Portfolio</a>
          <a href="#whyus" className="hover:text-amber-600 transition-colors">Why Us</a>
          
          {/* Phone Number - Visible on Desktop */}
          <a 
            href={`tel:${myPhone.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-gray-700 hover:text-amber-600 transition-colors"
          >
            <Phone size={18} className="text-amber-600" />
            <span>{myPhone}</span>
          </a>
          
          {/* Quote Button */}
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <span>📱</span> Get Quote
          </a>
        </div>

        {/* Mobile Menu Button (you can expand this later) */}
        <button className="md:hidden text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;