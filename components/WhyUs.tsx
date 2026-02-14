import { CheckCircle2 } from 'lucide-react'

export default function WhyUs() {
  const points = [
    "Surgical Precision: 1mm joint accuracy.",
    "Organized Workflow: No mess, no stress.",
    "Premium Finishing: Diamond-grade polishing.",
    "Timely Delivery: We respect your schedule."
  ]

  return (
    <section id="why" className="py-20 bg-amber-600">
      <div className="container mx-auto px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Gwalior Trusts Floormistri</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, i) => (
            <div key={i} className="flex flex-col items-center p-4">
              <CheckCircle2 className="w-12 h-12 mb-4 text-amber-200" />
              <p className="text-lg font-semibold">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}