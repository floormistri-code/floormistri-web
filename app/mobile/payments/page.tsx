'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function PaymentsPage() {
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const id = localStorage.getItem('craftsman_id')
      const { data } = await supabase
        .from('craftsmen')
        .select('name, daily_rate, status')
        .eq('id', id)
        .single()
      if (data) setProfile(data)
    }
    fetchPaymentInfo()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black italic uppercase mb-6">Earnings</h1>
      
      {/* Summary Card */}
      <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-xl mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Daily Wage Rate</p>
        <h2 className="text-4xl font-black mt-1">₹{profile?.daily_rate || '0'}</h2>
        <div className="mt-6 flex justify-between items-center bg-white/10 p-4 rounded-2xl">
          <span className="text-xs font-bold uppercase">Status</span>
          <span className="bg-emerald-400 text-emerald-900 text-[9px] font-black px-3 py-1 rounded-full uppercase">
            {profile?.status || 'Active'}
          </span>
        </div>
      </div>

      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Recent Payouts</h3>
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center">
        <p className="text-slate-300 font-bold uppercase text-[10px] tracking-widest">No payment history found</p>
      </div>
    </div>
  )
}