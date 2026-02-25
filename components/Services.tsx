'use client'
import { Grid, Droplets, Layout, Layers, Home, Ruler } from 'lucide-react'

const services = [
  {
    title: "Tile Installation",
    description: "Expert installation of ceramic, porcelain, and vitrified tiles with perfect leveling.",
    icon: Grid
  },
  {
    title: "Marble Polishing",
    description: "Professional Italian and Indian marble polishing for a mirror-like finish.",
    icon: Droplets
  },
  {
    title: "Granite Work",
    description: "Precision cutting and fitting for kitchen platforms and stairs.",
    icon: Layout
  },
  {
    title: "Wooden Flooring",
    description: "Premium laminate and hardwood flooring for a warm, luxury feel.",
    icon: Layers 
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#003B49] mb-4 text-center">Our Specialized Services</h2>
          {/* Accent bar changed from Orange to Deep Green */}
          <div className="w-20 h-1 bg-[#006837] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#4CAF50]/30 hover:shadow-xl hover:shadow-green-900/5 transition-all group"
            >
              {/* Icon container changed from Orange hover to Deep Green hover */}
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#006837] group-hover:text-white transition-colors">
                <service.icon size={24} className="text-[#006837] group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#003B49] mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}