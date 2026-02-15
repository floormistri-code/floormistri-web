import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="text-2xl font-bold text-slate-900">
          Floormistri<span className="text-orange-600">.</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
          <a href="#services" className="hover:text-orange-600">Services</a>
          <a href="#portfolio" className="hover:text-orange-600">Portfolio</a>
          <a href="#contact" className="hover:text-orange-600 text-orange-600 border border-orange-600 px-4 py-2 rounded-lg">
            Get Quote
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;