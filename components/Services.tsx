'use client'
import { Grid, Layers, Square } from 'lucide-react'

const services = [
  { title: "Ceramic & Vitrified Tiles", icon: <Grid />, desc: "Perfectly leveled, precise joints for a seamless look." },
  { title: "Marble & Granite", icon: <Square />, desc: "Expert fixing and diamond polishing for premium stone." },
  { title: "Kota Stone", icon: <Layers />, desc: "Traditional durability with a modern, smooth finish." }
]

export default function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Expertise</h2>
        <p className="text-gray-500 mb-12">Gwalior's most trusted team for precision flooring execution.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="p-8 rounded-3xl border border-gray-100 bg-gray-50 hover:border-amber-200 transition">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 mx-auto">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}