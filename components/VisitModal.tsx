'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, User, Phone, Home } from 'lucide-react'

interface VisitModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function VisitModal({ isOpen, onClose }: VisitModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    projectType: 'tiles',
    date: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = encodeURIComponent(
      `Hi Floormistri, I'd like to schedule a site visit:\n\n` +
      `👤 Name: ${formData.name}\n` +
      `📱 Phone: ${formData.phone}\n` +
      `📍 Location: ${formData.location}\n` +
      `🏗️ Project: ${formData.projectType}\n` +
      `📅 Preferred Date: ${formData.date || 'Not specified'}`
    )
    window.open(`https://wa.me/917067699504?text=${message}`, '_blank')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed inset-x-4 bottom-4 md:inset-x-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg w-full bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold">Schedule Site Visit</h3>
                <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-amber-50 mt-2">We'll get back to you within 2 hours ⚡</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2 text-amber-600" />
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Rajesh Sharma"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2 text-amber-600" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g., 98765 43210"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2 text-amber-600" />
                  Site Location
                </label>
                <input
                  type="text"
                  placeholder="e.g., City Centre, Gwalior"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Home className="w-4 h-4 inline mr-2 text-amber-600" />
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition bg-white"
                >
                  <option value="tiles">Ceramic / Vitrified Tiles</option>
                  <option value="marble">Marble Flooring</option>
                  <option value="granite">Granite Flooring</option>
                  <option value="kota">Kota Stone</option>
                  <option value="staircase">Staircase</option>
                  <option value="platform">Flooring Platforms</option>
                  <option value="skirting">Skirting / Borders</option>
                </select>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2 text-amber-600" />
                  Preferred Date <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 mt-6"
              >
                <span>📱</span> Send via WhatsApp
              </button>

              <p className="text-xs text-gray-400 text-center mt-4">
                We'll confirm your visit within 2 hours. No spam, ever.
              </p>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}