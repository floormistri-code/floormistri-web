'use client'
import { Star } from 'lucide-react'

const reviews = [
  { name: "Rajesh Sharma", text: "Best marble polishing work in Gwalior. My hall looks like a mirror!", rating: 5 },
  { name: "Ankit Gupta", text: "Very professional team. They finished my kitchen granite work in 2 days.", rating: 5 },
  { name: "Priya Jha", text: "Organized and clean work. Highly recommend Floormistri for tile installation.", rating: 5 }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-gray-100">
              <div className="flex text-orange-500 mb-4">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-slate-600 italic mb-6">"{rev.text}"</p>
              <p className="font-bold text-slate-900">— {rev.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}