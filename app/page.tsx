"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import QuoteCalculator from '@/components/QuoteCalculator';
import VisitModal from '@/components/VisitModal';
import { Phone, MapPin } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myPhone = "917067699504"; 
  const myAddress = "Deen Dayal Nagar, Gwalior, MP"; 

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section - Built directly here so no more "Module Not Found" error */}
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
            Pure Craft,<br />
            <span className="text-orange-600">Total Perfection</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Gwalior's most organized flooring experts for Tiles, Marble, and Granite.
          </p>
          <div className="flex justify-center">
            <a 
              href={`https://wa.me/${myPhone}`}
              className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* Your hard-worked sections */}
      <Services />
      <Portfolio />
      <QuoteCalculator />

      {/* Contact Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <Phone className="text-orange-600" size={32} />
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold">Call Us</p>
                <p className="text-xl font-bold text-slate-900">+{myPhone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <MapPin className="text-orange-600" size={32} />
              <div>
                <p className="text-sm text-gray-500 uppercase font-bold">Location</p>
                <p className="text-xl font-bold text-slate-900">{myAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 text-center">
        <p className="font-bold text-xl text-orange-600">Floormistri.</p>
        <p className="text-slate-500 mt-2">© 2026 Gwalior, MP.</p>
      </footer>

      <VisitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}