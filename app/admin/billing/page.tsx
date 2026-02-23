'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function BillingDashboard() {
  const [stats, setStats] = useState({ total_invoiced: 0, total_paid: 0, pending: 0 })

  useEffect(() => {
    async function fetchBillingData() {
      const { data } = await supabase.from('invoices').select('amount, paid_amount')
      if (data) {
        const invoiced = data.reduce((sum, inv) => sum + Number(inv.amount), 0)
        const paid = data.reduce((sum, inv) => sum + Number(inv.paid_amount), 0)
        setStats({ total_invoiced: invoiced, total_paid: paid, pending: invoiced - paid })
      }
    }
    fetchBillingData()
  }, [])

  return (
    <div className="p-8 max-w-6xl mx-auto text-black bg-white min-h-screen">
      <h1 className="text-3xl font-black italic uppercase mb-8">Finance Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Total Billed</p>
          <p className="text-4xl font-black">₹{stats.total_invoiced.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Collected</p>
          <p className="text-4xl font-black text-emerald-600">₹{stats.total_paid.toLocaleString()}</p>
        </div>
        <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Outstanding</p>
          <p className="text-4xl font-black text-rose-600">₹{stats.pending.toLocaleString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/billing/invoices" className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center hover:border-indigo-500 transition-all">
          <h3 className="font-black uppercase italic">Go to Invoices →</h3>
        </Link>
        <Link href="/admin/billing/payments" className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center hover:border-indigo-500 transition-all">
          <h3 className="font-black uppercase italic">View Payment History →</h3>
        </Link>
      </div>
    </div>
  )
}