'use client'

import React, { useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  
  // REPLACE THE NUMBER BELOW WITH YOUR ACTUAL WHATSAPP NUMBER
  // Format: 91 followed by your 10 digit number (No + or spaces)
  const whatsappNumber = '917067699504' 
  const message = encodeURIComponent('Hello Floormistri! I am interested in your flooring services in Gwalior.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`

  return (
    <div 
      className="fixed bottom-10 right-10" 
      style={{ zIndex: 9999 }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
      
      {isHovered && (
        <div className="absolute bottom-20 right-0 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap">
          Chat with us on WhatsApp
        </div>
      )}
    </div>
  )
}