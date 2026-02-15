'use client'
import { Grid, Layers, Square, Layout, Home, Ruler } from 'lucide-react'

const services = [
  {
    title: "Tile Installation",
    description: "Expert installation of ceramic, porcelain, and vitrified tiles with perfect leveling.",
    icon: Grid
  },
  {
    title: "Marble Polishing",
    description: "Professional Italian and Indian marble polishing for a mirror-like finish.",
    icon: Layers
  },
  {
    title: "Granite Work",
    description: "Precision cutting and fitting for kitchen platforms and stairs.",
    icon: Layout
  },
  {
    title: "Wooden Flooring",
    description: "Premium laminate and hardwood flooring for a warm, luxury feel.",
    icon: Square
  },
  {
    title: "Home Renovation",
    description: "Complete flooring makeover for your dream home in Gwalior.",
    icon: Home
  },
  {
    title: "Site Measurement",
    description: "Free accurate measurements and cost estimation at your doorstep.",
    icon: Ruler
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Specialized Services</h2>
          <div className="w-20 h-1 bg-orange-600 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow bg-slate-50">
              <service.icon className="w-12 h-12 text-orange-600 mb-6" />
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}