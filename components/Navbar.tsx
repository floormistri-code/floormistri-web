"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Icons for the mobile menu

interface NavbarProps {
  onOpenModal?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Logo Color: #003B49 | Button Color: #006837
  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-[#003B49]">
              Floormistri<span className="text-[#4CAF50]">.</span>
            </span>
          </div>
          
          {/* Desktop Menu (Hidden on mobile) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-[#003B49] hover:text-[#4CAF50] font-medium transition">Home</a>
              <a href="#services" className="text-[#003B49] hover:text-[#4CAF50] font-medium transition">Services</a>
              <a href="#portfolio" className="text-[#003B49] hover:text-[#4CAF50] font-medium transition">Portfolio</a>
              <button 
                onClick={onOpenModal}
                className="bg-[#006837] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#003B49] transition shadow-md"
              >
                Get Quote
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#003B49] p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-2 shadow-lg">
          <a href="#" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-[#003B49] font-medium border-b border-gray-50">Home</a>
          <a href="#services" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-[#003B49] font-medium border-b border-gray-50">Services</a>
          <a href="#portfolio" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-[#003B49] font-medium border-b border-gray-50">Portfolio</a>
          <div className="pt-4">
            <button 
              onClick={() => { onOpenModal?.(); setIsOpen(false); }}
              className="w-full bg-[#006837] text-white px-6 py-3 rounded-lg font-bold"
            >
              Get Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;