'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, ArrowRight, Check } from 'lucide-react'

const rates = {
  tiles: { standard: 35, premium: 55, luxury: 85 },
  marble: { standard: 65, premium: 95, luxury: 140 },
  granite: { standard: 70, premium: 105, luxury: 160 },
}

export default function QuoteCalculator() {
  const [material, setMaterial] = useState<'tiles' | 'marble' | 'granite'>('tiles')
  const [sqft, setSqft] = useState(500)
  const [tier, setTier] = useState<'standard' | 'premium' | 'luxury'>('standard')

  const totalLabor = sqft * rates[material][tier]

  const whatsappMessage = encodeURIComponent(
    `Hi Floormistri, I used your Smart Calculator:\nMaterial: ${material}\nArea: ${sqft} sqft\nQuality: ${tier}\nEstimated Labor: ₹${totalLabor}`
  )

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-amber-600 p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Smart Labor Estimator</h2>
            <p className="opacity-90">Transparent pricing for Gwalior homes</p>
          </div>
          
          <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase">1. Material</label>
                <div className="flex gap-2">
                  {['tiles', 'marble', 'granite'].map((m) => (
                    <button key={m} onClick={() => setMaterial(m as any)} 
                      className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${material === m ? 'border-amber-600 bg-amber-50 text-amber-700' : 'border-gray-100 text-gray-400 hover:border-amber-200'}`}>
                      {m.charAt(0).toUpperCase() + m.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-4 uppercase">2. Area: {sqft} Sq.Ft.</label>
                <input type="range" min="100" max="5000" step="50" value={sqft} onChange={(e) => setSqft(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-amber-600" />
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-gray-100">
              <p className="text-gray-500 font-medium mb-2">Estimated Labor Cost</p>
              <motion.h3 key={totalLabor} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-5xl font-black text-gray-900 mb-6">
                ₹{totalLabor.toLocaleString('en-IN')}
              </motion.h3>
              
              <a href={`https://wa.me/91XXXXXXXXXX?text=${whatsappMessage}`} target="_blank" className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all">
                Get Final Quote <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}