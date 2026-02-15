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
  const myPhone = "+91 70676 99504"; 
  const myAddress = "Deen Dayal Nagar, Gwalior, M.P."; 
  const whatsappLink = `https://wa.me/917067699504?text=Hi%20Floormistri%2C%20I%20am%20looking%20for%20a%20flooring%20quote.`;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section id="hero"><Hero /></section>
      <section id="services"><Services /></section>
      <section id="portfolio"><Portfolio /></section>
      <section id="calculator"><QuoteCalculator /></section>
      <section id="whyus"><WhyUs /></section>

      {/* CONTACT SECTION */}
      <section className="py-20 bg-white border-t border-gray-100" id="contact">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column - Contact Details */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call or WhatsApp</h3>
                  <p className="text-xl font-bold text-amber-600">{myPhone}</p>
                  <p className="text-sm text-gray-500 mt-1">Available 8 AM – 8 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-amber-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Our Location</h3>
                  <p className="text-lg text-gray-700">{myAddress}</p>
                  <p className="text-sm text-gray-500 mt-1">Serving all Gwalior areas</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Quote CTA */}
            <div className="bg-amber-50 p-8 rounded-2xl border border-amber-200 text-center">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Get an Instant Quote</h3>
              <p className="text-gray-600 mb-6">Reply within 2 hours ⚡</p>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors w-full sm:w-auto"
              >
                <span>📱</span> Chat on WhatsApp
              </a>
              <p className="text-xs text-gray-500 mt-4">
                Click to start a conversation. We'll respond quickly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-2xl text-white mb-2">Floormistri</p>
          <p className="text-amber-400 mb-4">Pure Craft, Total Perfection</p>
          <p className="text-gray-400">{myAddress}</p>
          <p className="text-gray-400 mt-2">{myPhone}</p>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-500">
            © {new Date().getFullYear()} Floormistri. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}