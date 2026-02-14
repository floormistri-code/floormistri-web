'use client'
import { Square } from 'lucide-react' 

export default function Navbar({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <nav className="fixed w-full z-50 bg-white border-b border-gray-100 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Square className="w-8 h-8 text-amber-600 fill-amber-600" />
          <span className="text-2xl font-black text-gray-900 tracking-tighter">Floormistri.</span>
        </div>
        <button 
          onClick={onOpenModal} 
          className="bg-amber-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-amber-700 transition shadow-md"
        >
          Get Quote
        </button>
      </div>
    </nav>
  )
}