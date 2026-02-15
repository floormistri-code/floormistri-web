"use client";

import React from 'react';

// This tells the code that the Navbar is allowed to handle the 'onOpenModal' command
interface NavbarProps {
  onOpenModal?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-slate-900">Floormistri<span className="text-orange-600">.</span></span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-slate-700 hover:text-orange-600 font-medium">Home</a>
              <a href="#services" className="text-slate-700 hover:text-orange-600 font-medium">Services</a>
              <a href="#portfolio" className="text-slate-700 hover:text-orange-600 font-medium">Portfolio</a>
              <button 
                onClick={onOpenModal}
                className="bg-orange-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-700 transition"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;