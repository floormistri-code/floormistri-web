'use client'
import { motion } from 'framer-motion'
import { CheckCircle2, Ruler, Sparkles, Calendar, Target, Shield, Users, Clock } from 'lucide-react'

const reasons = [
  {
    icon: <Ruler className="w-8 h-8" />,
    title: "Surgical Precision",
    description: "1mm joint accuracy with laser-guided measurements.",
    stat: "±1mm"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Premium Finishing",
    description: "Diamond-grade polishing for that showroom shine.",
    stat: "Mirror Finish"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Organized Workflow",
    description: "System-driven execution. No mess, no stress, no delays.",
    stat: "100% Process"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Timely Delivery",
    description: "We respect your schedule. On-time completion guaranteed.",
    stat: "On Schedule"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Skilled Craftsmen",
    description: "In-house trained team, no daily market hiring.",
    stat: "10+ Experts"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Quality Check",
    description: "3-stage inspection before handover.",
    stat: "Triple Check"
  }
]

export default function WhyUs() {
  return (
    <section id="whyus" className="py-24 bg-gradient-to-br from-amber-600 to-amber-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Gwalior Trusts <span className="text-amber-200">Floormistri</span>
          </h2>
          <p className="text-xl text-amber-50 max-w-2xl mx-auto">
            We don't just lay floors — we deliver perfection with system and precision.
          </p>
        </motion.div>

        {/* Stats/Reasons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Icon with animated background */}
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="relative w-14 h-14 bg-amber-500/30 rounded-xl flex items-center justify-center text-amber-200 group-hover:scale-110 group-hover:text-white transition-all duration-300">
                    {reason.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{reason.title}</h3>
                    <span className="text-xs font-semibold bg-amber-500/50 px-3 py-1 rounded-full text-amber-100">
                      {reason.stat}
                    </span>
                  </div>
                  <p className="text-amber-50/90 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full border border-white/20">
            <CheckCircle2 className="w-6 h-6 text-amber-200" />
            <span className="text-white font-medium">50+ Happy Clients in Gwalior</span>
            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
            <span className="text-amber-200 font-semibold">4.9 ★★★★★</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}