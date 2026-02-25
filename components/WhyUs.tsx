'use client'
import { ClipboardCheck, Ruler, HardHat, ShieldCheck } from 'lucide-react'

const steps = [
  {
    title: "Precise Measurement",
    desc: "We use professional tools to get exact area dimensions, ensuring zero material wastage.",
    icon: Ruler
  },
  {
    title: "Transparent BOQ",
    desc: "Receive a detailed Bill of Quantities with clear labor rates before we start. No hidden costs.",
    icon: ClipboardCheck
  },
  {
    title: "Surgical Execution",
    desc: "Our craftsmen follow strict quality checklists for leveling, spacing, and finishing.",
    icon: HardHat
  },
  {
    title: "Post-Work Audit",
    desc: "Final inspection by the founder to ensure every square foot meets Floormistri standards.",
    icon: ShieldCheck
  }
]

export default function WhyUs() {
  return (
    <section className="py-20 bg-[#001a21] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The Floormistri System</h2>
          <p className="text-slate-400">Why we are Gwalior's most organized flooring company</p>
          {/* Subtle brand accent line */}
          <div className="w-20 h-1 bg-[#006837] mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative p-6 border border-slate-800 rounded-2xl hover:bg-[#003B49]/30 transition group">
              {/* Changed background from Orange to Brand Teal/Green */}
              <div className="bg-[#003B49] group-hover:bg-[#006837] w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors">
                <step.icon size={24} className="text-[#4CAF50]" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}