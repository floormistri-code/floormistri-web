'use client'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: "Luxury Villa - Italian Marble",
    location: "City Centre, Gwalior",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800",
    tags: ["Marble", "Diamond Polishing"]
  },
  {
    title: "Modern Apartment - Vitrified Tiles",
    location: "DD Nagar, Gwalior",
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800",
    tags: ["Tiles", "Precision Joints"]
  },
  {
    title: "Executive Office - Granite Floor",
    location: "Maharaj Bada, Gwalior",
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800",
    tags: ["Granite", "Large Format"]
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
          <button className="mt-6 md:mt-0 text-amber-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All Projects <ExternalLink className="w-5 h-5" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 mb-6 overflow-hidden rounded-2xl">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{project.title}</h3>
              <p className="text-gray-500 text-sm">{project.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}