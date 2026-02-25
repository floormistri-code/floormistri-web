'use client'
import React, { useState } from 'react';
import { ArrowRight, ImageIcon } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Luxury Living Room",
    location: "City Center, Gwalior",
    before: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=800&auto=format&fit=crop", // Placeholder
    after: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop", // Placeholder
    desc: "Replaced old cracked tiles with premium Italian marble finish vitrified tiles."
  }
];

export default function BeforeAfter() {
  const [view, setView] = useState<'before' | 'after'>('after');

  return (
    <section className="py-20 bg-[#f0f9f6]" id="portfolio">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003B49] mb-4">Project Transformations</h2>
          <p className="text-slate-600 max-w-2xl mx-auto italic">"Seeing is believing. Witness the surgical precision of Floormistri."</p>
        </div>

        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2">
              {/* Image Side */}
              <div className="relative h-80 md:h-auto bg-slate-200">
                <img 
                  src={view === 'before' ? project.before : project.after} 
                  alt={view}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-widest">
                  {view}
                </div>
              </div>

              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-[#003B49] mb-2">{project.title}</h3>
                <p className="text-[#006837] font-medium mb-4 flex items-center gap-2">
                  <ImageIcon size={18} /> {project.location}
                </p>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {project.desc}
                </p>

                {/* Toggle Switch */}
                <div className="flex items-center gap-4 bg-slate-100 p-1.5 rounded-2xl w-fit">
                  <button 
                    onClick={() => setView('before')}
                    className={`px-6 py-2 rounded-xl font-bold transition ${view === 'before' ? 'bg-white text-[#003B49] shadow-md' : 'text-slate-500'}`}
                  >
                    Before
                  </button>
                  <button 
                    onClick={() => setView('after')}
                    className={`px-6 py-2 rounded-xl font-bold transition ${view === 'after' ? 'bg-[#006837] text-white shadow-md' : 'text-slate-500'}`}
                  >
                    After
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}