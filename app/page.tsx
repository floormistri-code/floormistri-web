"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Phone, MapPin, MessageSquare } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
            Pure Craft,<br />
            <span className="text-orange-600">Total Perfection</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Gwalior's most organized flooring experts for Tiles, Marble, and Granite.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/91XXXXXXXXXX?text=Hi%20Floormistri,%20I%20need%20a%20quote."
              className="bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Let's Discuss Your Project</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <p className="text-lg text-slate-700">
                Visit our office or we can come to your site in Gwalior for a free measurement.
              </p>
              
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Call Us</h3>
                  <p className="text-lg text-slate-800">+91 7067699504</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Location</h3>
                  <p className="text-lg text-slate-800">Deen Dayal Nagar, Gwalior, MP</p>
                </div>
              </div>
            </div>

            {/* Simple Map Placeholder */}
            <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center border border-gray-200">
               <p className="text-slate-500 font-medium text-center px-6">
                 [Map Loading for Gwalior Address...]
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Floormistri.</h2>
          <p className="text-slate-400">Surgical Precision in Every Square Foot.</p>
          <div className="mt-8 pt-8 border-t border-slate-800 text-sm text-slate-500">
            © {new Date().getFullYear()} Floormistri Gwalior. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}