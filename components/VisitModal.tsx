'use client'
import { X } from 'lucide-react'

export default function VisitModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[999] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4"><X /></button>
        <h2 className="text-2xl font-bold mb-4">It Works!</h2>
        <p>If you see this, the modal logic is correct. Shall we put the form back in?</p>
      </div>
    </div>
  )
}