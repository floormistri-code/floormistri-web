'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function QuotationsPage() {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuotes() {
      // We join with the projects table to see which site the quote is for
      const { data } = await supabase
        .from('quotations')
        .select(`
          *,
          projects (project_name)
        `)
        .order('created_at', { ascending: false })
      
      if (data) setQuotes(data)
      setLoading(false)
    }
    fetchQuotes()
  }, [])

  if (loading) return <div className="p-10 text-center font-bold">Loading Quotations...</div>

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto bg-white min-h-screen text-black">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 italic uppercase">Quotations</h1>
          <p className="text-slate-500 text-sm">Create and manage Bill of Quantities (BOQ) for your clients.</p>
        </div>
        <Link href="/admin/quotations/new">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg hover:bg-indigo-700 transition-all">
            + Create New Quote
          </button>
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Quote #</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Project Site</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Amount</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {quotes.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-20 text-center text-slate-400 font-medium">
                  No quotations created yet. Start by creating your first BOQ.
                </td>
              </tr>
            ) : (
              quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 font-bold text-slate-900">{quote.quotation_number || 'Draft'}</td>
                  <td className="p-6 font-medium text-slate-600">{quote.projects?.project_name || 'N/A'}</td>
                  <td className="p-6 font-black text-slate-900">₹{quote.final_amount?.toLocaleString()}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      quote.status === 'accepted' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <Link href={`/admin/quotations/${quote.id}`} className="text-indigo-600 font-bold text-xs hover:underline">
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}