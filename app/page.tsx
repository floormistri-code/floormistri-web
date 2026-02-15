"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero'; 
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import QuoteCalculator from '@/components/QuoteCalculator';
import WhyUs from '@/components/WhyUs';
import VisitModal from '@/components/VisitModal';
import { Phone, MapPin } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // YOUR REAL DETAILS - VERIFIED FROM YOUR SCREENSHOTS
  const myPhone = "917067699504"; 
  const myAddress = "Deen Dayal Nagar, Gwalior, MP"; 

  return (
    <main className="min-h-screen bg-white">
      {/* 1. FIXED NAVBAR: Removed the part causing the crash */}
      <Navbar />
      
      {/* 2. YOUR HARD WORK: All sections kept exactly as they are */}
      <Hero />
      <Services />
      <Portfolio />
      <QuoteCalculator />
      <WhyUs />

      {/* 3. VISIBLE CONTACT SECTION: Dark text for readability */}
      <section className="py-20 bg-white border-t border-gray-100" id="contact">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Contact Floormistri Gwalior</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Call Us</h3>
                  <p className="text-xl font-bold text-slate-900">+{myPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Location</h3>
                  <p className="text-lg text-slate-800 font-medium">{myAddress}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100 text-center">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Message us on WhatsApp</h3>
              <a 
                href={`https://wa.me/${myPhone}?text=Hi, I want to discuss a project with Floormistri.`}
                className="inline-block bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition"
              >
                Send Message
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-white py-12 text-center">
        <p className="font-bold text-xl">Floormistri Gwalior</p>
        <p className="text-slate-500 mt-2">© 2026 Surgical Precision in Every Square Foot.</p>
      </footer>

      {/* 4. MODAL COMPONENT */}
      <VisitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}