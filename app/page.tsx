"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import BeforeAfter from '@/components/BeforeAfter'; // 1. IMPORT ADDED HERE
import QuoteCalculator from '@/components/QuoteCalculator';
import Testimonials from '@/components/Testimonials';
import WhyUs from '@/components/WhyUs';
import VisitModal from '@/components/VisitModal';
import { Phone, MapPin, CheckCircle2, MessageSquare, ShieldCheck, Clock, Award } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const myPhone = "917067699504"; 
  const myAddress = "Deen Dayal Nagar, Gwalior, MP"; 

  return (
    <main className="min-h-screen bg-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 bg-[#f0f9f6]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#e6f4ea] text-[#006837] px-4 py-2 rounded-full text-sm font-bold mb-6 border border-[#4CAF50]/20">
            <CheckCircle2 size={16} />
            Gwalior's #1 Organized Flooring Team
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-[#003B49] mb-6 tracking-tight">
            Pure Craft,<br />
            <span className="text-[#006837]">Total Perfection</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Experience surgical precision in Tile, Marble, and Granite installation. System-driven execution for your dream home in Gwalior.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-[#003B49] font-semibold">
              <ShieldCheck className="text-[#4CAF50]" size={20} />
              <span>Free Measurement</span>
            </div>
            <div className="flex items-center gap-2 text-[#003B49] font-semibold">
              <Clock className="text-[#4CAF50]" size={20} />
              <span>Quote in 30 Mins</span>
            </div>
            <div className="flex items-center gap-2 text-[#003B49] font-semibold">
              <Award className="text-[#4CAF50]" size={20} />
              <span>No Hidden Costs</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`https://wa.me/${myPhone}?text=Hi%20Floormistri,%20I%20need%20a%20quote%20for%20my%20flooring%20project.`}
              className="bg-[#006837] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#003B49] transition shadow-lg shadow-green-100 flex items-center justify-center gap-2"
            >
              <MessageSquare size={20} />
              Get Free Quote
            </a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-[#003B49] border-2 border-[#003B49]/10 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition"
            >
              Book Site Visit
            </button>
          </div>
        </div>
      </section>

      <Services />
      
      <WhyUs />

      {/* 2. BEFORE/AFTER SECTION ADDED HERE */}
      <BeforeAfter />

      <Portfolio />
      
      <Testimonials />
      
      <QuoteCalculator />

      {/* MAP SECTION */}
      <section className="w-full h-[450px] bg-gray-100 border-t border-b border-gray-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14316.51735114781!2d78.19914044558034!3d26.224953941427144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c138d601b073%3A0x6d5c64366e4a2e58!2sDeen%20Dayal%20Nagar%2C%20Gwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1707998000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#003B49] mb-6">Let's Discuss Your Project</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Visit our office in Deen Dayal Nagar or call us to schedule a free measurement. Experience the Floormistri difference.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="bg-[#e6f4ea] p-3 rounded-full text-[#006837] group-hover:bg-[#006837] group-hover:text-white transition">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Direct Call</p>
                    <p className="text-xl font-bold text-[#003B49]">+{myPhone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="bg-[#e6f4ea] p-3 rounded-full text-[#006837] group-hover:bg-[#006837] group-hover:text-white transition">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Office Location</p>
                    <p className="text-xl font-bold text-[#003B49]">{myAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#003B49] rounded-3xl p-10 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4 text-[#4CAF50]">Start Your Transformation</h3>
              <p className="text-slate-300 mb-8 leading-relaxed">Most quotes are delivered within 30 minutes of measurement on WhatsApp.</p>
              <a 
                href={`https://wa.me/${myPhone}`}
                className="inline-block w-full bg-[#006837] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#4CAF50] transition text-center shadow-lg"
              >
                Chat with an Expert
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#001a21] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">Floormistri<span className="text-[#4CAF50]">.</span></div>
          <p className="text-slate-400 mb-8 italic">"Surgical Precision in Every Square Foot."</p>
          <div className="pt-8 border-t border-slate-800 text-slate-500 text-sm">
            © {new Date().getFullYear()} Floormistri Gwalior. All rights reserved.
          </div>
        </div>
      </footer>

      <VisitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}