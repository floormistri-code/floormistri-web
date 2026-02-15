'use client'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: "Luxury Villa - Italian Marble",
    location: "City Centre, Gwalior",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800",
    tags: ["Marble", "Diamond Polishing"],
    width: 800,
    height: 600
  },
  {
    title: "Modern Apartment - Vitrified Tiles",
    location: "DD Nagar, Gwalior",
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800",
    tags: ["Tiles", "Precision Joints"],
    width: 800,
    height: 600
  },
  {
    title: "Executive Office - Granite Floor",
    location: "Maharaj Bada, Gwalior",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800",
    tags: ["Granite", "Large Format"],
    width: 800,
    height: 600
  }
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Recent Works</h2>
            <p className="text-gray-600 max-w-xl">Real photos from project sites across Gwalior. No stock photos, just pure craftsmanship.</p>
          </div>
          <button className="mt-6 md:mt-0 text-amber-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all group">
            View All Projects 
            <ExternalLink className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 mb-6 overflow-hidden rounded-2xl bg-gray-100">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-white/90 backdrop-blur-sm text-amber-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <span>📍</span> {project.location}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button (visible only on mobile) */}
        <div className="text-center mt-12 md:hidden">
          <button className="inline-flex items-center gap-2 text-amber-600 font-semibold border border-amber-200 px-6 py-3 rounded-xl hover:bg-amber-50 transition-colors">
            View All Projects <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}