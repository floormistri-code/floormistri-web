'use client'
import { Grid, Layers, Square, Stairs, Home, Ruler } from 'lucide-react'

const services = [
  { 
    title: "Ceramic & Vitrified Tiles", 
    icon: <Grid className="w-6 h-6" />, 
    desc: "Perfectly leveled, precise joints for a seamless look.",
    tags: ["Wall Tiles", "Floor Tiles", "Digital Print"]
  },
  { 
    title: "Marble & Granite", 
    icon: <Square className="w-6 h-6" />, 
    desc: "Expert fixing and diamond polishing for premium stone finishes.",
    tags: ["Italian Marble", "Indian Granite", "Polishing"]
  },
  { 
    title: "Kota Stone", 
    icon: <Layers className="w-6 h-6" />, 
    desc: "Traditional durability with a modern, smooth finish for indoor/outdoor.",
    tags: ["Natural Stone", "Matte Finish", "Anti-Skid"]
  },
  { 
    title: "Flooring Platforms", 
    icon: <Home className="w-6 h-6" />, 
    desc: "Custom platforms for pooja rooms, balconies, and courtyards.",
    tags: ["Pooja Room", "Balcony", "Elevated"]
  },
  { 
    title: "Staircase Treads", 
    icon: <Stairs className="w-6 h-6" />, 
    desc: "Anti-skid, flawless risers with precision-cut matching profiles.",
    tags: ["Nosing", "Anti-Skid", "Profile Cutting"]
  },
  { 
    title: "Skirting & Borders", 
    icon: <Ruler className="w-6 h-6" />, 
    desc: "Clean edges, pattern matching, and decorative borders for that perfect finish.",
    tags: ["Skirting", "Border Design", "Pattern Work"]
  }
]

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
          <p className="text-gray-600 text-lg">Gwalior's most trusted team for precision flooring execution across all surfaces.</p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-2xl bg-white border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon with animated background */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-amber-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110 group-hover:scale-100"></div>
                <div className="relative w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">Not sure which service you need?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 text-amber-600 font-semibold border border-amber-200 px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors"
          >
            Get Free Consultation <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}