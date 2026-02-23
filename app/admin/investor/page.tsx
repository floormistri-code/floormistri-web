'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function InvestorDashboard() {
  const [data, setData] = useState({
    revenue: 0,
    expenses: 0,
    profit: 0,
    margin: 0,
    projectBreakdown: [] as any[]
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFinancials() {
      // 1. Get all payments (Revenue)
      const { data: payments } = await supabase.from('payments').select('amount')
      // 2. Get all expenses (Costs)
      const { data: expenses } = await supabase.from('expenses').select('amount')
      // 3. Get Project details for breakdown
      const { data: projects } = await supabase.from('projects').select(`
        id, 
        project_name, 
        payments(amount), 
        expenses(amount)
      `)

      const totalRev = payments?.reduce((sum, p) => sum + p.amount, 0) || 0
      const totalExp = expenses?.reduce((sum, e) => sum + e.amount, 0) || 0
      const netProfit = totalRev - totalExp
      const profitMargin = totalRev > 0 ? (netProfit / totalRev) * 100 : 0

      const breakdown = projects?.map(p => {
        const pRev = p.payments?.reduce((sum: number, r: any) => sum + r.amount, 0) || 0
        const pExp = p.expenses?.reduce((sum: number, e: any) => sum + e.amount, 0) || 0
        return {
          name: p.project_name,
          profit: pRev - pExp,
          revenue: pRev
        }
      }) || []

      setData({
        revenue: totalRev,
        expenses: totalExp,
        profit: netProfit,
        margin: profitMargin,
        projectBreakdown: breakdown
      })
      setLoading(false)
    }
    fetchFinancials()
  }, [])

  if (loading) return <div className="p-20 text-center font-black animate-pulse">CALCULATING ROI...</div>

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-black">
      <header className="mb-10">
        <h1 className="text-5xl font-black italic uppercase tracking-tighter">Investor Relations</h1>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em]">Financial Performance & Profitability</p>
      </header>

      {/* ROI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Net Profit</p>
          <p className="text-5xl font-black italic text-emerald-600">₹{data.profit.toLocaleString()}</p>
        </div>
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Profit Margin</p>
          <p className="text-5xl font-black italic text-indigo-600">{data.margin.toFixed(1)}%</p>
        </div>
        <div className="bg-slate-900 p-10 rounded-[3rem] shadow-xl text-white">
          <p className="text-[10px] font-black opacity-50 uppercase mb-2">Total Outflow</p>
          <p className="text-5xl font-black italic">₹{data.expenses.toLocaleString()}</p>
        </div>
      </div>

      {/* Project Profitability Table */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-8 border-b border-slate-50 font-black uppercase italic text-lg">Site-Wise Profitability</div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <th className="p-6">Project Name</th>
              <th className="p-6">Revenue Generated</th>
              <th className="p-6">Net Contribution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.projectBreakdown.map((p, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="p-6 font-bold uppercase">{p.name}</td>
                <td className="p-6 font-mono text-slate-500">₹{p.revenue.toLocaleString()}</td>
                <td className={`p-6 font-black italic ${p.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  ₹{p.profit.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}