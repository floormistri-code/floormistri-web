'use client'

const projects = [
  {
    title: "Luxury Marble Hall",
    location: "City Centre, Gwalior",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800",
    type: "Marble"
  },
  {
    title: "Modern Kitchen Granite",
    location: "DD Nagar, Gwalior",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=800",
    type: "Granite"
  },
  {
    title: "Premium Terrace Tiles",
    location: "Sada, Gwalior",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800",
    type: "Tiles"
  }
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Recent Projects</h2>
          <p className="text-slate-600">Delivering excellence across Gwalior</p>
          <div className="w-20 h-1 bg-orange-600 mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="relative h-64 overflow-hidden">
                {/* We changed <Image> to <img> to bypass the Next.js security error */}
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                    {project.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-500 flex items-center gap-2">
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}