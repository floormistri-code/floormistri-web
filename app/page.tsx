'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'
import QuoteCalculator from '@/components/QuoteCalculator'
import Portfolio from '@/components/Portfolio'
import VisitModal from '@/components/VisitModal'
import { Phone, MapPin } from 'lucide-react'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Professional WhatsApp link
  const whatsappUrl = "https://wa.me/917067699504?text=Hi%20Floormistri%2C%20I%20saw%20your%20website%20and%20want%20to%20get%20a%20quote%20for%20a%20flooring%20project%20in%20Gwalior."

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
            {/* Updated this button to go straight to WhatsApp */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-amber-700 transition text-center"
            >
              Get Free Quote
            </a>
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} 
              className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition"
            >
              View Our Work
            </button>
          </div>
        </div>
      </section>

      <Services />
      <div id="portfolio"><Portfolio /></div>
      <QuoteCalculator />
      <WhyUs />

      {/* 2. Contact Section - Fixed Visibility & Map */}
      <section id="contact" className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Discuss Your Project</h2>
              <p className="text-gray-600 mb-8 text-lg">Visit our office or we can come to your site in Gwalior for a free measurement.</p>
              
              <div className="space-y-8">
                {/* Phone Fixed */}
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <Phone size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-600 uppercase tracking-wider">Call Us</p>
                    <p className="text-2xl font-black text-gray-900">+91 70676 99504</p>
                  </div>
                </div>

                {/* Address Fixed */}
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shadow-sm">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-600 uppercase tracking-wider">Location</p>
                    <p className="text-2xl font-black text-gray-900">Deen Dayal Nagar, Gwalior</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <a 
                  href={whatsappUrl}
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>

            {/* Real Google Map for Deen Dayal Nagar */}
            <div className="h-[400px] bg-gray-100 rounded-3xl overflow-hidden border-4 border-gray-50 shadow-2xl">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14317.43322137021!2d78.204555!3d26.215433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c15f91724a7d%3A0x6a24694b7c6c40a5!2sDeen%20Dayal%20Nagar%2C%20Gwalior%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Professional Footer */}
      <footer className="py-20 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-white text-3xl font-bold mb-4">Floormistri.</h2>
          <p className="mb-8 text-lg">Surgical Precision in Every Square Foot.</p>
          <div className="flex justify-center gap-6 mb-12 font-medium">
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-amber-500 transition">Home</button>
            <a href="#portfolio" className="hover:text-amber-500 transition">Portfolio</a>
            <a href="#contact" className="hover:text-amber-500 transition">Contact</a>
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