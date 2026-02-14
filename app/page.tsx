'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'
import QuoteCalculator from '@/components/QuoteCalculator'
import Portfolio from '@/components/Portfolio'
import VisitModal from '@/components/VisitModal'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-white">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      
      {/* 1. Hero Section */}
      <section className="pt-32 pb-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            Pure Craft, <br />
            <span className="text-amber-600">Total Perfection</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
            Gwalior's most organized flooring experts for Tiles, Marble, and Granite.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="bg-amber-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-amber-700 transition">
              Get Free Quote
            </button>
            <button onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition">
              View Our Work
            </button>
          </div>
        </div>
      </section>

      <Services />
      <div id="portfolio"><Portfolio /></div>
      <QuoteCalculator />
      <WhyUs />

      {/* 2. Contact Section (New & Improved) */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Discuss Your Project</h2>
              <p className="text-gray-600 mb-8">Visit our office or we can come to your site in Gwalior for a free measurement.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center"><Phone /></div>
                  <div><p className="text-sm text-gray-500">Call Us</p><p className="font-bold">+91 XXXXXXXXXX</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center"><MapPin /></div>
                  <div><p className="text-sm text-gray-500">Location</p><p className="font-bold">City Centre, Gwalior, MP</p></div>
                </div>
              </div>
            </div>
            <div className="h-full min-h-[300px] bg-gray-100 rounded-3xl overflow-hidden border-8 border-white shadow-xl">
               {/* Replace this src with your Google Maps embed link later */}
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114543.5113337996!2d78.1037636!3d26.2140411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c6e10976aa2f%3A0xc66657997811776b!2sGwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                style={{ border: 0 }}
                loading="lazy"
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Professional Footer */}
      <footer className="py-20 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-white text-3xl font-bold mb-4">Floormistri.</h2>
          <p className="mb-8">Surgical Precision in Every Square Foot.</p>
          <div className="flex justify-center gap-6 mb-12">
            <a href="#" className="hover:text-amber-500 transition">Services</a>
            <a href="#" className="hover:text-amber-500 transition">Portfolio</a>
            <a href="#" className="hover:text-amber-500 transition">Estimate</a>
          </div>
          <div className="pt-8 border-t border-gray-800 text-sm">
            © {new Date().getFullYear()} Floormistri Gwalior. All rights reserved.
          </div>
        </div>
      </footer>

      <VisitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}