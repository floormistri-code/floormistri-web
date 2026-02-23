'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function QuoteDetailsPage() {
  const { id } = useParams()
  const [quote, setQuote] = useState<any>(null)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuoteData() {
      const { data: quoteData } = await supabase
        .from('quotations')
        .select(`*, projects(project_name, site_address), clients(name, phone)`)
        .eq('id', id)
        .single()

      const { data: itemsData } = await supabase
        .from('boq_items')
        .select('*')
        .eq('quotation_id', id)

      if (quoteData) setQuote(quoteData)
      if (itemsData) setItems(itemsData)
      setLoading(false)
    }
    fetchQuoteData()
  }, [id])

  if (loading) return <div className="p-10 text-center font-bold">Generating View...</div>

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-white min-h-screen">
      {/* Hide this header when printing */}
      <div className="flex justify-between items-center mb-8 print:hidden">
        <Link href="/admin/quotations" className="text-slate-400 font-bold italic">← Back</Link>
        <button 
          onClick={() => window.print()} 
          className="bg-indigo-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-indigo-700 transition-all"
        >
          Download PDF / Print
        </button>
      </div>

      {/* THE QUOTATION DOCUMENT */}
      <div className="border border-slate-200 p-8 md:p-12 rounded-none bg-white shadow-sm print:border-none print:shadow-none">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-slate-900">FLOORMISTRI</h1>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Premium Flooring Solutions</p>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-black uppercase">Quotation</h2>
            <p className="text-sm text-slate-500">#{quote?.id?.slice(0,8)}</p>
            <p className="text-sm text-slate-500">{new Date(quote?.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12 pb-8 border-b border-slate-100">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Client Details</p>
            <p className="font-bold text-lg">{quote?.clients?.name}</p>
            <p className="text-slate-600">{quote?.clients?.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Site Location</p>
            <p className="font-bold text-lg">{quote?.projects?.project_name}</p>
            <p className="text-slate-600 text-sm">{quote?.projects?.site_address}</p>
          </div>
        </div>

        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-2 border-slate-900">
              <th className="py-4 text-left text-xs font-black uppercase">Description</th>
              <th className="py-4 text-center text-xs font-black uppercase">Qty</th>
              <th className="py-4 text-right text-xs font-black uppercase">Rate</th>
              <th className="py-4 text-right text-xs font-black uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="py-4 font-bold text-slate-800">{item.item_name}</td>
                <td className="py-4 text-center text-slate-600">{item.quantity} {item.unit}</td>
                <td className="py-4 text-right text-slate-600">₹{item.rate}</td>
                <td className="py-4 text-right font-black">₹{item.amount?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-full md:w-64 space-y-3">
            <div className="flex justify-between text-slate-500 font-bold">
              <span>Subtotal</span>
              <span>₹{quote?.total_amount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-2xl font-black border-t-2 border-slate-900 pt-3 text-indigo-600">
              <span>Total</span>
              <span>₹{quote?.final_amount?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100 italic text-slate-400 text-xs">
          <p>Note: This is a computer-generated quotation. Valid for 15 days from the date of issue.</p>
        </div>
      </div>
    </div>
  )
}