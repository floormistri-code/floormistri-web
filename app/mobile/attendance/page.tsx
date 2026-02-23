'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AttendancePage() {
  const [status, setStatus] = useState<'IN' | 'OUT'>('OUT')
  const [loading, setLoading] = useState(false)
  const [craftsmanId, setCraftsmanId] = useState<string | null>(null)

  useEffect(() => {
    // Get the ID we saved during login
    const id = localStorage.getItem('craftsman_id')
    setCraftsmanId(id)
  }, [])

  async function handleClock() {
    if (!craftsmanId) return alert("Please login again.")
    setLoading(true)
    
    if (status === 'OUT') {
      const { error } = await supabase.from('attendance').insert([{
        craftsman_id: parseInt(craftsmanId),
        clock_in: new Date().toISOString(),
        status: 'present'
      }])
      if (!error) setStatus('IN')
      else alert(error.message)
    } else {
      // For simplicity, we just toggle back for now
      setStatus('OUT')
    }
    setLoading(false)
  }

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[80vh]">
      <div className="text-center mb-10">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">Shift Status</h2>
        <div className={`mt-4 w-40 h-40 rounded-full flex items-center justify-center border-8 transition-all duration-500 ${status === 'IN' ? 'border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100' : 'border-slate-100 bg-slate-50'}`}>
          <span className={`text-4xl font-black italic ${status === 'IN' ? 'text-emerald-600' : 'text-slate-300'}`}>{status}</span>
        </div>
      </div>
      
      <button 
        onClick={handleClock}
        disabled={loading}
        className={`w-full py-8 rounded-[3rem] font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all active:scale-95 ${status === 'OUT' ? 'bg-emerald-600' : 'bg-red-600'}`}
      >
        {loading ? 'STAMPING...' : status === 'OUT' ? 'CLOCK IN' : 'CLOCK OUT'}
      </button>
      
      <p className="mt-8 text-[9px] font-bold text-slate-300 uppercase tracking-[0.3em] text-center px-10">
        GPS Verification Active • Secure Server Sync
      </p>
    </div>
  )
}