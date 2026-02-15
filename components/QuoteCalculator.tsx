'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, ArrowRight, Check, Home, Sparkles, Crown } from 'lucide-react'

const rates = {
  tiles: { standard: 35, premium: 55, luxury: 85 },
  marble: { standard: 65, premium: 95, luxury: 140 },
  granite: { standard: 70, premium: 105, luxury: 160 },
  kota: { standard: 40, premium: 60, luxury: 90 } // Added Kota stone
}

const tierIcons = {
  standard: <Home className="w-4 h-4" />,
  premium: <Sparkles className="w-4 h-4" />,
  luxury: <Crown className="w-4 h-4" />
}

export default function QuoteCalculator() {
  const [material, setMaterial] = useState<'tiles' | 'marble' | 'granite' | 'kota'>('tiles')
  const [sqft, setSqft] = useState(500)
  const [tier, setTier] = useState<'standard' | 'premium' | 'luxury'>('standard')
  const [showDetails, setShowDetails] = useState(false)

  const ratePerSqft = rates[material][tier]
  const totalLabor = sqft * ratePerSqft
  const materialEstimate = sqft * (material === 'marble' ? 120 : material === 'granite' ? 100 : material === 'kota' ? 70 : 60)
  const totalEstimate = totalLabor + materialEstimate

  const whatsappMessage = encodeURIComponent(
    `Hi Floormistri, I used your Smart Calculator:\n` +
    `📍 Material: ${material.charAt(0).toUpperCase() + material.slice(1)}\n` +
    `📐 Area: ${sqft} sq.ft.\n` +
    `✨ Quality: ${tier.charAt(0).toUpperCase() + tier.slice(1)}\n` +
    `💪 Labor Cost: ₹${totalLabor.toLocaleString('en-IN')}\n` +
    `💰 Total Estimate (incl. materials): ₹${totalEstimate.toLocaleString('en-IN')}\n\n` +
    `Can you please share the exact quote?`
  )

  return (
    <section id="calculator" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-8 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-10 -mb-10"></div>
            <div className="relative z-10">
              <Calculator className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Smart Labor Estimator</h2>
              <p className="text-amber-50">Transparent pricing for Gwalior homes</p>
            </div>
          </div>
          
          {/* Calculator Body */}
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Left Column - Inputs */}
              <div className="space-y-8">
                {/* Material Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                    Step 1: Choose Material
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {(['tiles', 'marble', 'granite', 'kota'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setMaterial(m)}
                        className={`py-3 px-2 rounded-xl border-2 font-medium text-sm transition-all ${
                          material === m 
                            ? 'border-amber-600 bg-amber-50 text-amber-700 shadow-sm' 
                            : 'border-gray-200 text-gray-500 hover:border-amber-200 hover:bg-amber-50/50'
                        }`}
                      >
                        {m.charAt(0).toUpperCase() + m.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Tier */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
                    Step 2: Select Quality
                  </label>
                  <div className="flex gap-2">
                    {(['standard', 'premium', 'luxury'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTier(t)}
                        className={`flex-1 py-3 rounded-xl border-2 font-medium text-sm transition-all flex items-center justify-center gap-1 ${
                          tier === t 
                            ? 'border-amber-600 bg-amber-50 text-amber-700 shadow-sm' 
                            : 'border-gray-200 text-gray-500 hover:border-amber-200 hover:bg-amber-50/50'
                        }`}
                      >
                        {tierIcons[t]}
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area Slider */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Step 3: Area (sq.ft.)
                    </label>
                    <span className="text-2xl font-bold text-amber-600">{sqft} <span className="text-sm font-normal text-gray-500">sq.ft.</span></span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="50"
                    value={sqft}
                    onChange={(e) => setSqft(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>100</span>
                    <span>1000</span>
                    <span>2500</span>
                    <span>5000</span>
                  </div>
                </div>

                {/* Toggle Details Button */}
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                >
                  {showDetails ? 'Hide' : 'Show'} pricing details
                  <ArrowRight className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
                </button>

                {/* Detailed Breakdown */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-sm border border-gray-200">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Labor rate/sq.ft:</span>
                          <span className="font-semibold">₹{ratePerSqft}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Material estimate:</span>
                          <span className="font-semibold">₹{materialEstimate.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
                          <span>Total estimate:</span>
                          <span className="text-amber-600">₹{totalEstimate.toLocaleString('en-IN')}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">*Material cost is approximate. Final quote after site visit.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Column - Result */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-gray-200">
                <p className="text-gray-500 font-medium mb-2">Estimated Labor Cost</p>
                <motion.div
                  key={totalLabor}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-5xl md:text-6xl font-black text-gray-900 mb-2"
                >
                  ₹{totalLabor.toLocaleString('en-IN')}
                </motion.div>
                <p className="text-xs text-gray-400 mb-6">(₹{ratePerSqft}/sq.ft. × {sqft} sq.ft.)</p>
                
                <a
                  href={`https://wa.me/917067699504?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all group"
                >
                  <span>📱</span> Get Final Quote
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-xs text-gray-400 mt-4">
                  Click to send details via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}