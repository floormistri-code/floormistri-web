"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero'; 
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import QuoteCalculator from '@/components/QuoteCalculator';
import WhyUs from '@/components/WhyUs';
import { Phone, MapPin } from 'lucide-react';

export default function Home() {
  const myPhone = "917067699504"; 
  const myAddress = "Deen Dayal Nagar, Gwalior, MP"; 

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section id="hero"><Hero /></section>
      <section id="services"><Services /></section>
      <section id="portfolio"><Portfolio /></section>
      <section id="calculator"><QuoteCalculator /></section>
      <section id="whyus"><WhyUs /></section>

      {/* CONTACT SECTION - VISIBLE AND CLEAN */}
      <section className="py-20 bg-white border-t border-gray-100" id="contact">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12 text-slate-900">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Phone className="text-orange-600" size={24} />
                <div>
                  <h3 className="font-bold">Call Now</h3>
                  <p className="text-xl font-bold text-black">+{myPhone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="text-orange-600" size={24} />
                <div>
                  <h3 className="font-bold">Location</h3>
                  <p className="text-lg text-black">{myAddress}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-200 text-center">
              <h3 className="text-xl font-bold mb-4 text-black">Get an Instant Quote</h3>
              <a 
                href={`https://wa.me/${myPhone}?text=Hi, I am looking for a flooring quote.`}
                className="inline-block bg-orange-600 text-white px-8 py-4 rounded-xl font-bold"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 text-center">
        <p className="font-bold text-xl text-white">Floormistri Gwalior</p>
        <p className="text-slate-400 mt-2">© 2026 All Rights Reserved.</p>
      </footer>
    </main>
  );
}