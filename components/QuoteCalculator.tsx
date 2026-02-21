'use client'
import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null

export default function QuoteCalculator() {
  const [area, setArea] = useState(1000)
  const [material, setMaterial] = useState('Marble')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)

  const prices: any = { Tiles: 35, Marble: 60, Granite: 80, Kota: 25 }
  const estimate = area * prices[material]

  const handleFinalQuote = async () => {
    if (!name || !phone) { 
      alert("Please enter your name and phone number!"); 
      return; 
    }
    
    setLoading(true)
    try {
      const { data, error } = await supabase!
        .from('inquiries')
        .insert([{ 
          client_name: name, 
          phone_number: phone, 
          area_sqft: area, 
          material_type: material, 
          total_estimate: estimate 
        }])
        .select()

      if (error) {
        // This will tell us EXACTLY why Supabase is blocking the lead
        alert("Supabase Error: " + error.message);
        console.error("Detailed Debug Info:", error);
      } else {
        alert("SUCCESS! Lead saved to Floormistri Database.");
        const message = `Hi Floormistri! I am ${name}. My project estimate is ₹${estimate.toLocaleString()}.`;
        window.open(`https://wa.me/917067699504?text=${encodeURIComponent(message)}`, '_blank');
      }
    } catch (err: any) {
      alert("Coding Error: " + err.message);
    }
    setLoading(false)
  }

  return (
    <section className="py-20 bg-white flex justify-center px-4">
      <div className="max-w-5xl w-full bg-[#F8FAFC] rounded-[40px] p-8 md:p-12 shadow-xl border border-slate-100 flex flex-col md:flex-row gap-12 overflow-hidden">
        
        {/* LEFT: Branding & Inputs */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-4xl font-extrabold text-[#003B49] tracking-tight">Smart Labor Estimator</h2>
            <p className="text-[#006837] font-semibold mt-2 text-lg">Pure Craft • Total Perfection</p>
          </div>
          
          <div className="space-y-4">
            <input 
              type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)}
              className="w-full p-5 bg-white rounded-2xl border border-slate-200 shadow-sm text-[#003B49] font-medium focus:ring-2 focus:ring-[#4CAF50] outline-none transition-all placeholder:text-slate-400" 
            />
            <input 
              type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}
              className="w-full p-5 bg-white rounded-2xl border border-slate-200 shadow-sm text-[#003B49] font-medium focus:ring-2 focus:ring-[#4CAF50] outline-none transition-all placeholder:text-slate-400" 
            />
            
            <div className="pt-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block">Material Selection</label>
              <div className="flex flex-wrap gap-3">
                {['Tiles', 'Marble', 'Granite', 'Kota'].map((m) => (
                  <button key={m} onClick={() => setMaterial(m)}
                    className={`px-8 py-3 rounded-full font-bold transition-all ${material === m ? 'bg-[#003B49] text-white shadow-lg' : 'bg-white text-[#003B49] hover:bg-slate-50 border border-slate-200'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4">
               <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Project Area</label>
                 <span className="text-[#003B49] font-black">{area} Sq.ft</span>
               </div>
               <input type="range" min="100" max="5000" step="50" value={area} onChange={(e) => setArea(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4CAF50]" />
            </div>
          </div>
        </div>

        {/* RIGHT: The Result Card (Logo Colors) */}
        <div className="bg-[#003B49] p-10 rounded-[32px] text-white flex flex-col justify-center items-center md:w-[380px] relative overflow-hidden">
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-[#4CAF50] opacity-10 rounded-full blur-3xl"></div>
          
          <p className="text-slate-300 font-medium text-sm mb-2 uppercase tracking-widest">Total Labor Estimate</p>
          <div className="text-6xl font-black mb-8 tracking-tighter text-[#4CAF50]">₹{estimate.toLocaleString()}</div>
          
          <button 
            onClick={handleFinalQuote} disabled={loading}
            className="w-full bg-[#4CAF50] text-white py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-[#006837] transition-all active:scale-95 uppercase tracking-wide"
          >
            {loading ? 'Processing...' : 'Get Final Quote'}
          </button>
          
          <p className="mt-6 text-[10px] text-slate-400 text-center uppercase tracking-widest leading-loose">
            Expert Craftsmanship <br/> Gwalior, Madhya Pradesh
          </p>
        </div>
      </div>
    </section>
  )
}